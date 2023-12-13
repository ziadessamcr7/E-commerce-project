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
        errors.email = "please enter a valid mail"
      }
      if (phoneRegex.test(values.phone) === false) {
        errors.phone = "please enter valid phone number"
      }
      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "enter a valid password of 6 chars"
      }
      if (values.rePassword !== values.password) {
        errors.rePassword = "passwords and don't match"
      }


      return errors
    },
  })


  return <section id='register' className='background'>


    {errorMsg ? <div className=" w-75 m-auto my-2 alert alert-danger"> {errorMsg} </div> : ''}

    {success ? <div className=" w-75 m-auto my-2 alert alert-success"> {success} </div> : ''}



    <h1 className='text-center text-white mb-1'>Register Now </h1>

    <form className='w-50 m-auto bg-success-subtle p-4 rounded-4' onSubmit={formik.handleSubmit}>

      <div className="row">

      </div>
      <label htmlFor="name">Name:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" className='form-control ' id='name' name='name' />
      {formik.errors.name && formik.touched.name ? <div className='text-danger mb-2'>{formik.errors.name}</div> : ''}

      <label htmlFor="mail" className='mt-2'>Email:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" className='form-control' id='mail' name='email' />
      {formik.errors.email && formik.touched.email ? <div className='text-danger mb-2'>{formik.errors.email}</div> : ''}

      <label htmlFor="phone" className='mt-2'>Phone:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" className='form-control' id='phone' name='phone' />
      {formik.errors.phone && formik.touched.phone ? <div className='text-danger mb-2'>{formik.errors.phone}</div> : ''}

      <div className="row">
        <div className="col-md-6">
          <label htmlFor="pass" className='mt-2'>Password:</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" className='form-control' id='password' name='password' />
          {formik.errors.password && formik.touched.password ? <div className='text-danger mb-2'>{formik.errors.password}</div> : ''}
        </div>
        <div className="col-md-6">
          <label htmlFor="rePass" className='mt-2'>Confirm Password:</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" className='form-control' id='rePassword' name='rePassword' />
          {formik.errors.rePassword && formik.touched.rePassword ? <div className='text-danger mb-2'>{formik.errors.rePassword}</div> : ''}
        </div>
      </div>





      <button type='submit' className='btn btn-success mt-3 ms-auto d-block'>

        {Loading === false ? <span className='fw-bold'>Register</span> : <TailSpin
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
