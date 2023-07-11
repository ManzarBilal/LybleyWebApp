import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Header from '../header';
import Footer from '../footer';
import Cards from '../cards';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpareParts, showLoading } from '@/redux/actions/sparePart';
import ReactPlayer from 'react-player';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import httpCommon from '@/http-common';
import { getProductById } from '@/redux/actions/product';
import style from "../common.module.css";
import ReactLoader from '../loading';
import { getAllBrands } from '@/redux/actions/brand';

const ProductDetail = () => {


  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const [hasWindow, setHasWindow] = useState(false);
  const [videoUrl, setVideoUrl] = useState([])
  const playerRef = useRef(null);
  const [page, setPage] = useState(1);

  const getSparePartsR = useSelector(state => state?.spareParrts);
  const getSpareParts=getSparePartsR?.data
  
  const brandsCategories = useSelector(state => state.categories)
  const productsR = useSelector(state => state.products)
  const products=productsR?.data
  
  const allBrands = useSelector(state => state?.brands)


 
  const [faultType, setFaultType] = React.useState('all');
  const [allFaults, setAllFaults] = React.useState([]);

  const getFaults = async () => {
    try {
      let response = await httpCommon.get("/getAllFault");
      let { data } = response;
      setAllFaults(data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleChange = (event) => {
    setFaultType(event.target.value);
  };


  useEffect(() => {
    dispatch(showLoading(true))
    dispatch(getAllBrands());
    dispatch(getAllSpareParts(id));
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
    getFaults()
    getVideos();
  }, [dispatch, id])

  const getVideos = async () => {
    try {
      let response = await httpCommon.get("/getAllVideos");
      let { data } = response;
      setVideoUrl(data);
    } catch (err) {
      console.log(err);
    }
  }
  const brand=localStorage.getItem("brandLogoId")
 
  let brandImage = allBrands?.allBrands?.find(f1 => f1?._id === (getSpareParts?.length > 0 ? brand  : brand))
  // console.log("brandImage",getSpareParts[0].userIds,getSpareParts?.length > 0);
  // let productImage = products?.find(el => el?._id === getSpareParts?.find((f1, i) => i === 0)?.productId);
  let productImage = products?.find(el => el?._id === id);




  let getSpareParts1 = faultType === "all" ? getSpareParts : getSpareParts?.filter(el => el?.faultType?.find(f => f === faultType));



  let sp = getSpareParts?.find((sp1, index) => index === 0)
  let videoUrl1 = videoUrl?.filter(v1 => v1.productModel === sp?.productModel);

  let pageNum = page;
  let size = 12;
  let startIndex = (pageNum - 1) * size;
  let endIndex = getSpareParts1?.length > (startIndex + size - 1) ? startIndex + size - 1 : getSpareParts1?.length - 1;
  let getSpareParts2 = getSpareParts1?.length > size ? getSpareParts1?.filter((lt, index) => index >= startIndex && index <= endIndex) : getSpareParts1;
console.log("getSpareParts2",getSpareParts2);
  return (
    <div className='bg_image'>
      <Header />
      {getSparePartsR?.showLoading === true ? <div className='vh-100 d-flex align-items-center justify-content-center'><ReactLoader /></div>
        :
        <div className='container'>
          <div className='row d-flex justify-content-center'>
            <div className='col-12'>
              <div className='mt-5'>
                <img className='rounded' src={brandImage?.brandLogo} alt='logo' height="100" width="100" />
              </div>
            </div>
            <div className='col-12 '>
              <div className='row mt-5'>
                <div className='col-lg-8 col-md-6 col-12'>
                  <img src={productImage?.productImage} className='rounded-circle1' height="300" width="300" />
                  <h4 className='ms-md-4' >{productImage?.productName}</h4>
                </div>

                <div className='col-lg-4 col-md-6 mt-5 col-12 '>
                  <Box   >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Faults Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={faultType}
                        label="Faults Type"
                        size='small'
                        style={{ backgroundColor: "white" }}
                        onChange={handleChange}
                      >
                        <MenuItem value={"all"}> Select Fault</MenuItem>
                        {allFaults && allFaults?.map((item, i) => <MenuItem key={i} value={item?.faultName}>{item?.faultName}</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </div>
              <div className='mt-5 fw-bold'> Home / Category /  Product / <span className='text-primary'>Sparepart </span> </div>

              <div className='row mt-5'>
                <div className='mb-3'><h2> <u>Spare Parts</u></h2></div>

                { getSpareParts2?.length>0 ?
                getSpareParts2?.map((p1, i) =>
                  <div className="col-lg-3 col-md-6 col-6 d-flex justify-content-center mb-4" key={i} >
                    <Link href={`/productDetailPage?id=${p1._id}`} className="text-decoration-none text-dark">
                      <div className={`${style.cardHeaderH} card border-0`}>
                        <img src={p1?.images[0]} className={`${style.productDtlCard} img-fluid m-3`} alt={p1?.partName}    />
                        <div className="card-body"  >
                          <div className={`${style.productDtlCardFnttitle}`}>{p1?.partName}</div>

                          <div className={`${style.productDtlCardFnt} card-text`}>{"Best Price - " + p1?.bestPrice + " INR"}</div>
                          <div className={`${style.productDtlCardFnt} text-muted text-decoration-line-through`}>{"MRP - " + p1?.MRP + " INR"}</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                
                )  :<div className='fw-bold text-center'> SpareParts Comming soon!</div>
                }
                <div className="d-flex justify-content-center align-items-center mt-3">
                  {page === 1 ? "" : <button className="btn btn-primary" onClick={() => setPage(page - 1)}>Prev</button>} {getSpareParts1?.length > size ? <div className='ms-2 me-2'>{startIndex + 1}-{endIndex + 1} of {getSpareParts1?.length}</div> : ""}{endIndex + 1 === getSpareParts1?.length ? "" : <button className="btn btn-primary" onClick={() => setPage(page + 1)}>Next</button>}
                </div>



              </div>

            </div>
          </div>
          <div>

            <div className='mt-5'>
              <div><h2 className=' fw-bold'>DIY VIDEO</h2></div>
            </div>
            <div className='row mt-3'>
              {videoUrl1.length === 0 ? <div className='col-12  d-flex justify-content-center   fw-bold pt-5  pb-5 bg-dark text-white'> No Data available  </div>
                :
                videoUrl1?.map((url, i) => (<div className='col-md-3 col-12 mb-3' key={i}>
                  {hasWindow && <ReactPlayer ref={playerRef} url={url?.video} controls height="250" width="200" />}
                </div>))}

            </div>
          </div>
        </div>
      }
      <Footer />
    </div>
  )
}

export default ProductDetail;