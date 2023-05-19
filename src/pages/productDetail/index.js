import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Header from '../header';
import Footer from '../footer';
import Cards from '../cards';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpareParts } from '@/redux/actions/sparePart';
import ReactPlayer from 'react-player';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import httpCommon from '@/http-common';
import { getProductById } from '@/redux/actions/product';


const ProductDetail = () => {


  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const [hasWindow, setHasWindow] = useState(false);
  const [videoUrl, setVideoUrl] = useState([])
  const playerRef = useRef(null);
  const [page,setPage]=useState(1);

  const getSpareParts = useSelector(state => state?.spareParrts);
  const brandsCategories = useSelector(state => state.categories)
  const products = useSelector(state => state.products)


  let productImage = products?.find(el => el?._id === getSpareParts.find((f1, i) => i === 0)?.productId);


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

    dispatch(getAllSpareParts(id));
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
    getFaults()
    getVideos();
  }, [dispatch])

  const getVideos = async () => {
    try {
      let response = await httpCommon.get("/getAllVideos");
      let { data } = response;
      setVideoUrl(data);
    } catch (err) {
      console.log(err);
    }
  }

  let getSpareParts1 =faultType==="all" ? getSpareParts : getSpareParts?.filter(el => el?.faultType?.find(f => f === faultType));



  let sp = getSpareParts?.find((sp1, index) => index === 0)
  let videoUrl1 = videoUrl?.filter(v1 => v1.productModel === sp?.productModel);

  let pageNum=page;
  let size=12;
  let startIndex=(pageNum-1)*size;
  let endIndex= getSpareParts1?.length > (startIndex+size-1) ? startIndex+size-1 : getSpareParts1?.length-1;
  let getSpareParts2=getSpareParts1?.length>size ? getSpareParts1?.filter((lt,index)=>index>=startIndex && index<=endIndex)  : getSpareParts1;
  return (
    <div className='bg_image'>
      <Header />
      <div className='container'>
        <div className='row d-flex justify-content-center'>
          <div className='col-12 mt-5'>
            <div className='row mt-5'>
              <div className='col-lg-8 col-md-6 col-12'>
                <img src={productImage?.productImage} className='rounded-circle' height="200" width="200" />
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

            <div className='row mt-5'>
              <div className='mb-3'><h2>Spare Parts</h2></div>

               {getSpareParts2?.map((p1, i) =>
                <div className='col-lg-3 col-md-6 col-12 d-flex justify-content-center mb-4' key={i} >
                  <Link href={`/detail?id=${p1._id}`} className="text-decoration-none text-dark">
                    <div className="card">
                      <img src={p1?.images[0]} class="card-img-top" alt="..." style={{ height: "220px", width: "250px" }} />
                      <div className="card-body">
                        <h5 className="card-title">{p1?.partName}</h5>
                        <p className="card-text">{"Best Price - " + p1?.bestPrice + " INR"}</p>
                        <p className='text-muted text-decoration-line-through'>{"MRP - " + p1?.MRP + " INR"}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
              <div className="d-flex justify-content-center align-items-center mt-3">
              {page===1 ? "" : <button className="btn btn-primary" onClick={()=>setPage(page-1)}>Prev</button>} {getSpareParts1?.length>size ? <div className='ms-2 me-2'>{startIndex+1}-{endIndex+1} of {getSpareParts1?.length}</div> : "" }{endIndex+1===getSpareParts1?.length ? "" :<button className="btn btn-primary" onClick={()=>setPage(page+1)}>Next</button>}
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
      <Footer />
    </div>
  )
}

export default ProductDetail;