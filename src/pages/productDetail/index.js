import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Header from '../header';
import Footer from '../footer';
import Cards from '../cards';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpareParts } from '@/redux/actions/sparePart';
const ProductDetail = () => {


  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();

  const getSpareParts = useSelector(state => state?.spareParrts);
  useEffect(() => {

    dispatch(getAllSpareParts(id));

  }, [dispatch])


  return (
    <div className='bg_image'>
      <Header />
      <div className='container'>
        <div className='row d-flex justify-content-center'>
          <div className='col-12'>

            <img src='https://st.depositphotos.com/1000128/2690/i/450/depositphotos_26901455-stock-photo-3d-logo.jpg' className='rounded-circle' height="200" width="200" />
            <div className='row mt-5'>
              {getSpareParts?.map(img1 =>
                <div className='col-md-3 col-6 d-flex justify-content-center mb-4'><Link href={`/detail?id=${img1?._id}`} className="text-decoration-none text-dark"> <Cards img={img1?.images[0]} title={"Rs." + img1?.MRP} brand={true} /> </Link></div>
              )}
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductDetail;