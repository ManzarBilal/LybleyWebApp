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
import style from "../common.module.css";
import { showLoading } from '@/redux/actions/sparePart';
import { ReactLoader } from '../loading';

const Brand = () => {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(1);
  const [show, setShowText] = useState(false);
   

  const dispatch = useDispatch();
  const brandsCategoriesR = useSelector(state => state.categories)
const brandsCategories=brandsCategoriesR?.data

  const allBrands = useSelector(state => state?.brands)
  let brand = allBrands?.allBrands?.find(el => el._id === id);

  useEffect(() => {
    dispatch(showLoading(true))
    dispatch(getAllCategories(id));
  }, [dispatch, id]);

  let pageNum = page;
  let size = 12;
  let startIndex = (pageNum - 1) * size;
  let endIndex = brandsCategories?.length > (startIndex + size - 1) ? startIndex + size - 1 : brandsCategories?.length - 1;
  let brandsCategories1 = brandsCategories?.length > size ? brandsCategories?.filter((lt, index) => index >= startIndex && index <= endIndex) : brandsCategories;
 
  return (
    <div className='bg_image '>
      <Header />


      {brandsCategoriesR?.showLoading === true ? <div className='mt-5 text-center'><ReactLoader /></div>
        :
        <div className='container'>
          <div className=' row d-flex justify-content-center'>
            <div className='col-12'>
              <div className='mt-5 mb-3'>
                <img className='rounded' src={brand?.brandLogo} alt='logo' height="100" width="100" />
              </div>
              <div >
                <img className={`${style.brandBannerHgt} rounded`} src={brand?.brandBanner} alt='' width="100%" />
                <div className='mt-5 fw-bold'> Home /<span className='text-primary'> Category</span></div>
                <h3 className='mt-4' style={{ fontFamily: "sans-serif" }}><u>About us </u></h3>
                <p className={`${style.bradAboutLg}`} style={{ textAlign: "justify", fontFamily: "sans-serif" }}>{brand?.aboutUs}</p>
                {brand?.aboutUs?.length > 0 ?
                  <p className={`${style.bradAboutSm}`} style={{ textAlign: "justify", fontFamily: "sans-serif" }}>{show ? brand?.aboutUs : brand?.aboutUs?.substring(0, 165) + "..."} {show === false ? <a className='text-decoration-none' onClick={() => setShowText(true)} style={{ cursor: "pointer" }}>Read more</a> : <a href='#' className='text-decoration-none' onClick={() => setShowText(false)} style={{ cursor: "pointer" }}>Hide</a>}</p>
                  : ""}
                <div className='row mt-5'>
                  <div className='mb-3'><h2><u>Categories </u></h2></div>
                  {brandsCategories?.length === 0 ? <h4 className='text-center'>Comming soon!</h4> : brandsCategories1?.map(p1 =>
                    <div className={`${style.cardHead} col-lg-3 col-md-6 col-6  d-flex justify-content-center mb-3`}> <Link href={`/productDescription?id=${p1?._id}`} className='text-decoration-none'><Cards center={true} img={p1?.categoryImage} title={p1?.categoryName} brand={true} /> </Link></div>
                  )}

                </div>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  {page === 1 ? "" : <button className="btn btn-primary" onClick={() => setPage(page - 1)}>Prev</button>} {brandsCategories?.length > size ? <div className='ms-2 me-2'>{startIndex + 1}-{endIndex + 1} of {brandsCategories?.length}</div> : ""}{endIndex + 1 === brandsCategories?.length ? "" : <button className="btn btn-primary" onClick={() => setPage(page + 1)}>Next</button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <Footer />
    </div>
  )
}

export default Brand;