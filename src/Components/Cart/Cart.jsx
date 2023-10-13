import React, { useContext, useState } from 'react'
import { cartContext } from '../Context/CartContext'
import { ColorRing, RotatingLines } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Cart() {

    const { removeCartData, updateProduct, removeProduct, cartProducts, totalCartPrice, numOfCartItems } = useContext(cartContext)

    const [Loading, setLoading] = useState(false)

    if (Loading === true) {
        return <p id='loading-layer' className='d-flex justify-content-center align-items-center'>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="50"
                visible={true}
            />
        </p>
    }

    if (cartProducts === null) {
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
    if (cartProducts.length === 0) {
        return <>
            <h2 className='pt-3'> </h2>
            <h2 className='pt-5 vh-100'>Empty cart <Link className='text-success' to={'/home'} >Get some products</Link> </h2>
        </>
    }

    async function deleteProduct(id) {

        setLoading(true)

        const res = await removeProduct(id)

        if (res.status === 'success') {
            toast.success('Prodcut Removed Successfully')
            // return <h1> deleted Successfully </h1>
        }

        setLoading(false)
    }


    async function updateElementCounter(id, count) {
        const res = await updateProduct(id, count)

        if (res.status === 'success') {
            toast.success('updated successfully')
        }
    }



    return <section id='cart' className='container pb-3 mb-4 position-relative'>

        <div className="row bg-">
            <div className="col-md-9">
                <div className='bg-dark-subtle p-3 rounded-2'>
                    <h4 className='text-success'>Total Price: {totalCartPrice} EGP</h4>
                    <h4 className='text-primary mb-4 border-bottom border-3 pb-2'> Number Of Cart Items:({numOfCartItems}) </h4>

                    {cartProducts.map((product, idx) => {
                        return <div className="row align-items-center py-3 border-3 border-bottom">
                            <div className="col-md-1">
                                <img src={product.product.imageCover} className='w-100' alt="" />
                            </div>
                            <div className="col-md-9">
                                <h6>Item Price: {product.price} </h6>
                                <h6>Name: {product.product.title} </h6>
                                <button onClick={() => { deleteProduct(product.product.id) }} className='btn btn-outline-danger'>Remove</button>
                            </div>
                            <div className="col-md-2">
                                <div className='d-flex align-items-center'>
                                    <button onClick={() => { updateElementCounter(product.product.id, product.count + 1) }} className='btn btn-outline-success'>+</button>
                                    {updateProduct ? <span className='mx-2'>{product.count}</span> : 'hi'}
                                    <button onClick={() => { updateElementCounter(product.product.id, product.count - 1) }} className='btn btn-outline-success'>-</button>
                                </div>
                            </div>
                        </div>



                    })}
                </div>
            </div>

            <div className="col-md-3">
                <div className='bg-dark-subtle p-2 rounded-2'>
                    <h6 className='border-bottom border-1 pb-2'>CART SUMMARY</h6>
                    <div className='d-flex justify-content-between align-items-center border-bottom border-1 pb-2'>
                        <span>Subtotal</span>
                        <h5 className='fs-4'>EGP {totalCartPrice} </h5>
                    </div>
                    <Link to={'/payment'} className='btn btn-success w-100 mt-2' >CheckOut </Link>

                </div>
            </div>
        </div>




        <button onClick={removeCartData} className='btn btn-warning mt-3 d-block ms-auto' >Clear Cart</button>

    </section>
}
