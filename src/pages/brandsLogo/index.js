import Link from 'next/link';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands } from '@/redux/actions/brand';
import style from "./brandLogo.module.css"

const BrandsLogo = () => {
  const dispatch=useDispatch();
    const brandsLogo=useSelector(state=>state.brands)
   
    useEffect(()=>{
       dispatch(getAllBrands());
    },[])

  return (
    <div className='container mt-3'>
        <div className='row  d-flex justify-content-center'>
        {brandsLogo?.allBrands?.filter(b1=>b1?.approval==="APPROVED")?.map((img,i)=>
        <div key={i} className={` ${style.brandLodoMargin} d-flex justify-content-center col-md-3 col-lg-1 col-3`} > 
           <Link href={`/brand?id=${img?._id}`} > <img   className='rounded' src={img?.brandLogo} alt={img?.brandName} height="45" width="45"/> </Link>
        </div>
            )}
            </div>
    </div>
  )
}

export default BrandsLogo;