import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';

export default function CategorySlider() {



    function getCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    const { data, isLoading } = useQuery('categorySlider', getCategories)


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        // arrows: false,
    };


    if (isLoading) {
        return <div className='d-flex justify-content-center'>

            <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />

        </div>
    }

    return <>

        <div className="container my-5">
            <div className="row">
                <h2>Categories Slider</h2>
                <div className="col-sm-12">



                    <Slider {...settings}>

                        {data?.data.data.map(function (category, idx) {
                            return <div key={idx}>
                                <img style={{ width: '100%', height: '250px', margin: 'auto' }} src={category.image} alt="" />
                                <h6 className='my-2 text-center'> {category.name} </h6>
                            </div>
                        })}

                    </Slider>

                </div>


            </div>
        </div>

    </>
}
