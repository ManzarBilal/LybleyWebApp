import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Header from '../header';
import Footer from '../footer';
import ReactPlayer from 'react-player';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from "../../redux/actions/index"
import { useRouter } from 'next/router';
import { addToCart } from '@/redux/actions/addToCart';
import { ToastContainer, toast } from 'react-toastify';
const Detail = () => {
  const dispatch = useDispatch();
  const allSpareParts = useSelector(state => state?.spareParrts);
  const data = useSelector(state => state?.value);
  const [randomValue,setRandomValue]=useState("") 

  const [videoUrl, setVideoUrl] = useState(['https://youtu.be/0BIaDVnYp2A'
    , 'https://youtu.be/0BIaDVnYp2A'
    , 'https://youtu.be/0BIaDVnYp2A', 'https://youtu.be/0BIaDVnYp2A', 'https://youtu.be/0BIaDVnYp2A', 'https://youtu.be/0BIaDVnYp2A'])
  const playerRef = useRef(null);
  const router = useRouter()
  const { id } = router.query;
  const [hasWindow, setHasWindow] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }

  }, []);
  const getSparePart = allSpareParts?.find(f => f?._id === id)

  const [age, setAge] = React.useState('Option');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [mainImage, setMainImage] = useState(getSparePart?.images[0])

  const handleAddToCart = (id) => {
    let data = allSpareParts?.find(f => f?._id === id)
    const userId =localStorage.getItem("userId")
    let obj = { userId: userId, sparePartId: data?._id, MRP: data?.MRP, sparePartModel: data?.productModel, sparePartCategory: data?.category, sparePartName: data?.partName, sparePartImage: data?.images[0] }
    dispatch(addToCart(obj)) 
    let x = Math.floor((Math.random() * 5));
    setRandomValue(x);
  }

  return (
    <div className="bg_image">
   
      <Header randomValue={randomValue} detail={true} />
      <div className='container'>
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="product-details">
                <div className="row ">
                  <div className="col-lg-6 mt-3 mb-3 d-flex justify-content-between align-items-center "  >
                    <div className=" nav flex-column "  >
                      {getSparePart?.images?.map((img, i) => {
                        return <div className='border p-2 m-2'
                        >
                          <img onMouseEnter={() => setMainImage(img)} onClick={() => setMainImage(img)} role='button' key={i} height={60} width={60} src={img} alt="" />
                        </div>
                      })}
                    </div>
                    <div className="product-image pe-5">
                      <div   >
                        <img height={250} width={300} src={mainImage} alt="" />
                      </div>
                      {/* <div className='mt-3'>
                        <button className='btn btn-success'>Book Technician to Fit It - 300 Rs Only</button>
                      </div> */}
                    </div>
                  </div>

                  <div className="col-lg-6 d-flex justify-content-between align-items-center">
                    <div>
                      <div> <h2 className="fw-bold fs-4"> {getSparePart?.partName}</h2></div>
                      <div> <span className="text-muted ms-3">(449 customer review)</span></div>
                      <div> <h6 className="price-title fw-bold">Price</h6>
                        <p className="sale-price">Rs. {getSparePart?.MRP} </p>
                        <p className="regular-price text-danger">$ 179 USD</p></div>
                      <div><p> {getSparePart?.description} </p></div>
                      <div> <div className="d-flex flex-wrap">
                        <div className="mt-2 mt-sm-0  me-1">
                          <div className="">
                            <button className='btn btn-outline-danger btn-sm me-2' onClick={() => dispatch(decrement(-1))}>-</button> <span className='text-dark'> {data} </span> <button className='btn btn-outline-success btn-sm ms-2' onClick={() => dispatch(increment(1))}>+</button>
                          </div>
                        </div>
                        <button className="btn btn-primary mx-1 mt-2  mt-sm-0"><i className="fa fa-heart me-1"></i> Addto Wishlist</button>
                        <div onClick={(e) => handleAddToCart(getSparePart?._id)} className="btn btn-primary mx-1 mt-2 mt-sm-0 w-sm-100"><i className="fa fa-shopping-cart me-1"></i> Add to Cart</div>
                        <ToastContainer />
                      </div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='row mt-5'>
              <div className='col-9'></div>
              <div className='col-md-3 col-12'>
                <Box  >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Option</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Option"
                      size='small'
                      style={{ backgroundColor: "white" }}
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Option1</MenuItem>
                      <MenuItem value={20}>Option2</MenuItem>
                      <MenuItem value={30}>Option3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            <div className='row mt-5'>
              {videoUrl?.map((url, i) => (<div className='col-md-3 col-6 mb-3' key={i}>
                {hasWindow && <ReactPlayer ref={playerRef} url={url} controls height="250" width="200" />}
              </div>))}

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Detail;