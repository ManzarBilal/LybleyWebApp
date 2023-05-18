import React, { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import { useState } from 'react'
import Header from '../header'
import Footer from '../footer'
import Cards from '../cards'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '@/redux/actions/product';


const ProductDescription = () => {
  
   const router = useRouter();
   const { id } = router.query;

   const dispatch = useDispatch();
   const product = useSelector(state => state?.products)

   useEffect(() => {
      dispatch(getProductById(id));
   }, [])
   const handleClose = () => {
      setOpen(false);
  };

   
   return (
      <div className='bg_image'>
         <Header />
         <div className='container mt-4' >
                  {/* <div>
             <img src='https://images.jdmagicbox.com/quickquotes/images_main/imlvo8wloe-148846219-g70if.jpg' alt='3D image' height="150" width="200" />
          </div> */}
                  <div className='row '>
            <div className='mb-3'><h2>Products</h2></div>
                     {product.length === 0 ? <h4 className='text-center'>Product Comming soon!</h4> : product?.map((item, i) =>
                        <div className='col-lg-3 col-md-6 col-12  d-flex justify-content-center mb-3' key={i}>
                        <Cards  productId={id} id={item?._id} product={true} img={item?.productImage} description={item?.productDescription} title={item?.productName} brand={true} />
                           
                         
                           {/* <img className='img-fluid w-100' src={item?.productImage} style={{height:"280px"}} /> */}
                        </div>
                     )}
                  </div>
              
         
         </div>
         <Footer />
      </div>
   )
}
export default ProductDescription;