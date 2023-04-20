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
import { getAllSpareParts } from '@/redux/actions/sparePart';
import { useRouter } from 'next/router';
const Detail = () => {
  const dispatch = useDispatch();
  const getSpareParts = useSelector(state => state?.spareParrts);
  const data = useSelector(state => state?.data);
  const [videoUrl, setVideoUrl] = useState(['https://youtu.be/0BIaDVnYp2A'
    , 'https://youtu.be/0BIaDVnYp2A'
    , 'https://youtu.be/0BIaDVnYp2A', 'https://youtu.be/0BIaDVnYp2A', 'https://youtu.be/0BIaDVnYp2A', 'https://youtu.be/0BIaDVnYp2A'])
  const playerRef = useRef(null);
const router=useRouter()
const { id } = router.query;
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
    dispatch(getAllSpareParts(id))
  }, []);
 

  const [age, setAge] = React.useState('Option');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  return (
    <div className="bg_image">
      <Header detail={true} />
      <div className='row d-flex justify-content-center'>
        <div className='col-8'>
          <div className='container'>
            <div className="row">
              <div className='col-md-4 col-12 text-center'> <img src='https://5.imimg.com/data5/SELLER/Default/2021/6/ED/WN/JB/31656971/intex-air-cooler-1000x1000.png' height="350" width="300" />
                <div className='row mt-2'>
                  <div className='col-md-12 col-12 text-center'>
                    <button className='btn btn-outline-danger btn-sm me-2' onClick={() => dispatch(decrement(-1))}>-</button> <span className='text-dark'> {data} </span> <button className='btn btn-outline-success btn-sm ms-2' onClick={() => dispatch(increment(1))}>+</button>
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='col-md-12 col-12 text-center'>
                    <button className='btn btn-primary btn_width'>BUY</button> <button className='btn btn-warning btn_width'>ADD TO CART</button>
                  </div>
                  <div className='mt-3'>
                    <button className='btn btn-success'>Book Technician to Fit It - 300 Rs Only</button>
                  </div>
                </div>
              </div>
              <div className='col-md-4 col-12 fw-bold text-dark'>
                <div className='mt-5'>
                  <div>MRP - 600</div>
                  <div>Best Price - 300</div>
                  <div>
                    <h5 className='mt-3'>Product Info</h5>
                    Air Coolers · Symphony Storm C-100 XL 95 Litres Tower Air Cooler (Honeycomb Pad, ACOTO412 · Hindware Calisto 105 Litres Desert Air Cooler)

                  </div>

                </div>
              </div>
            </div>

            <div className='row mt-2'>
              <div className='col-9'></div>
              <div className='col-md-3 col-12'>
                {/* <div className='form-group'>
              <select className='form-select'>
                <option>Select Fault</option>
              </select>
            </div> */}
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
      <div className="col-md-12">
            <div className="card">
                <div className="card-body">
                    <div className="product-details">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="product-details-image mt-50">
                                    <div className="product-thumb-image">
                                        <div className="product-thumb-image-active nav flex-column nav-pills me-3" id="v-pills-tab" >
                                            <a className=" single-thumb  lift" id="v-pills-one-tab" href="#v-pills-one" onClick={() => { setFirst_img(1) }}>
                                                <img src={A1} alt="" />
                                            </a>
                                            <a className="single-thumb lift" id="v-pills-two-tab" href="#v-pills-two" onClick={() => { setFirst_img(2) }}>
                                                <img src={A2} alt="" />
                                            </a>
                                            <a className={`${first_img === 3 ? "active" : ''} single-thumb  lift`} id="v-pills-three-tab" href="#v-pills-three" onClick={() => { setFirst_img(3) }}>
                                                <img src={A3} alt="" />
                                            </a>
                                            <a className="single-thumb lift" id="v-pills-four-tab" href="#v-pills-four" onClick={() => { setFirst_img(4) }}>
                                                <img src={A4} alt="" />
                                            </a>
                                            <a className="single-thumb lift" id="v-pills-five-tab" href="#v-pills-five" onClick={() => { setFirst_img(5) }}>
                                                <img src={A5} alt="" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="product-image">

                                        <div className="product-image-active tab-content" id="v-pills-tabContent">

                                            {
                                                first_img === 1 ? <a href='#!' className="single-image  lift" id="v-pills-one">
                                                    <img src={P1} alt="" />
                                                </a> : null
                                            }
                                            {
                                                first_img === 2 ?
                                                    <a href='#!' className="single-image  lift" id="v-pills-two">
                                                        <img src={P2} alt="" />
                                                    </a>
                                                    : null
                                            }
                                            {
                                                first_img === 3 ? <a href='#!' className="single-image lift" id="v-pills-three">
                                                    <img src={P3} alt="" />
                                                </a>
                                                    : null
                                            }

                                            {
                                                first_img === 4 ? <a href='#!' className="single-image  lift" id="v-pills-four" role="tabpanel">
                                                    <img src={P4} alt="" />
                                                </a>
                                                    : null
                                            }

                                            {
                                                first_img === 5 ? <a href='#!' className="single-image  lift" id="v-pills-five" role="tabpanel">
                                                    <img src={P5} alt="" />
                                                </a>
                                                    : null
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="product-details-content mt-45">
                                    <h2 className="fw-bold fs-4">Oculus VR</h2>
                                    <div className="my-3">
                                        <i className="fa fa-star text-warning"></i>
                                        <i className="fa fa-star text-warning"></i>
                                        <i className="fa fa-star text-warning"></i>
                                        <i className="fa fa-star text-warning"></i>
                                        <i className="fa fa-star text-warning"></i>
                                        <span className="text-muted ms-3">(449 customer review)</span>
                                    </div>
                                    <div className="product-items flex-wrap">
                                        <h6 className="item-title fw-bold">Select Your Oculus</h6>
                                        <div className="items-wrapper" id="select-item-1">
                                            <div className="single-item ">
                                                <div className="items-image lift">
                                                    <img src={B1} alt="product" />
                                                </div>
                                                <p className="text">Oculus Go</p>
                                            </div>
                                            <div className="single-item">
                                                <div className="items-image lift">
                                                    <img src={B2} alt="product" />
                                                </div>
                                                <p className="text">Oculus Quest</p>
                                            </div>
                                            <div className="single-item">
                                                <div className="items-image lift">
                                                    <img src={B3} alt="product" />
                                                </div>
                                                <p className="text">Oculus Rift S</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-select-wrapper flex-wrap">
                                        <div className="select-item">
                                            <h6 className="select-title fw-bold">Select Color</h6>
                                            <ul className="color-select" id="select-color-1">
                                                <li style={{ backgroundColor: '#EFEFEF' }} className="active"></li>
                                                <li style={{ backgroundColor: '#FAE5EC' }}></li>
                                                <li style={{ backgroundColor: '#4C4C4C' }}></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="product-price">
                                        <h6 className="price-title fw-bold">Price</h6>
                                        <p className="sale-price">$ 149 USD</p>
                                        <p className="regular-price text-danger">$ 179 USD</p>
                                    </div>
                                    <p>Lorem Ipsum is simply dummy text of the printing and
                                        typesetting industry. Lorem Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an unknown printer took a
                                        galley of type and scrambled it to make a type specimen book.</p>
                                    <div className="product-btn mb-5">
                                        <div className="d-flex flex-wrap">
                                            <div className="mt-2 mt-sm-0  me-1">
                                                <div className="input-group">
                                                    <input type="number" className="form-control" placeholder="1" min="1" max="5" />
                                                    <span className="input-group-text"><i className="fa fa-sort"></i></span>  
                                                </div>
                                            </div>
                                            <button className="btn btn-primary mx-1 mt-2  mt-sm-0"><i className="fa fa-heart me-1"></i> Addto Wishlist</button>
                                            <Link to={process.env.PUBLIC_URL + '/shopping-cart'} className="btn btn-primary mx-1 mt-2 mt-sm-0 w-sm-100"><i className="fa fa-shopping-cart me-1"></i> Add to Cart</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <Footer />
    </div>
  )
}

export default Detail;