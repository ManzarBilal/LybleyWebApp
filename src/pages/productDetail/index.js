import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Header from '../header';
import Footer from '../footer';
import Cards from '../cards';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '@/redux/actions/product';
const ProductDetail = () => {
  const [images, setImages] = useState([
    'https://5.imimg.com/data5/SELLER/Default/2021/6/ED/WN/JB/31656971/intex-air-cooler-1000x1000.png',
    'https://5.imimg.com/data5/SELLER/Default/2021/6/ED/WN/JB/31656971/intex-air-cooler-1000x1000.png',
    'https://5.imimg.com/data5/SELLER/Default/2021/6/ED/WN/JB/31656971/intex-air-cooler-1000x1000.png',
    'https://5.imimg.com/data5/SELLER/Default/2021/6/ED/WN/JB/31656971/intex-air-cooler-1000x1000.png',
    'https://5.imimg.com/data5/SELLER/Default/2021/6/ED/WN/JB/31656971/intex-air-cooler-1000x1000.png',
    'https://5.imimg.com/data5/SELLER/Default/2021/6/ED/WN/JB/31656971/intex-air-cooler-1000x1000.png',
    'https://5.imimg.com/data5/SELLER/Default/2021/6/ED/WN/JB/31656971/intex-air-cooler-1000x1000.png',
    'https://5.imimg.com/data5/SELLER/Default/2021/6/ED/WN/JB/31656971/intex-air-cooler-1000x1000.png',
    'https://5.imimg.com/data5/SELLER/Default/2021/6/ED/WN/JB/31656971/intex-air-cooler-1000x1000.png',
    'https://5.imimg.com/data5/SELLER/Default/2021/6/ED/WN/JB/31656971/intex-air-cooler-1000x1000.png'
  ])

  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const product = useSelector(state => state.products)
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch])
  console.log("product", product)
  return (
    <div className='bg_image'>
      <Header />
      <div className='row d-flex justify-content-center'>
        <div className='col-8'>
          <div className='container'>
            <img src='https://st.depositphotos.com/1000128/2690/i/450/depositphotos_26901455-stock-photo-3d-logo.jpg' className='rounded-circle' height="200" width="200" />
            <div className='row mt-5'>
              {images?.map(img1 =>
                <div className='col-md-3 col-6 d-flex justify-content-center mb-4'><Link href="/detail" className="text-decoration-none text-dark"> <Cards img={img1} title="RS.350" brand={true} /> </Link></div>
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