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
   const [imageP, setImageP] = useState(["https://5.imimg.com/data5/WG/PR/MT/SELLER-7700072/ashok-leyland-spare-part-500x500.png"
      , "https://5.imimg.com/data5/WG/PR/MT/SELLER-7700072/ashok-leyland-spare-part-500x500.png"
      , "https://5.imimg.com/data5/WG/PR/MT/SELLER-7700072/ashok-leyland-spare-part-500x500.png",
      "https://5.imimg.com/data5/WG/PR/MT/SELLER-7700072/ashok-leyland-spare-part-500x500.png",
      "https://5.imimg.com/data5/WG/PR/MT/SELLER-7700072/ashok-leyland-spare-part-500x500.png"
   ])

   const router = useRouter();
   const { id } = router.query;

   const dispatch = useDispatch();
   const product = useSelector(state => state?.products)

   useEffect(() => {
      dispatch(getProductById(id));
   }, [])

   console.log("product", product);
   return (
      <div className='bg_image'>
         <Header />
         <div className='container' >
      
              
                  {/* <div>
             <img src='https://images.jdmagicbox.com/quickquotes/images_main/imlvo8wloe-148846219-g70if.jpg' alt='3D image' height="150" width="200" />
          </div> */}
                  <div className='row d-flex justify-content-center'>
                     {product.length === 0 ? <h4 className='text-center'>Product Comming soon!</h4> : product?.map((item, i) =>
                        <div className='col-md-3 col-6 d-flex justify-content-center mb-3' key={i}>
                           <Link className='text-decoration-none text-dark' href={`/productDetail?id=${item?._id}`}><Cards img={item?.productImage} description={item?.productDescription} title={item?.productName} brand={true} />
                           
                           </Link>
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