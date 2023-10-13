import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'

export default function Categories() {

  const [cate, setCate] = useState(null)

  async function getAllCategories() {

    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    console.log(data)
    setCate(data.data)
  }

  useEffect(function () {
    getAllCategories()
  }, [])

  if (cate === null) {
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

  return (
    <div id='categories' className='container'>
      <div className="row gy-3">

        {cate?.map((category) => {
          return <div className="col-md-4">
            <div className='border border-2 borde rounded-3'>
              <img src={category.image} className='w-100' height={'400px'} alt="kb9" />
              <h2 className='text-center p-4 text-success' >{category.name}</h2>
            </div>
          </div>
        })}




      </div>
    </div>
  )
}
