import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrandCategories  } from '@/redux/actions/category';
 
import { useRouter } from 'next/router';
import httpCommon from '@/http-common';
import style from "../common.module.css";
import { showLoading } from '@/redux/actions/sparePart';
import ReactLoader from '../loading';
import { getAllBrands } from '@/redux/actions/brand';
import { getProductByBrand } from '@/redux/actions/product';


const Brand = () => {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(1);
  const [show, setShowText] = useState(false);


  const dispatch = useDispatch();

  const productR = useSelector(state => state?.products)
  const product = productR?.data

  const brandsCategoriesR = useSelector(state => state.categories)
  const catByBrand=brandsCategoriesR?.data?.filter(f1=> f1?.userId===id)
  const catByProductModel=brandsCategoriesR?.data?.filter(f1=>product?.find(f2=>f2?.productCategory===f1?.categoryName))
  const mergedBrandsCategories = catByBrand.concat(catByProductModel);
  const brandsCategories=[...new Set(mergedBrandsCategories)];

  const allBrands = useSelector(state => state?.brands)
  let brand = allBrands?.allBrands?.find(el => el._id === id);

  useEffect(() => {
    dispatch(showLoading(true))
    dispatch(getAllBrands());
    dispatch(getAllBrandCategories());
    dispatch(getProductByBrand(id))
  }, [dispatch, id]);

  let pageNum = page;
  let size =12;
  let startIndex = (pageNum - 1) * size;
  let endIndex = brandsCategories?.filter(b1 => b1?.status === "ACTIVE")?.length > (startIndex + size - 1) ? startIndex + size - 1 : brandsCategories?.filter(b1 => b1?.status === "ACTIVE")?.length - 1;
  let brandsCategories1 = brandsCategories?.length > size ? brandsCategories?.filter((lt, index) => index >= startIndex && index <= endIndex) : brandsCategories;

 
  return (
    <div className='bg_image '>
       


      {brandsCategoriesR?.showLoading === true ? <div className='vh-100 d-flex align-items-center justify-content-center'><ReactLoader /></div>
        :
        <div className='container'>
          <div className=' row d-flex justify-content-center'>
            <div className='col-12'>
              <div className='mt-5 mb-3'>
                <img className='rounded' src={brand?.brandLogo} alt='logo' height="100" width="100" />
              </div>
              <div >
                <img className={`${style.brandBannerHgt} rounded`} src={brand?.brandBanner} alt='' width="100%" />
             <div className='row'>
              <div className='col-2'></div>
              <div className='col-12 col-mg-8 col-lg-8'>
              <div className='mt-5 fw-bold'> Home /<span className='text-primary'> Category</span></div>
              <h3 className='mt-4' style={{ fontFamily: "sans-serif" }}><u>About us </u></h3>
                <p className={`${style.bradAboutLg}`} style={{ textAlign: "justify", fontFamily: "sans-serif", whiteSpace: "pre-wrap" }}>{brand?.aboutUs}</p>
              </div>
              <div className='col-2'></div>
              </div>   
                {brand?.aboutUs?.length > 0 ?
                  <p className={`${style.bradAboutSm}`} style={{ textAlign: "justify", fontFamily: "sans-serif", whiteSpace: "pre-wrap" }}>{show ? brand?.aboutUs : brand?.aboutUs?.substring(0, 165) + "..."} {show === false ? <a className='text-decoration-none' onClick={() => setShowText(true)} style={{ cursor: "pointer" }}>Read more</a> : <a href='#' className='text-decoration-none' onClick={() => setShowText(false)} style={{ cursor: "pointer" }}>Hide</a>}</p>
                  : ""}
                <div className='row mt-5'>
                  <div className='mb-3'><h2><u>Categories </u></h2></div>
                  {brandsCategories?.filter(b1 => b1?.status === "ACTIVE")?.length === 0 ? <h4 className='text-center'>Comming soon!</h4> : brandsCategories1?.filter(b1 => b1?.status === "ACTIVE")?.map(p1 =>
                    <div className={`${style.cardHead} col-lg-3 col-md-6 col-6  d-flex justify-content-center mb-3`}> <Link href={`/productDescription?id=${p1?._id}`} className='text-decoration-none'>

                      <div className={`${style.cardHead} ${style.homePcategoryHead}  `}> <div   className='text-decoration-none'>
                        <div className={`${style.cardHeaderH}`}>
                          <div className="card border-0" >
                            <div className={`${style.homePcategory} mt-2 text-center d-flex justify-content-center align-items-center`}  >
                              <img src={p1?.categoryImage} className={`${style.cardImage1} img-fluid p-5`} alt={p1?.categoryName} width="200px" height="100px" />
                            </div>
                            <div className={`${style.textCateName} mb-3 text-center px-4 text-truncate `}   >{p1?.categoryName} </div>

                          </div>
                        </div>
                      </div>
                      </div>
                    </Link>
                    </div>
                  )}
                  {/* <Cards center={true} img={p1?.categoryImage} title={p1?.categoryName} brand={true} /> </Link></div>  */}
                </div>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  {page === 1 ? "" : <button className="btn btn-primary" onClick={() => setPage(page - 1)}>Prev</button>} {brandsCategories?.filter(b1 => b1?.status === "ACTIVE")?.length > size ? <div className='ms-2 me-2'>{startIndex + 1}-{endIndex + 1} of {brandsCategories?.filter(b1 => b1?.status === "ACTIVE")?.length}</div> : ""} {endIndex + 1 === brandsCategories?.filter(b1 => b1?.status === "ACTIVE")?.length ? "" : <button className="btn btn-primary" onClick={() => setPage(page + 1)}>Next</button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
     
    </div>
  )
}

export default Brand;