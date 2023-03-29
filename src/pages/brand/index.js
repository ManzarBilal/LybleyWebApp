import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Link from 'next/link';
import Header from '../header';
import Footer from '../footer';
import Cards from '../cards';
 
const Brand = () => {
    const [products,setProducts]=useState([
        "https://cdn.shpy.in/46103/1624978790898_SKU-0055_0.jpeg?width=600",
        "https://cdn.shpy.in/46103/1624978790898_SKU-0055_0.jpeg?width=600",
        "https://cdn.shpy.in/46103/1624978790898_SKU-0055_0.jpeg?width=600",
        "https://cdn.shpy.in/46103/1624978790898_SKU-0055_0.jpeg?width=600",
    ]);
  return (
    <div className='bg_image'>
    <Header />
    <div className='m-5'>
        <img src='https://lybley.com/APP/assets/backend/assets/images/text_only.png' alt='logo' height="100" width="200" />
    </div>
    <div className='container'>
       <img src="https://hdn-1.jioretailer.com/jioretailer/company/5/applications/6316f3d9c334522a29606e1d/theme/pictures/free/original/theme-image-1669353430549.jpeg" alt='' width="100%" height="300" />
       <div className='row mt-5'>
         {products?.map(p1=>
           <div className='col-md-3 col-6 d-flex justify-content-center mb-3'> <Link href="/productDescription" className='text-decoration-none'><Cards img={p1} title="Cooler" brand={true} /> </Link></div>
            )}
       </div>
    </div>
    <Footer />
    </div>
  )
}

export default Brand;