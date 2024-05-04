import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ColorRing, RotatingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import Slider from 'react-slick'

export default function ProductDetails() {

  const { id } = useParams()

  // console.log(id)

  const [productDetails, setProductDetails] = useState(null)

  const { addProductToCart } = useContext(cartContext)

  const [loader, setLoader] = useState(false)



  async function getProductDetails() {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setProductDetails(data.data)


    console.log(data);

  }



  useEffect(function () {
    getProductDetails()
  }, [])

  async function addProducts(id) {

    setLoader(true)


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

    setLoader(false)
  }

  // const { data, isLoading } = useQuery('productDetails', getProductDetails)

  // console.log(data)

  // if (isLoading) {
  //   return <h1>LOADING.....</h1>
  // }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };





  return <>


    {productDetails ? <div className="container " id='productDetails'>
      <div className="row d-flex align-items-center py-5">
        <div className="col-md-4 bg-success-subtle py-3">
          <div>
            <Slider {...settings}>

              {productDetails?.images?.map(function (img, idx) {
                return <div key={idx}>
                  <img className='w-100' src={img} alt="prodImg" />
                </div>
              })}

            </Slider>
          </div>
        </div>
        <div className="col-md-7 m-auto ">
          <div>
            <h2> {productDetails.title} </h2>
            <p className='text-muted'> {productDetails.description} </p>
            <h6 className='mb-4'> Category: {productDetails.category.name} </h6>
            <h6 className='mb-4'>Price: {productDetails.price}  EGP</h6>
            <button onClick={() => { addProducts(productDetails.id) }} className='btn btn-success w-100 fw-bold'>

              {loader ? <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
                : '+ ADD TO CART'}

            </button>
          </div>
        </div>
      </div>
    </div> : <p className=' d-flex justify-content-center align-items-center vh-100' id='loading-icon'> <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    /> </p>}


    {/* <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-3">
          <div>
            <img src={data.data.data.imageCover} className='w-100' alt="" />
          </div>
        </div>
        <div className="col-md-9">
          <h1>{data.data.data.title}</h1>
          <p> {data.data.data.description} </p>
          <p> {data.data.data.category.name} </p>
          <h6> {data.data.data.price} EGP </h6>
          <button className='btn btn-success w-100 text-white'> + ADD TO CART </button>
        </div>
      </div>
    </div> */}


  </>
}
