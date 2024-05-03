import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export const wishlistContext = createContext()

export default function WishlistContextProvider({ children }) {

    const [numOfwishListedItems, setNumOfwishListedItems] = useState(0)




    async function getUserWishlist() {

        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers: { token: localStorage.getItem('tkn') }
        })

        setNumOfwishListedItems(data.count)
        console.log(data);
        return data.data && data

    }

    async function addProductToWhishlist(productId) {

        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {

                "productId": productId,
            }, {
                headers: { token: localStorage.getItem('tkn') }
            })
            if (data?.status === 'success') {


                // toast.success(data?.message)

                return data

            } else {
                toast.error('error occurred')
            }

        }
        catch (error) {
            console.log('error', error)
        }

    }


    async function removeProductFromWishlist(productId) {

        // setLoading(true)


        const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers: { token: localStorage.getItem('tkn') }

        })

        // setLoading(false)

        getUserWishlist()

        return data

    }




    useEffect(function () {
        if (localStorage.getItem('tkn') !== null) {
            getUserWishlist()
            console.log(getUserWishlist());
            console.log('sssssssssssssss');

        }

    }, [])


    return (
        <wishlistContext.Provider
            value={{
                getUserWishlist,
                numOfwishListedItems,
                addProductToWhishlist,
                removeProductFromWishlist
            }}>
            {children}
        </wishlistContext.Provider>
    )
}
