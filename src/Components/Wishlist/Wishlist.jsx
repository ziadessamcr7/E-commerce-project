import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { cartContext } from '../Context/CartContext'
import { useQuery } from 'react-query'
import { ColorRing, RotatingLines } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { wishlistContext } from '../Context/WishlistContext'

export default function Wishlist() {



    const { addProductToCart } = useContext(cartContext)
    const { getUserWishlist, removeProductFromWishlist } = useContext(wishlistContext)


    const [itemId, setItemId] = useState(0)
    const [itemId2, setItemId2] = useState(0)

    const [item, setItem] = useState(null)

    useEffect(() => {
        getAllWishListItems()
    }, [])


    async function addToCart(id) {

        setItemId(id)

        await addProductToCart(id)


        removProdFromWishList(id)
        toast.success('product successfully added to your cart')


        setItemId(0)
        getAllWishListItems()


    }


    const getAllWishListItems = async () => {
        const wishListItems = await getUserWishlist()
        setItem(wishListItems.data)
        console.log(wishListItems);
    }

    const removProdFromWishList = async (prodId) => {
        setItemId2(prodId)
        const res = await removeProductFromWishlist(prodId)
        setItemId2(null)
        getAllWishListItems()
        console.log(res);
    }




    if (item == null) {
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

    if (item?.length === 0) {
        return <div className='pt-4'>
            <h2 className='pt-5 vh-100'>Add some favs <Link className='text-success' to={'/home'} > from here </Link></h2>

        </div>
    }



    return <section id='wishlist' className='container'>


        <div className="row g-5 mb-4">

            <h2>My Wishlist <i className='fa fa-heart text-danger'></i> </h2>


            {item?.map((product, idx) => {
                return <div key={idx} className="col-md-12">
                    <div className='bg-dark-subtle p-3 rounded-2 row align-items-center' >
                        <div className='col-md-2'>
                            {console.log(product)}
                            <img src={product.imageCover} className='w-100' alt="" />

                        </div>

                        <div className='col-md-8'>
                            <h5>{product.title}</h5>
                            <h6>{product.price} EGP</h6>
                            <div className='d-flex align-items-center'>
                                <h6 className='me-1'>Brand:</h6>
                                <h6>  {product.brand.name}  </h6>
                            </div>
                            <button onClick={() => { removProdFromWishList(product.id) }}
                                className='btn btn-outline-danger'>
                                {product.id == itemId2 ?
                                    <i className='fa-solid fa-spin fa-spinner px-4'></i> : <span> <i className='fa fa-trash'></i> Remove</span>}

                            </button>
                        </div>

                        <div className='col-md-2 py-2' >
                            <button onClick={() => { addToCart(product.id); setItemId2(0) }}
                                className='btn btn-outline-success'>
                                {product.id == itemId ?
                                    <i className='fa-solid fa-spin fa-spinner px-4'></i> : 'add to cart'}
                            </button>
                        </div>
                    </div>


                </div>
            })}



        </div>

    </section>
}
