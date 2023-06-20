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
   const [page, setPage] = useState(1);
   const router = useRouter();
   const dispatch = useDispatch();
   const { id } = router.query;

   const allBrands = useSelector(state => state?.brands)
   const brandsCategories = useSelector(state => state.categories)


   const product = useSelector(state => state?.products)
   useEffect(() => {
      dispatch(getProductById(id));
   }, [dispatch, id]);

   const handleClose = () => {
      setOpen(false);
   };

   let pageNum = page;
   let size = 12;
   let startIndex = (pageNum - 1) * size;
   let endIndex = product?.length > (startIndex + size - 1) ? startIndex + size - 1 : product?.length - 1;
   let product1 = product?.length > size ? product?.filter((lt, index) => index >= startIndex && index <= endIndex) : product;

   const brandLogo = allBrands?.allBrands?.find(f1 => f1?._id === (product?.length>0 ?product[0].userId :"" ))
   const categoryLogo = brandsCategories?.find(f1 => f1?._id === id)
   // ?.filter((it,i)=>i===0)?.userId);
   
   return (
      <div className='bg_image'>
         <Header />
         <div className='container mt-4' >
            {/* <div>
             <img src='https://images.jdmagicbox.com/quickquotes/images_main/imlvo8wloe-148846219-g70if.jpg' alt='3D image' height="150" width="200" />
          </div> */}
            <div className='row mt-5 mb-5  '>
               <div className='col-12 col-md-4 col-lg-4 border'>
                  <div className='mt-3 mb-3  align-items-center d-flex justify-content-between '>
                     <div>
                        <h2><u>Brand </u></h2>
                        <div><h2>{brandLogo?.brandName}</h2></div>
                     </div>
                     <img className='rounded' src={brandLogo?.brandLogo} alt='logo' height="150" width="150" />
                  </div>
               </div>
               <div className='col-12 col-md-4 col-lg-4'>
               </div>
               <div className='col-12 col-md-4 col-lg-4 border'>
                  <div className='mt-3 mb-3  align-items-center d-flex justify-content-between'>
                  <div>
                        <h2><u>Category </u></h2>
                        <div><h2>{categoryLogo?.categoryName}</h2></div>
                     </div>
                     <img className='rounded' src={categoryLogo?.categoryImage} alt='logo' height="150" width="150" />
                  </div>
               </div>

            </div>
            <div >
               <div className='mb-3'><h2><u>Products</u></h2></div>
               {product.length === 0 ? <h4 className='text-center'>Product Comming soon!</h4> : product1?.map((item, i) =>
                  <div className='col-lg-3 col-md-6 col-6  d-flex justify-content-center mb-3' key={i}>
                     <Cards productId={id} id={item?._id} product={true} img={item?.productImage} description={item?.productDescription} title={item?.productName} brand={true} />


                     {/* <img className='img-fluid w-100' src={item?.productImage} style={{height:"280px"}} /> */}
                  </div>
               )}
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
               {page === 1 ? "" : <button className="btn btn-primary" onClick={() => setPage(page - 1)}>Prev</button>} {product?.length > size ? <div className='ms-2 me-2'>{startIndex + 1}-{endIndex + 1} of {product?.length}</div> : ""}{endIndex + 1 === product?.length ? "" : <button className="btn btn-primary" onClick={() => setPage(page + 1)}>Next</button>}
            </div>
         </div>
         <Footer />
      </div>
   )
}
export default ProductDescription;