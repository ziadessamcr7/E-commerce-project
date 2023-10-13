import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ForgetPassword() {

    let [errors, setErros] = useState('')

    const nav = useNavigate()


    let valid = Yup.object({
        email: Yup.string().required('emial required').email('enter valid email')
    })

    let forgetForm = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: valid,
        onSubmit: sendForgetAPI
    })

    async function sendForgetAPI(value) {

        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, value)

        console.log(data)

        if (data.statusMsg === 'success') {
            document.getElementById('Reset-code').classList.remove('d-none')
            document.getElementById('Forget-pass').classList.add('d-none')
        }

    }

    //////////////////////////////////

    let valid2 = Yup.object({
        resetCode: Yup.string().required('code required').matches(/^[0-9]+$/, 'must be only numbers')
    })

    let resetForm = useFormik({
        initialValues: {
            resetCode: ''
        },
        validationSchema: valid2,
        onSubmit: sendRestCode
    })

    async function sendRestCode(val) {

        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, val)
            .catch((err) => {
                setErros(err.response.data.message)
            })

        if (data.status === 'Success') {
            nav('/resetpassword')
        }

        console.log(data);

    }

    return <>

        <div className="container " id='Forget-pass' >

            <form className='my-5' onSubmit={forgetForm.handleSubmit}>

                {/* <label htmlFor="email">Enter Your email:</label> */}
                <input onChange={forgetForm.handleChange} onBlur={forgetForm.handleBlur} type="text" id='email' placeholder='Enter your email..' className='form-control' />

                {forgetForm.touched.email ? <p className='text-danger'> {forgetForm.errors.email} </p> : ''}


                <button type='submit' className='btn btn-success mt-3'>Send email</button>
            </form>

        </div>

        <div className="container d-none" id='Reset-code' >
            {errors ? <div className='alert alert-danger'> {errors} </div> : ""}
            <form className='my-5' onSubmit={resetForm.handleSubmit}>

                <input onBlur={resetForm.handleBlur} onChange={resetForm.handleChange} name='resetCode' id='resetCode' type="text" className='form-control' placeholder='Reset code' />
                {resetForm.touched.resetCode ? <p className='text-danger'> {resetForm.errors.resetCode} </p> : ''}

                <button type='submit' className='btn btn-success mt-3'>Send Code</button>
            </form>
        </div>


    </>
}
