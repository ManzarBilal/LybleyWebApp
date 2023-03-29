import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Cards from '../components/cards/cards';
const Brand = () => {
    const [products,setProducts]=useState([
        "https://cdn.shpy.in/46103/1624978790898_SKU-0055_0.jpeg?width=600",
        "https://cdn.shpy.in/46103/1624978790898_SKU-0055_0.jpeg?width=600",
        "https://cdn.shpy.in/46103/1624978790898_SKU-0055_0.jpeg?width=600",
        "https://cdn.shpy.in/46103/1624978790898_SKU-0055_0.jpeg?width=600",
    ]);
  return (
    <>
    <div className='m-5'>
        <img src='https://lybley.com/APP/assets/backend/assets/images/text_only.png' alt='logo' height="100" width="200" />
    </div>
    <div className='container'>
       <img src="https://www.shutterstock.com/image-vector/electronics-home-appliances-promotional-shopping-600w-1190458765.jpg" alt='' width="100%" height="300" />
       <div className='row mt-5'>
         {products?.map(p1=>
            <div className='col-md-3 col-6 d-flex justify-content-center mb-3'> <Cards img={p1} title="Cooler" brand={true} /> </div>
            )}
       </div>
    </div>
    </>
  )
}

export default Brand;