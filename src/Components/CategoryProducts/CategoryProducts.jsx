import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import { wishlistContext } from '../Context/WishlistContext'
import toast from 'react-hot-toast'
import notFounf from '../../images/no-product-found-f64bec64.webp'

export default function CategoryProducts() {

    let [productsArray2, setProductsArray2] = useState([])

    let [productList, setProductList] = useState([])

    const [prodId, setProdId] = useState([])

    const [wishIcon, setWishIcon] = useState([]);

    const { addProductToCart, getUserCart } = useContext(cartContext)
    const { addProductToWhishlist, getUserWishlist, removeProductFromWishlist } = useContext(wishlistContext)

    const catId = useParams()

    function getCategoryProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
            params: {
                category: catId.id
            }
        })
    }

    async function addProduct(id) {

        setProdId(id)
        const res = await addProductToCart(id)

        console.log(res)

        if (res?.status === 'success') {

            setProdId(null)
            toast.success(res.message, {
                duration: 3000,
                style: { background: 'green', color: "white" }
            })

        } else {
            toast.error('error happened')
        }

    }


    const { data, isLoading } = useQuery('categoryProducts', getCategoryProducts)

    console.log(data);

    const handleWishList = async (id) => {
        const isInWishlist = wishIcon.some((item) => item.id === id);

        if (isInWishlist) {
            await removeProductFromWishlist(id);
            setWishIcon(wishIcon.filter((item) => item.id !== id));
            toast.error('Remove From WishList', {
                duration: 4000,
                position: 'top-center',

                className: 'mt-2 bg-danger text-white',


            });
        } else {
            await addProductToWhishlist(id);
            setWishIcon([...wishIcon, { id }]);
            toast.success(" Added successfully to your wishlist", {
                duration: 4000,
                position: 'top-center',

                className: 'mt-2 bg-main text-white',
            });
        }
        getUserWishlist()
    };

    const showWhishlist = async () => {
        let res = await getUserWishlist();
        if (res.status == "success") {
            setWishIcon(res.data);
        }
    }



    useEffect(() => {
        showWhishlist()
    }, [])

    if (data?.data?.data?.length == 0) {
        return <div className='d-flex justify-content-center align-items-center vh-100'>
            <div>
                <img src={notFounf} className='w-100' alt="" />
            </div>
        </div>
    }

    return (
        <section id='products' className=''>
            <div className="container position-relative pb-3">


                <div className="row gy-4">


                    {data?.data?.data.map(function (product, idx) {
                        { console.log(product) }

                        return <div key={idx} className="col-6 col-sm-4 col-md-3 col-lg-2 product"  >

                            <Link to={`/productdetails/${product.id}`}>
                                <div title={product.title} className="">
                                    <img src={product.imageCover} className='w-100' alt="" />
                                    <p className='fw-bold'>{product.title.split(" ").slice(0, 3).join(' ')}</p>
                                    <h6 className='text-black'>{product.category.name}</h6>
                                    <div className='d-flex justify-content-between'>
                                        <h6>{product.price} EPG</h6>
                                        <span>{product.ratingsAverage}<i className="fa-solid fa-star text-warning"></i></span>
                                    </div>
                                </div>
                            </Link>

                            <button onClick={() => handleWishList(product.id)} className={`position-relative end-0 border-0 bg-transparent`}>
                                <i className={`${wishIcon.map((id) => id.id).includes(product.id) ? "fa-solid" : "fa-regular"} fa-heart text-danger fs-3`}></i>
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
    )
}
