import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import { increment, decrement, setOne } from "../../redux/actions/index"
import { useDispatch } from 'react-redux';
import VerifiedIcon from '@mui/icons-material/Verified';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import httpCommon from '@/http-common';

function OculusVR(props) {
    const dispatch = useDispatch();

    const [first_img, setFirst_img] = useState(3)
    const { getSparePart, qty, technician,adminProduct,product } = props;
    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        setMainImage(getSparePart?.images[0]);
    }, [getSparePart]);



const oem=getSparePart?.seller==="BRAND" ? true :false;

    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-body">
                    <div className="product-details">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="product-details-image mt-50">
                                    <div className="product-thumb-image">
                                        {getSparePart?.images?.map((img, i) => <div className="product-thumb-image-active nav flex-column nav-pills my-4 me-3" id="v-pills-tab" >

                                            <div className=" single-thumb  lift" id="v-pills-one-tab" href="#v-pills-one" onClick={() => { setFirst_img(1) }}>
                                                <img onMouseEnter={() => setMainImage(img)} onClick={() => setMainImage(img)} src={img} alt="" />
                                            </div>
                                        </div>)}
                                    </div>
                                    <div className="product-image">

                                        <div className="product-image-active tab-content p-4" id="v-pills-tabContent">

                                            <a href='#!' className="single-image lift" id="v-pills-one">
                                                <img src={mainImage} alt=""  />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="product-details-content mt-45">
                                    <div className='d-flex'>
                                    <h2 className="fw-bold fs-4">{getSparePart?.partName}</h2>
                                    <span className="text-muted ms-3">( <span  > {props?.reviews?.length}</span> customer review )</span>
                                    </div>
                          
                                    {product === false && adminProduct?.length > 0 ?
                                    <div className="product-items flex-wrap">
                                        <h6 className="item-title fw-bold">Compactible Spare Part </h6>
                                        <div className="items-wrapper d-flex" id="select-item-1">
                                            <div className="single-item ">
                                                <div className="items-image lift shadow">
                                                    <img className='p-2' src={adminProduct?.images?.filter((img, i) => i === 0)} alt={adminProduct?.metaTitle}  onClick={() => {  props?.setProduct(true); setMainImage(adminProduct?.images?.filter((img, i) => i === 0)) }}/>
                                                </div>
                                                <p className="text fw-bold">{adminProduct?.partName}</p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                     : ""}
                                    {/* <div className="product-select-wrapper flex-wrap">
                                        <div className="select-item">
                                            <h6 className="select-title fw-bold">Select Color</h6>
                                            <ul className="color-select" id="select-color-1">
                                                <li style={{ backgroundColor: '#EFEFEF' }} className="active"></li>
                                                <li style={{ backgroundColor: '#FAE5EC' }}></li>
                                                <li style={{ backgroundColor: '#4C4C4C' }}></li>
                                            </ul>
                                        </div>
                                    </div> */}
                                    <div className="product-price">
                                        <h6 className="price-title fs-3 fw-bold">PRICE</h6>
                                        <p className="sale-price">{getSparePart?.bestPrice} INR <span className='text-muted'> <sub>  </sub></span></p>
                                        <p className="regular-price text-danger">{getSparePart?.MRP} INR</p>
                                    </div>
                                    <div className='fw-bold mb-2'>Part Number :  <span className='fw-bold fs-5'>{" "}{getSparePart?.partNo}</span></div>
                                    <div ><span className="fw-bold"> Brand Name :</span>  {getSparePart?.brandName}</div>
                                   {oem ? <div ><span className="fw-bold">OEM : </span>  {getSparePart?.brandName} <VerifiedIcon  color='primary' /> </div>:""}
                                   {product === false ? <div className='mt-2 mb-3'><span className="fw-bold"> Category Name :</span>  {getSparePart?.category}</div>:""}
                                    <div>{(getSparePart?.description)?.substr(0,209)}{getSparePart?.description?.length>208 ?"...":""} </div>
                                    <div className="product-btn mb-2">
                                    
                                        <div className='d-flex align-items-center row'>
                                        <div className="col-12 col-md-4 d-flex flex-wrap">
                                            <div className="d-flex flex-wrap  ">
                                                <div className=" mt-sm-0  me-1">
                                                    <div className="">
                                                        <span className='fw-bold me-2'>Qty.</span> <button className='btn btn-outline-danger btn-sm me-2' onClick={() => dispatch(decrement(-1))}>-</button> <span className='text-dark'> {qty} </span> <button className='btn btn-outline-success btn-sm ms-2' onClick={() => dispatch(increment(1))}>+</button>
                                                    </div>

                                                </div>

                                                <ToastContainer />

                                            </div>
                                        </div>
                                        <div className='col-6 col-md-4 '>
                                        <button className="btn bg-dark text-white mx-md-3 mx-md-2 mt-3  mt-sm-0" onClick={props?.handleBuy}> Buy Now</button>
                                        </div> 
                                        <div className='col-6 col-md-4 '>
                                        <button onClick={(e) => props?.handleAddToCart(getSparePart?._id)} className="btn bg-dark text-white mx-md-1 mx-md-2 mt-3  mt-sm-0 w-sm-100"> Add to Cart</button>
                                        </div>
                                        </div>
                                        <div className='form-check mt-4'>
                                            <input type="checkbox" className='form-check-input fw-bold' value={props?.technicianCharge} checked={technician === 0 ? false : true} onChange={(e) => props?.handleCheckbox(e.currentTarget.value)} />
                                            <label className='form-check-label fw-bold'>Book Technician to fit it - {props?.technicianCharge} INR only</label>
                                        </div>
                                        {product === true ?
                                         <div className='form-check mt-4'>
                                           <div className='fw-bold'>Compactible With </div>
                                           <div className='d-flex fw-bold '>
                                          {adminProduct?.compactibleWith?.map((item,i)=> 
                                          
                                          <div className='btn btn-sm btn-success m-2' key={i}>{item}  </div>
                                          
                                          )}
                                           </div>
                                          
                                        </div>
                                         :""}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OculusVR;
