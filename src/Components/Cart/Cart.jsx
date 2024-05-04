import React, { useContext, useState } from 'react'
import { cartContext } from '../Context/CartContext'
import { ColorRing, RotatingLines } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Cart() {

    const { removeCartData, updateProduct, removeProduct, cartProducts, totalCartPrice, numOfCartItems } = useContext(cartContext)

    const [Loading, setLoading] = useState(false)

    const [buffer, setBuffer] = useState(false)

    const [Num, setNum] = useState(false)

    const clearCart = async () => {
        setLoading(true)
        await removeCartData()
        setLoading(false)
    }


    async function deleteProduct(id) {

        setBuffer(id)

        const res = await removeProduct(id)

        if (res.status === 'success') {
            toast.success('Prodcut Removed Successfully')
        }

    }


    async function updateElementCounter(id, count) {

        setNum(id)

        const res = await updateProduct(id, count)

        res.data.products.map(ele => {
            if (ele.count === 0) {
                removeProduct(ele.product._id)

            }
        })

        if (res.status === 'success') {
            toast.success('updated successfully')
        }

        setNum(null)

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



    return <section id='cart' className='container pb-3 position-relative'>

        <div className="row bg-">
            <div className="col-md-8 mb-2">
                <div className='bg-success-subtle p-3 rounded-2'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h4 className=''> Products:({numOfCartItems}) </h4>
                        </div>
                    </div>


                    {cartProducts.map((product, idx) => {
                        return <div className="row align-items-center py-3 border-2 border-bottom border-success">
                            <div className="col-md-2">
                                <img src={product.product.imageCover} className='w-100' alt="" />
                            </div>
                            <div className="col-md-8">
                                <h6>Item Price: {product.price} </h6>
                                <h6>Name: {product.product.title} </h6>
                                <button onClick={() => { deleteProduct(product.product.id) }} className='btn btn-outline-danger'>
                                    {product.product.id === buffer ? <i className='fa-solid fa-spin fa-spinner px-4'></i> : <span> <i className='fa fa-trash'></i> Remove </span>}
                                </button>
                            </div>
                            <div className="col-md-2">
                                <div className='d-flex align-items-center justify-content-end'>
                                    <button onClick={() => { updateElementCounter(product.product.id, product.count + 1) }} className='btn btn-outline-success'>+</button>
                                    {Num == product.product.id ?
                                        <i className='fa-solid fa-spin fa-spinner mx-1'></i>
                                        : <span className='mx-2' id='num'>{product.count}</span>}
                                    <button onClick={() => { updateElementCounter(product.product.id, product.count - 1) }} className='btn btn-outline-success'>-</button>
                                </div>
                            </div>
                        </div>



                    })}
                </div>
            </div>

            <div className="col-md-4 position-relative">
                <div className='bg-success-subtle p-2 rounded-2 position-fixed w-25'>
                    <h6 className='border-bottom border-1 border-dark pb-2'>CART SUMMARY <i class="fa-solid fa-cart-shopping fa-lg text-success"></i> </h6>
                    <div className='d-flex justify-content-between border-bottom border-1 pb-2'>
                        <span className='fs-5 fw-bold'>Subtotal</span>
                        <h5 className='fs-4'>EGP {totalCartPrice} </h5>
                    </div>
                    <Link to={'/payment'} className='btn btn-success w-100 mt-2' >CheckOut </Link>
                    <div>
                        <button onClick={clearCart} className='btn btn-outline-danger mt-3 d-block ms-auto w-100' >
                            {Loading ? <i className='fa-solid fa-spin fa-spinner px-4'></i> : 'Clear Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>






    </section>
}
