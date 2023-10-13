import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const authContext = createContext()

export default function AuthProvider({ children }) {

    const [Token, setToken] = useState(null)

    const [Name, setName] = useState(null)

    // const navigate = useNavigate()

    useEffect(function () {


        if (localStorage.getItem('tkn') !== null) {

            setToken(localStorage.getItem('tkn'))
            // setName('bizoo')
            // navigate('/products')

        }

    }, [])


    return <authContext.Provider value={{ Token, setToken, Name, setName }} >

        {children}


    </authContext.Provider>
}
