import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '@/redux/actions/category';
import Header from '../header';
import Cards from '../cards';
import Footer from '../footer';
import { useRouter } from 'next/router';
import httpCommon from '@/http-common';

const Brand = () => {
  const router = useRouter();
  const { id } = router.query;
  const [page,setPage]=useState(1);

  const dispatch = useDispatch();
  const brandsCategories = useSelector(state => state.categories)
   
  const allBrands = useSelector(state => state?.brands)
  let brand = allBrands?.allBrands?.find(el => el._id === id);

  useEffect(() => {
   dispatch(getAllCategories(id));
  }, [dispatch]);

  let pageNum=page;
  let size=12;
  let startIndex=(pageNum-1)*size;
  let endIndex= brandsCategories?.length > (startIndex+size-1) ? startIndex+size-1 : brandsCategories?.length-1;
  let brandsCategories1=brandsCategories?.length>size ? brandsCategories?.filter((lt,index)=>index>=startIndex && index<=endIndex)  : brandsCategories;
 
  return (
    <div className='bg_image '>
      <Header />
      <div className='container'>
      <div className=' row d-flex justify-content-center'>
        <div className='col-12'>
          <div className='mt-5 mb-5'>
            <img className='rounded'  src={brand?.brandLogo} alt='logo' height="100" width="100" />
          </div>
          <div >
      
            <img className='rounded' src={brand?.brandBanner} alt='' width="100%" height="350" />
            <h3 className='mt-3' style={{fontFamily:"sans-serif"}}>About us</h3>
          <p style={{textAlign:"justify",fontFamily:"sans-serif"}}>{brand?.aboutUs}</p>
            <div className='row mt-5'>
            <div className='mb-3'><h2>Categories</h2></div>
              {brandsCategories?.length === 0 ? <h4 className='text-center'>Comming soon!</h4> : brandsCategories1?.map(p1 =>
                <div className='col-lg-3 col-md-6 col-12  d-flex justify-content-center mb-3'> <Link href={`/productDescription?id=${p1?._id}`} className='text-decoration-none'><Cards center={true}   img={p1?.categoryImage} title={p1?.categoryName} brand={true} /> </Link></div>
              )}
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
     {page===1 ? "" : <button className="btn btn-primary" onClick={()=>setPage(page-1)}>Prev</button>} {brandsCategories?.length>size ? <div className='ms-2 me-2'>{startIndex+1}-{endIndex+1} of {brandsCategories?.length}</div> : "" }{endIndex+1===brandsCategories?.length ? "" :<button className="btn btn-primary" onClick={()=>setPage(page+1)}>Next</button>}
      </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default Brand;