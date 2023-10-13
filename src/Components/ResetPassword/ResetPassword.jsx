import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ResetPassword() {

    const nav = useNavigate()

    let valid = Yup.object({
        email: Yup.string().required("email required").email('enter a valid email'),
        newPassword: Yup.string().required('password required').matches(/^[A-Z][a-z0-9]{3,12}$/, 'must be start with Capital letter and be at least 3 chars')
    })

    const resetPassFormik = useFormik({
        initialValues: {

            email: "",
            newPassword: ""
        },
        validationSchema: valid,

        onSubmit: ResetPassword
    })

    async function ResetPassword(vlas) {

        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, vlas)

            console.log(data)
            console.log(vlas)

            if (data.token) {
                nav('/login')
            }

        } catch (error) {
            console.log('error', error)

        }


    }




    return <div className='container' id='reset-password'>

        <form className='my-5' onSubmit={resetPassFormik.handleSubmit}>


            <label htmlFor="email">Your Email:</label>
            <input onChange={resetPassFormik.handleChange} type="email" id='email' name='email' className='form-control mb-3' />
            <p className='text-danger'> {resetPassFormik.errors.email} </p>

            <label htmlFor="newPassword">New Password:</label>
            <input onChange={resetPassFormik.handleChange} type="newPassword" name="newPassword" id="newPassword" className='form-control' />
            <p className='text-danger'> {resetPassFormik.errors.newPassword} </p>


            <button type='submit' className='btn btn-success mt-4'>Reset Password</button>

        </form>


    </div>
}
