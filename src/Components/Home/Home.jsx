import CategorySlider from "../CategorySlider/CategorySlider";
import HomeSlider from "../HomeSlider/HomeSlider";
import Products from "../Products/Products";


export default function Home() {




  return <>

    <section id="Home">


      <HomeSlider />


      <CategorySlider />


      <Products />

    </section>

  </>











  {/* {allProducts ? <section>
    <div className="container py-4">
      <div className="row gy-4">
 
        {allProducts.map( function( product , idx ){ return    <div key={idx} className="col-md-3">
            <div className="text-success">
              <img src={product.imageCover} className='w-100' alt="" />
              <h6 className='text-black'>{product.category.name}</h6>
              <p className='fw-bold'>{product.title}</p>
              <div className='d-flex justify-content-between'>
                <h6>{product.price} EPG</h6>
                <span>{product.ratingsAverage}<i className="fa-solid fa-star text-warning"></i></span>
              </div>
              <button onClick={dispalyProductDetails}  className='btn btn-info w-100'>Add</button>
            </div>
          </div> } )}
     
      </div>
    </div>
  </section> :  <p className='vh-100 d-flex justify-content-center'> <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                      /> </p>} */}




}
