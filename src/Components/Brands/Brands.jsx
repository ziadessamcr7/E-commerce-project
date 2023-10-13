import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'

export default function Brands() {

  const [brand, setBrand] = useState(null)


  async function getAllBrands() {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    setBrand(data.data)
  }

  useEffect(function () {
    getAllBrands()
  }, [])

  if (brand === null) {
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

  return <div id='brands' className='container'>

    <div className="row g-3">

      {brand?.map((brand) => {
        return <div className="col-md-3">
          <div className='text-center border border-2 rounded-2'>
            <img src={brand.image} className='w-100' alt="" />
            <p> {brand.name} </p>
          </div>
        </div>
      })}



    </div>

  </div>

}
