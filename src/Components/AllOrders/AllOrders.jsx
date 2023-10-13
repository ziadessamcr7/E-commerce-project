import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../Context/CartContext'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { ColorRing } from 'react-loader-spinner'

export default function AllOrders() {

    // const { userId } = useContext(cartContext)

    const [userOrders, setUserOrders] = useState(null)

    useEffect(function () {

        const res = jwtDecode(localStorage.getItem('tkn'))

        getAllUserOrders(res.id)

    }, [])


    async function getAllUserOrders(id) {

        try {

            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)

            setUserOrders(data)

        } catch (error) {
            console.log('error', error)
        }



    }

    if (userOrders === null) {
        return <p className='vh-100 d-flex justify-content-center' id='loading-icon'> <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        /> </p>
    }


    return <section className='container' id='allorders'>

        <div className="row g-3">

            <div className="container my-4">
                <div className="row g-2">

                    {userOrders?.map(function (order, idx) {
                        return <div key={idx} className="col-md-12">
                            <h6>Order Number({idx + 1})</h6>
                            <div className='bg-dark-subtle rounded-2 p-3 mb-4'>

                                <div className='row'>


                                    {order.cartItems?.map(function (item, index) {
                                        return <div className='col-md-4 mb-2'>
                                            <div key={index} className='bg-success-subtle p-2 rounded-2 d-flex align-items-center'>
                                                <img src={item.product.imageCover} className='w-25' alt="" />
                                                <div className='px-4'>
                                                    <h6> {item.product.title} </h6>
                                                    <h6>count: {item.count} </h6>
                                                    <h6 className='text-success'>price: {item.price} </h6>
                                                </div>

                                            </div>
                                        </div>
                                    })}

                                    <p> phone: {order.shippingAddress.phone} </p>
                                    <p> payed in : {order.paymentMethodType} </p>
                                    <h5 className='text-success'>Total price: {order.totalOrderPrice}</h5>

                                </div>


                            </div>
                        </div>
                    })}

                </div>
            </div>



            {console.log(userOrders)}




        </div>



    </section>
}
