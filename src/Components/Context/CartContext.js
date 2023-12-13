import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext()



export function CartContextProvider({ children }) {

    const [cartProducts, setCartProducts] = useState([])
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [cartId, setCartId] = useState(null)


    async function addProductToCart(Id) {
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
                "productId": Id
            },
                {
                    headers: { token: localStorage.getItem('tkn') }
                })

            getUserCart()

            return data  // lazeem

        }
        catch (err) {
            console.log('error', err)
        }
    }

    async function getUserCart() {

        try {

            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: { token: localStorage.getItem('tkn') }
            })

            setTotalCartPrice(data.data.totalCartPrice)
            setNumOfCartItems(data.numOfCartItems)
            setCartProducts(data.data.products)
            setCartId(data.data._id)

        }
        catch (error) {
            console.log('error', error)
        }
    }

    async function removeProduct(productId) {

        try {

            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                headers: { token: localStorage.getItem('tkn') }
            })

            setCartProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)
            setNumOfCartItems(data.numOfCartItems)

            return data

        } catch (error) {
            console.log('error', error)

        }


    }

    async function updateProduct(productId, count) {
        const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            "count": count
        }, {
            headers: { token: localStorage.getItem('tkn') }
        })

        setNumOfCartItems(data.numOfCartItems)
        setCartProducts(data.data.products)
        setTotalCartPrice(data.data.totalCartPrice)

        return data
    }

    async function removeCartData() {
        const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: { token: localStorage.getItem('tkn') }
        })

        setCartProducts([])
        setTotalCartPrice(0)
        setNumOfCartItems(0)

    }


    useEffect(function () {
        getUserCart()
    }, [])



    return <cartContext.Provider value={{
        cartId,
        removeCartData,
        updateProduct,
        removeProduct,
        getUserCart,
        addProductToCart,
        cartProducts,
        numOfCartItems,
        totalCartPrice,
        setCartProducts,
        setTotalCartPrice,
        setNumOfCartItems,
    }}>


        {children}


    </cartContext.Provider>
}