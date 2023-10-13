import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  let user = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
  }

  let phoneRegex = /^(02)?01[0125][0-9]{8}$/

  const [errorMsg, setErrorMsg] = useState(null)

  const [success, setSuccess] = useState(null)

  const navigate = useNavigate()

  const [Loading, setLoading] = useState(false)




  async function sendUserData(vals) {

    console.log('sending to backend...')
    setLoading(true)

    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, vals).catch(function (err) {

      console.log(err.response.data.message)
      setErrorMsg(err.response.data.message)

      setLoading(false)


    })

    // console.log(data)
    // console.log('kolo taamaaam')

    if (data.message = "success") {
      setSuccess('Account Created Successfully')

      setTimeout(() => {
        navigate('/login')
      }, 3000);
    }

    // setLoading(false)



  }

  let formik = useFormik({
    initialValues: user,

    onSubmit: sendUserData,

    validate: function (values) {

      setErrorMsg(null)
      setSuccess(null)

      let errors = {}

      if (values.name.length < 3 || values.name.length > 10) {
        errors.name = "name must be from 3 to 10 letters"
      }
      if (values.email.includes('@') === false || values.email.includes('.') === false) {
        errors.email = "please make sure u enter @ and ."
      }
      if (phoneRegex.test(values.phone) === false) {
        errors.phone = "please enter valid phone number"
      }
      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "please enter valid password between 6 & 12 chars"
      }
      if (values.rePassword !== values.password) {
        errors.rePassword = "password and rePassword don't match"
      }


      return errors
    },
  })


  return <section id='register' className=''>


    {errorMsg ? <div className=" w-75 m-auto my-2 alert alert-danger"> {errorMsg} </div> : ''}

    {success ? <div className=" w-75 m-auto my-2 alert alert-success"> {success} </div> : ''}



    <h1 className='text-center'>Register Now </h1>

    <form className='w-75 m-auto' onSubmit={formik.handleSubmit}>

      <label htmlFor="name">Name</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" className='form-control mb-3' id='name' name='name' />
      {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : ''}

      <label htmlFor="mail">email</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" className='form-control mb-3' id='mail' name='email' />
      {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}

      <label htmlFor="pass">password</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" className='form-control mb-3' id='password' name='password' />
      {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ''}

      <label htmlFor="rePass">rePassword</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" className='form-control mb-3' id='rePassword' name='rePassword' />
      {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ''}

      <label htmlFor="phone">phone</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" className='form-control mb-3' id='phone' name='phone' />
      {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ''}

      <button type='submit' className='btn btn-success mt-3 ms-auto d-block'>

        {Loading === false ? "Register" : <TailSpin
          height="30"
          width="30"
          color="#ffff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />}







      </button>


    </form>


  </section>
}
