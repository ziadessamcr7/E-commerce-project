import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ColorRing, RotatingLines } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { authContext } from './../Context/Authentication';
import { wishlistContext } from '../Context/WishlistContext'
import ReactPaginate from 'react-paginate'
import Pagination from '../Pagination/Pagination'

export default function Products() {

    // let [productsArray, setProductsArray] = useState([])
    let [productsArray2, setProductsArray2] = useState([])

    let [productList, setProductList] = useState([])

    const [prodId, setProdId] = useState([])

    const [wishIcon, setWishIcon] = useState([]);

    const [totalNumOfPages, setTotalNumOfPages] = useState([]);





    const { addProductToCart, getUserCart } = useContext(cartContext)
    const { addProductToWhishlist, getUserWishlist, removeProductFromWishlist } = useContext(wishlistContext)

    // const { isLoading, isFetching, data } = useQuery('allProducts', getAllProducts)

    useEffect(() => {

        // setProductsArray(data?.data?.data)
        // setProductsArray2(data?.data?.data)
        // // setProductsArray2(data?.data.data)
        // console.log(data?.data?.data)
        getAllProducts(1)
    }, [])



    // if (isLoading) {
    //     return <p className='vh-100 d-flex justify-content-center' id='loading-icon'> <ColorRing
    //         visible={true}
    //         height="80"
    //         width="80"
    //         ariaLabel="blocks-loading"
    //         wrapperStyle={{}}
    //         wrapperClass="blocks-wrapper"
    //         colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    //     /> </p>
    // }





    async function getAllProducts(pageNum, pageLimit) {
        await axios.get('https://ecommerce.routemisr.com/api/v1/products', {
            params: {
                page: pageNum,
                limit: 42
            }
        })
            .then((response) => {
                setProductList(response.data.data)
                setProductsArray2(response.data.data)
                console.log(response.data);
                setTotalNumOfPages(response.data.metadata.numberOfPages)
            })
            .catch((error) => {
                console.log(error);
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


    function search(e) {
        console.log(e.target.value)
        let searchValue = e.target.value
        let myProduct = [...productsArray2]
        myProduct = productsArray2?.filter((el) => {
            return el.title.toLowerCase().includes(searchValue.toLowerCase())
        })

        setProductList(myProduct)
    }

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

    const handlePageChange = (data) => {

        const currentPage = data.selected + 1
        console.log(currentPage);
        getAllProducts(currentPage)
    }


    useEffect(() => {
        showWhishlist()
        getUserCart()
    }, [])




    return <section id='products' className=''>
        <div className="container position-relative pb-3">


            <div className="row gy-4">
                <input type="text" onChange={(e) => { search(e) }} placeholder='Search Products...' className='form-control' name="" id="" />


                {productList?.map(function (product, idx) {

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

            <Pagination handlePageChange={handlePageChange}
                totalNumOfPages={totalNumOfPages} />
        </div>
    </section>

}
