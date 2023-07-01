import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrandCategories } from '@/redux/actions/category';
import Header from '../header';
import Cards from '../cards';
import Footer from '../footer';
import style from "../common.module.css";
import { showLoading } from '@/redux/actions/sparePart';
import ReactLoader from '../loading';


const Category = () => {

    const [page, setPage] = useState(1);
    const [show, setShowText] = useState(false);


    const dispatch = useDispatch();
    const brandsCategoriesR = useSelector(state => state.categories)
    const brandsCategories = brandsCategoriesR?.data




    useEffect(() => {
        dispatch(showLoading(true))
        dispatch(getAllBrandCategories());
    }, [dispatch]);

    let pageNum = page;
    let size = 12;
    let startIndex = (pageNum - 1) * size;
    let endIndex = brandsCategories?.length > (startIndex + size - 1) ? startIndex + size - 1 : brandsCategories?.length - 1;
    let brandsCategories1 = brandsCategories?.length > size ? brandsCategories?.filter((lt, index) => index >= startIndex && index <= endIndex) : brandsCategories;

    return (
        <div className='bg_image '>

            {brandsCategoriesR?.showLoading === true ? <div className='vh-100 d-flex align-items-center justify-content-center'><ReactLoader /></div>
                :
                <div className='container'>
                    <div className=' row d-flex justify-content-center'>
                        <div className='col-12'>
                            <div >
                                <div className='row mt-5'>
                                    <div className='mb-5'><h2><u>Categories </u></h2></div>

                                    {brandsCategories?.length === 0 ? <h4 className='text-center'>Comming soon!</h4> : brandsCategories1?.map(p1 =>

                                        <div className={`${style.cardHead} ${style.homePcategoryHead} col-lg-4 col-md-4 col-6  d-flex justify-content-center mb-5`}> <Link href={`/productDescription?id=${p1?._id}`} className='text-decoration-none'>
                                            <div className={`${style.cardHeaderH}`}>
                                                <div className="card border-0" >
                                                    <div className={`${style.homePcategory} mt-2 text-center`}  >
                                                        <img src={p1?.categoryImage} className={`${style.cardImage1} img-fluid`} alt={p1?.categoryName} width="50%" />
                                                    </div>
                                                    <div className="mb-3 text-center"   >{p1?.categoryName} </div>

                                                </div>
                                            </div>
                                        </Link></div>
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

        </div >
    )
}

export default Category;