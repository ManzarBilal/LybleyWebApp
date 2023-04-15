import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '@/redux/actions/category';
import Header from '../header';
import Cards from '../cards';
import Footer from '../footer';
import { useRouter } from 'next/router';

const Brand = () => {
const router=useRouter();
const {id}=router.query;

    const dispatch=useDispatch();
    const brandsCategories=useSelector(state=>state.categories)
    const allBrands=useSelector(state=>state?.brands)
    let brand=allBrands?.allBrands?.find(el=>el._id===id);

    useEffect(()=>{
       dispatch(getAllCategories(id));
    },[])


  return (
    <div className='bg_image'>
    <Header />
    <div className='m-5'>
        <img src={brand?.brandLogo} alt='logo' height="100" width="200" />
    </div>
    <div className='container'>
       <img src={brand?.brandBanner} alt='' width="100%" height="300" />
       <div className='row mt-5'>
         {brandsCategories?.length===0 ? <h4 className='text-center'>Comming soon!</h4> : brandsCategories?.map(p1=>
           <div className='col-md-3 col-6 d-flex justify-content-center mb-3'> <Link href={`/productDescription?id=${p1?._id}`} className='text-decoration-none'><Cards img={p1?.categoryImage} title={p1?.categoryName} brand={true} /> </Link></div>
            )}
       </div>
    </div>
    <Footer />
    </div>
  )
}

export default Brand;