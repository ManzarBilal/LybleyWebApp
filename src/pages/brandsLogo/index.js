import Link from 'next/link';
import React, { useState } from 'react'
import brandsLogo from "../../assets/pngTree.png";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands } from '@/redux/actions/brand';
const BrandsLogo = () => {
  const dispatch=useDispatch();
    const brandsLogo=useSelector(state=>state.brands)
    console.log("brandLOgo",brandsLogo);
    const [logos,setLogo]=useState([
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-corporate-image-logo-png-image_1026060.jpg",
    ])
    useEffect(()=>{
       dispatch(getAllBrands());
    },[])

  return (
    <div className='container mt-5'>
        <div className='row '>
        {brandsLogo?.map((img,i)=>
        <div key={i} className='col-md-2 col-4 d-flex justify-content-center mb-3'>
           <Link href="/brand"> <img src={img?.brandLogo} alt={img?.brandName} height="150" width="150" /> </Link>
        </div>
            )}
            </div>
    </div>
  )
}

export default BrandsLogo;