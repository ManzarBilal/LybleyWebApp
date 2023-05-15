import Link from 'next/link';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands } from '@/redux/actions/brand';


const BrandsLogo = () => {
  const dispatch=useDispatch();
    const brandsLogo=useSelector(state=>state.brands)
   
    useEffect(()=>{
       dispatch(getAllBrands());
    },[])

  
  return (
    <div className='container mt-5'>
        <div className='row '>
        {brandsLogo?.allBrands?.filter(b1=>b1?.approval==="APPROVED")?.map((img,i)=>
        <div key={i} className='col-md-2 col-6 d-flex justify-content-center mb-3'> 
           <Link href={`/brand?id=${img?._id}`}  > <img className='rounded' src={img?.brandLogo} alt={img?.brandName} height="100" width="100"/> </Link>
        </div>
            )}
            </div>
    </div>
  )
}

export default BrandsLogo;