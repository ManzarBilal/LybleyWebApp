import httpCommon from '@/http-common';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ReactLoader from '../loading';
import "bootstrap/dist/css/bootstrap.css"
import style from "../common.module.css";
import Header from '../header';
import Footer from '../footer';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { getSparePartsByCat } from '@/redux/actions/sparePart';


const SparePartsByCategory = () => {
    const [loading, setLoading] = useState(false)
    const [spareParts, setSpareParts] = useState([])
    const [brandName, setBrandName] = useState("");
    const [modelName, setModelName] = useState("");

    const [page, setPage] = useState(1);
    const brandsCategories = useSelector(state => state.categories);
    const router = useRouter();
    const { category } = router.query;
    const category1=decodeURIComponent(category);
    const [catName, setCatName] = useState(category1);
    const allBrands = useSelector(state => state.brands)

    const dispatch = useDispatch();
    useEffect(() => {
        getAllSpareParts();
    }, [category1]);

    const getAllSpareParts = async () => {
        try {
            setLoading(true)
            const category2=encodeURIComponent(category1);
            console.log(category2);
            let response = await httpCommon.get(`/sparePartByCategory?category=${category1}`)
            let { data } = response;
            setSpareParts(data)
            dispatch(getSparePartsByCat(data));
            setLoading(false)

        }
        catch (err) {
            console.log(err)
            setLoading(false)

        }
    }

    const setCategory = (category) => {
        setCatName(category);
        router.query.category = category;
        router.push(router);
    }

    let spareParts1 = brandName ? spareParts?.filter(f1 => f1?.brandName === brandName) : (brandName && modelName) ? spareParts?.filter(f1 => f1?.brandName === brandName && f1?.productModel === modelName) : spareParts;
    let models = spareParts?.filter(f1 => f1?.category === catName);
    const array1 = models?.map(c1 => c1?.productModel);
    const uniqueModels = [...new Set(array1)];

    let pageNum = page;
    let size = 6;
    let startIndex = (pageNum - 1) * size;
    let endIndex = spareParts1?.length > (startIndex + size - 1) ? startIndex + size - 1 : spareParts1?.length - 1;

    let spareParts2 = spareParts1?.length > size ? spareParts1?.filter((lt, index) => index >= startIndex && index <= endIndex) : spareParts1;
    const array = brandsCategories?.data?.map(c1 => c1?.categoryName);
    const uniqueCategories = [...new Set(array)];

    return (
        <>
            <Header />
            {loading === true ?
                <div className='vh-100 d-flex align-items-center justify-content-center'><ReactLoader /></div>
                :
                <div className='container mt-5'>

                    <div className='row m-0 w-100 d-flex justify-content-between'>
                        <div className='col-12  col-md-3 col-lg-3 '>
                            <div className="border" >
                                <h4 className='fw-bold border p-3 bg-light mb-0'>Filter & Refine Results</h4>
                                <div style={{ height: "200px", overflowY: "scroll" }}>
                                    {allBrands?.allBrands?.filter(f1 => f1?.role === "BRAND")?.map((brand, i) => <div key={i} type="button" className={`border p-1 ${brandName === brand?.brandName ? "bg-dark text-white" : "text-muted"}`} onClick={(e) => setBrandName(brand?.brandName)} ><span className='ms-2 fw-bold'>{brand?.brandName}</span></div>
                                    )}
                                </div>
                            </div>
                            <div className="border mt-4" >
                                <h4 className='fw-bold border p-3 bg-light mb-0'>Filter by Category</h4>
                                <div style={{ height: `${uniqueCategories?.length >= 8 ? "200px" : ""}`, overflowY: "scroll" }}>
                                    {uniqueCategories?.map((cat, i) => <div key={i} type="button" className={`border p-1 ${catName === cat ? "bg-dark text-white" : "text-muted"}`} onClick={(e) => setCategory(cat)} ><span className='ms-2 fw-bold'>{cat}</span></div>
                                    )}
                                </div>
                            </div>
                            <div className="border mt-4" >
                                <h4 className='fw-bold border p-3 bg-light mb-0'>Filter by Model</h4>
                                <div style={{ height: `${uniqueCategories?.length >= 8 ? "200px" : ""}`, overflowY: "scroll" }}>
                                    {uniqueModels?.map((cat, i) => <div key={i} type="button" className={`border p-1 ${modelName === cat ? "bg-dark text-white" : "text-muted"}`} onClick={(e) => setModelName(cat)} ><span className='ms-2 fw-bold'>{cat}</span></div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-9 col-lg-9'>

                            <div className='row ms-lg-5 mt-3 mt-md-0 mt-lg-0 d-flex justify-content-start'>
                                <div className="d-flex justify-content-between align-items-center"> <h3 className='fw-bold ms-md-3'> <u> Spare Parts </u></h3> <div className='d-flex'><h5 className='me-1'>{spareParts1?.length}</h5>results</div></div>
                                {spareParts2?.length === 0 ? <h3 className='text-center mt-5'>No Spare Parts available</h3> : spareParts2?.map((p1, i) => <div className="col-lg-4 col-md-6 col-6 d-flex justify-content-center mb-4 mt-3" key={i} >
                                    <Link href={`/productDetailPage?id=${p1._id}`} className="text-decoration-none text-dark">
                                        <div className={`${style.cardHeaderH} card border-0`}>
                                            <img src={p1?.images[0]} className={`${style.productDtlCard} card-img-top`} alt="..." />
                                            <div className="card-body"  >
                                                <div className={`${style.productDtlCardFnttitle}`}>{p1?.partName}</div>

                                                <div className={`${style.productDtlCardFnt} card-text`}>{"Best Price - " + p1?.bestPrice + " INR"}</div>
                                                <div className={`${style.productDtlCardFnt} text-muted text-decoration-line-through`}>{"MRP - " + p1?.MRP + " INR"}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                )}
                                <div className='row d-flex justify-content-between'>
                                    {page === 1 ? <div></div> : <div className=""><button className='btn btn-primary' onClick={() => setPage(page - 1)}>Prev</button></div>}  {endIndex + 1 === spareParts1?.length ? <div></div> : <div className="text-end "><button className='btn btn-primary' onClick={() => setPage(page + 1)}>Next</button></div>}

                                </div>
                            </div>
                        </div>



                    </div>

                </div>
            }
            <Footer />
        </>
    )
}

export default SparePartsByCategory