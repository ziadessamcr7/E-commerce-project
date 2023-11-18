import React, { useContext, useEffect } from 'react'
import { authContext } from '../Context/Authentication'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {


  const { Token } = useContext(authContext)




  console.log(Token)

  if (Token === null) {

    return <NavLink to={'/login'} />

  }



  return <>

    {children}

  </>
}
