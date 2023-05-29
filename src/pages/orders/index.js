import React, { useEffect } from 'react'
import Header from '../header';
import Footer from '../footer';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '@/redux/actions/order';
import httpCommon from '@/http-common';
import { useState } from 'react';
import { Button, DialogContent, Grid, Dialog, DialogTitle, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import style from "../login/login.module.css"
import "bootstrap/dist/css/bootstrap.css"




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const Orders = () => {

    const [trackDetail, setTrackDetail] = useState([])
    const [trackDetailById, setTrackDetailById] = useState([])
    const [fiveDays, setFiveDays] = useState()
    const [returnDetail, setReturnDetail] = useState([])
    const [cancelDetail, setCancelDetail] = useState([])
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    const ordersArray = useSelector(state => state.orders)

    useEffect(() => {
        let userId = localStorage.getItem("userId")

        dispatch(getOrderById(userId));
    }, [])




    const TrackOrder = async (orderId) => {
        try {

            let response = await httpCommon.get(`/trackOrder/${orderId}`)
            let { data } = response;
            setTrackDetail(data)
            let findData = orders?.find(f1 => f1?._id === orderId)
            setTrackDetailById(findData)
            const constexDate = new Date(new Date(findData?.createdAt)?.toString())
            const inFiveDays = new Date(new Date(constexDate)?.setDate(constexDate?.getDate() + 5))
            setFiveDays(inFiveDays?.toLocaleString());
            //  addDays()
            setOpen(true)
        }
        catch (err) {
            console.log(err)
        }
    }
    const ReturnOrder = async (orderId) => {
        try {

            let response = await httpCommon.post(`/returnOrder`)
            let { data } = response;
            setReturnDetail(data)
        }
        catch (err) {
            console.log(err)
        }
    }
    const CancelOrder = async (orderId) => {
        try {
            let obj = { ids: [orderId] };
            let response = await httpCommon.post(`/cancelOrder`, obj);
            let { data } = response;
            setCancelDetail(data)
        }
        catch (err) {
            console.log(err)
        }
    }
    const orders = ordersArray.reverse()
   
    return (
        <div >
            <Header />
            <div className='container'>
                <div className='mt-5'>
                    <h1 ><span className='bg-dark text-white p-2  text-center'>My Orders</span></h1>
                </div>
                {orders?.length > 0 ? orders?.map((order, i) =>
                    <div className='mt-5 border p-2'>
                        <div key={i} className='row d-flex align-items-center1' >
                            {/* <div className='col-md-2 col-12 me-5'>
                                <div className='fw-bold'>  Order Id
                                </div>
                                <div> {order?._id}
                                </div>
                            </div> */}
                            <div className='col-md-2 col-12 '>
                                <div className='row'>
                                    <div className='fw-bold col-md-12 col-6'> User Name
                                    </div>
                                    <div className='col-md-12 col-6'> {order?.name}
                                    </div>
                                    <div className='fw-bold col-md-12 col-6'>Order Date & Time
                                    </div>
                                    <div className='col-md-12 col-6'> {new Date(order?.createdAt).toLocaleDateString()} &nbsp;{new Date(order?.createdAt).toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-10 col-12 '>{order?.items?.map((item, i) =>
                                <div key={i} className='row d-flex align-items-center1'>
                                    <div className='col-12 col-md-1 me-md-3'>
                                        <div className='fw-bold'>Image</div>
                                        <img className='rounded p-2' src={item?.sparePartImage} alt={item?.sparePartImage} height="70" width="70" />
                                    </div>
                                    <div className='col-6 col-md-2'>
                                        <div className='fw-bold'>Spare Part Name</div>
                                        <div>{item?.sparePartName}</div></div>
                                    <div className='col-6 col-md-2'>
                                        <div className='fw-bold'>Spare Part Model</div>
                                        <div>{item?.sparePartModel}</div></div>
                                    <div className='col-6 col-md-3'>
                                        <div className='fw-bold'> Spare Part Category</div>
                                        <div>{item?.sparePartCategory}</div></div>
                                    <div className='col-6 col-md-1'>
                                        <div className='fw-bold'> Quantity</div>
                                        <div>{item?.quantity}</div></div>
                                    <div className='col-6 col-md-1'>
                                        <div className='fw-bold'>MRP</div>
                                        <div>{item?.MRP}</div>
                                    </div>
                                    <div className='col-6 col-md-1'>
                                        <div className='fw-bold'>Technician</div>
                                        <div>{item?.technician > 0 ? `Booked for ${item?.technician}` : "No"}</div>
                                    </div>
                                    <div className='row mt-2 d-flex   align-items-center1'>
                                        <div className="col-6 col-md-6 text-end"> <button className='btn btn-primary btn-sm text-center' onClick={() => TrackOrder(order?._id)} >Track Order</button></div>
                                        {/* <div className="col-6 col-md-6 text-center"> <button className='btn btn-warning btn-sm'onClick={()=>ReturnOrder(order?._id)}>Return Order</button></div> */}
                                        <div className="col-6 col-md-6 text-start"> <button className='btn btn-danger btn-sm' onClick={() => CancelOrder(order?._id)}>Cancel Order</button></div>
                                    </div>
                                </div>


                            )} </div>

                        </div>


                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                                Track Order
                                {/* <div className='row'>
                                    <div className='col-12 col-md-3 col-lg-3'>Order Id :</div>
                                    <div className='col-12 col-md-9 col-lg-9'>{trackDetailById?._id}</div>
                                </div> */}
                            </BootstrapDialogTitle>
                            <DialogContent >
                                <Grid className={`${style.mainDiv}`}>
                                    {/* <Grid item sm={12} md={12}>
                                        <div className=' d-flex justify-content-center mb-2'>  <img src='https://lybley-webapp-collection.s3.amazonaws.com/PNG-031.png-1684751868223-284237810' height="70" width="60" /></div>
                                    </Grid> */}
                                    <Grid item sm={12} md={12} >
                                        <div className="trackCard">
                                            <div className="title">Purchase Reciept</div>
                                            <div className="info">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <span id="heading">Date</span><br />
                                                        <span id="details"> {new Date(trackDetailById?.createdAt).toLocaleString()}</span>
                                                    </div>
                                                    <div className="col-12 pull-right">
                                                        <div id="heading">Order No.</div>
                                                        <div id="details" style={{ width: "10px" }} > {trackDetailById?._id}</div>
                                                    </div>
                                                    <div className="col-12">
                                                        <span id="heading"> Expected Delivery Date</span><br />
                                                        <span id="details"> {fiveDays && fiveDays?.toLocaleString()}

                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="pricing">
                                                <div className="row">
                                                    <div className="col-9">
                                                        <span id="name">{trackDetailById?._id} </span>
                                                    </div>
                                                    <div className="col-3">
                                                        <span id="price">£299.99</span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-9">
                                                        <span id="name">Shipping</span>
                                                    </div>
                                                    <div className="col-3">
                                                        <span id="price">£33.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="total">
                                                <div className="row">
                                                    <div className="col-9" />
                                                    <div className="col-3"><big>£262.99</big></div>
                                                </div>
                                            </div> */}
                                            <div className="tracking">
                                                <div className="title">Tracking Order</div>
                                            </div>
                                            <div className="progress-track">
                                                <ul id="progressbar">
                                                    <li className="step0 active " id="step1">Order Confirm</li>
                                                    <li className="step0  text-center" id="step2">Shipped</li>
                                                    <li className="step0   text-right" id="step3">On the way</li>
                                                    <li className="step0 text-right" id="step4">Delivered</li>
                                                </ul>
                                            </div>
                                            {/* <div className="footer">
                                                <div className="row">
                                                    <div className="col-2"><img className="img-fluid" src="https://i.imgur.com/YBWc55P.png" /></div>
                                                    <div className="col-10">Want any help? Please &nbsp;<a> contact us</a></div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </Grid>

                                    <Grid item sm={12} md={12} sx={{ display: "flex", marginTop: "30px", marginBottom: "15px", justifyContent: "space-between" }}>
                                        <div className='d-flex justify-content-between w-100'>

                                            {/* <div className={`${style.common_curs} ${style.paddTopFrgt} text-primary col-md-6 col-12 mb-3 `} onClick={handleForget}>Forget Password &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> */}

                                            <Button className='' variant='contained' color='secondary' autoFocus onClick={handleClose}>
                                                CANCEL
                                            </Button>
                                            <Button className='ms-md-4' variant='contained' autoFocus onClick={handleClose} >
                                                OK
                                            </Button>

                                        </div>
                                    </Grid>


                                </Grid>

                            </DialogContent>

                        </BootstrapDialog>
                    </div>
                )
                    :
                    <div className='d-flex mt-5 justify-content-center '>
                        <div className='fw-bold border p-5'>You have no order.
                        </div>
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}
export default Orders;