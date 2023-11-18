import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../Context/Authentication'
import axios from 'axios'
import { ColorRing, RotatingLines } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import HomeSlider from '../HomeSlider/HomeSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'

export default function Products() {

    let [porductListCopy, setProductListCopy] = useState([])

    // const [lodin, setlodin] = useState(false)

    const [redHeart, setRedHEart] = useState(false)

    const { addProductToCart } = useContext(cartContext)

    const { isLoading, isFetching, data } = useQuery('allProducts', getAllProducts)




    function getAllProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }


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


    console.log(data?.data.data)


    // const { Token } = useContext( authContext )

    // console.log( Token )
    // const [ allProducts , setAllProducts ]=    useState(null)

    // async function getAllProducts(){
    //   const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')


    //   console.log( data.data )
    //   setAllProducts( data.data )

    // }

    // useEffect(function(){

    //   getAllProducts()

    // },[])





    async function addProduct(id) {


        const res = await addProductToCart(id)

        console.log(res)

        if (res.status === 'success') {

            toast.success(res.message, {
                duration: 3000,
                position: "top-right",
                style: { background: 'green', color: "white" }
            })
        } else {
            toast.error('error happened')
        }



    }



    async function addProductToWhishlist(productId) {

        try {

            // document.querySelector('.fa-heart').style.color = 'red'

            // setlodin(true)


            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {

                "productId": productId,
            }, {
                headers: { token: localStorage.getItem('tkn') }
            })
            if (data.status === 'success') {
                toast.success(data.message)

            } else {
                toast.error('error occurred')
            }

            // setlodin(false)

            setRedHEart(true)


        }
        catch (error) {
            console.log('error', error)
        }

    }


    // if (lodin) {
    //     return <div className='Big-layer'> Loading... </div>
    // }




    function search(e) {

        let seachVal = e.target.value
        let myProduct = [...data?.data.data]
        let myProd = myProduct.filter((el) => {
            return el.title.toLowerCase().includes(seachVal.toLowerCase())
        })
        // console.log(e.target.value)
        setProductListCopy(myProd)
    }





    return <section id='products' className=''>
        <div className="container position-relative">


            <div className="row gy-4 mb-4">
                <input type="text" onChange={(e) => { search(e) }} placeholder='Search Products...' className='form-control' name="" id="" />


                {data?.data.data.map(function (product, idx) {
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
                                {/* <p>{product.id}</p> */}
                            </div>
                        </Link>
                        <div onClick={() => { addProductToWhishlist(product.id) }} style={{ cursor: "pointer" }}>

                            {redHeart ? <i class="fa-solid fa-heart fa-lg d-block ms-auto my-3 text-danger"></i> : <i class="fa-solid fa-heart fa-lg d-block ms-auto my-3"></i>}



                        </div>

                        <button onClick={() => { addProduct(product.id) }} className='btn bg-main w-100 fw-bold'> + ADD TO CART
                        </button>

                    </div>
                })}

            </div>
        </div>
    </section>






}
