import React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import { useState } from 'react'
import Header from '../header'
import Footer from '../footer'
import Cards from '../cards'
 

 
 const ProductDescription = () => {
    const [imageP,setImageP]=useState(["https://5.imimg.com/data5/WG/PR/MT/SELLER-7700072/ashok-leyland-spare-part-500x500.png"
,"https://5.imimg.com/data5/WG/PR/MT/SELLER-7700072/ashok-leyland-spare-part-500x500.png"
,"https://5.imimg.com/data5/WG/PR/MT/SELLER-7700072/ashok-leyland-spare-part-500x500.png",
"https://5.imimg.com/data5/WG/PR/MT/SELLER-7700072/ashok-leyland-spare-part-500x500.png",
"https://5.imimg.com/data5/WG/PR/MT/SELLER-7700072/ashok-leyland-spare-part-500x500.png"
])
  return (
    <>
    <Header />
    <div className='container'>
          <div>
             <img src='https://images.jdmagicbox.com/quickquotes/images_main/imlvo8wloe-148846219-g70if.jpg' alt='3D image' height="150" width="200" />
          </div>
          <div className='row'>
            {imageP?.map((item,i)=>
            <div  className='col-md-3 col-6 d-flex justify-content-center mb-3' key={i}>
              <Cards img={item} title="cooler" brand={true}/>
            </div>
             )}
          </div>
    </div>
    <Footer />
    </>
  )
}
export default ProductDescription;