import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ColorRing, RotatingLines } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { authContext } from './../Context/Authentication';

export default function Products() {

    const [productsArray, setProductsArray] = useState()
    const [productsArray2, setProductsArray2] = useState()

    const { Token } = useContext(authContext)

    const [status, setStatus] = useState(null)

    const [prodId, setProdId] = useState([])

    const [prodId2, setProdId2] = useState([])



    const { addProductToCart } = useContext(cartContext)

    const { isLoading, isFetching, data } = useQuery('allProducts', getAllProducts)

    useEffect(() => {
        console.log();
        setProductsArray(data?.data.data)
        setProductsArray2(data?.data.data)

    }, [])


    // const getAllProducts = () => {
    //     axios.get('https://ecommerce.routemisr.com/api/v1/products')
    //         .then((response) => {
    //             console.log(response.data.data);
    //             setProductList(response.data.data)
    //         }).catch((error) => {
    //             console.log('errrooorr', error);
    //         })
    // }


    if (isLoading) {
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







    async function getAllProducts() {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }







    async function addProduct(id) {

        setProdId(id)
        const res = await addProductToCart(id)

        // console.log(res)

        if (res.status === 'success') {

            setProdId(null)
            toast.success(res.message, {
                duration: 3000,
                style: { background: 'green', color: "white" }
            })

        } else {
            toast.error('error happened')
        }

    }



    async function addProductToWhishlist(productId) {

        try {


            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {

                "productId": productId,
            }, {
                headers: { token: localStorage.getItem('tkn') }
            })
            if (data.status === 'success') {
                setProdId2(productId)
                setStatus(data.status)

                console.log(data);
                toast.success(data.message)

            } else {
                toast.error('error occurred')
            }

        }
        catch (error) {
            console.log('error', error)
        }

    }

    function search(e) {
        console.log(e.target.value)
        const searchValue = e.target.value
        let myProduct = [...productsArray2]
        myProduct = productsArray2.filter((el) => {
            return el.title.toLowerCase().includes(searchValue.toLowerCase())
        })

        data.data.data = myProduct
    }





    return <section id='products' className=''>
        <div className="container position-relative">


            <div className="row gy-4 mb-4">
                <input type="text" onChange={search} placeholder='Search Products...' className='form-control' name="" id="" />


                {data?.data?.data.map(function (product, idx) {

                    return <div key={idx} className="col-md-3 product"  >

                        <Link to={`/productdetails/${product.id}`}>
                            <div className="text-success">
                                <img src={product.imageCover} className='w-100' alt="" />
                                <h6 className='text-black'>{product.category.name}</h6>
                                <p className='fw-bold'>{product.title.split(" ").slice(0, 3).join(' ')}</p>
                                <div className='d-flex justify-content-between'>
                                    <h6>{product.price} EPG</h6>
                                    <span>{product.ratingsAverage}<i className="fa-solid fa-star text-warning"></i></span>
                                </div>
                            </div>
                        </Link>

                        <button onClick={() => { addProductToWhishlist(product.id) }} style={{ cursor: "pointer" }}>
                            {status == 'success' && prodId2 == product.id ?
                                <i className='fa solid fa-heart text-danger'></i>
                                : <i className='fa solid fa-heart'></i>}
                        </button>

                        <button onClick={() => { addProduct(product.id) }} className='btn bg-main w-100 fw-bold'>
                            {prodId == product.id ?
                                <i className='fa-solid fa-spin fa-spinner'></i> :
                                '+ ADD TO CART'}

                        </button>

                    </div>
                })}

            </div>
        </div>
    </section>






}
