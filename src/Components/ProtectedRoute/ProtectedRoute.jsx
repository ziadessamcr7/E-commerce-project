import React, { useContext, useEffect } from 'react'
import { authContext } from '../Context/Authentication'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {


  const { Token } = useContext(authContext)


  const nav = useNavigate()

  console.log(Token)

  if (Token === null) {

    return nav('/e-commerce-login')

  }



  return <>

    {children}

  </>
}
