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
import { useRouter } from 'next/router';
import axios from 'axios';




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
    const router = useRouter();
    const [active, setActive] = useState("ORDER")
    const [trackDetail, setTrackDetail] = useState([])
    const [trackDetailById, setTrackDetailById] = useState([])
    const [fiveDays, setFiveDays] = useState()
    const [returnDetail, setReturnDetail] = useState([])
    const [cancelDetail, setCancelDetail] = useState([])
    const [deliverData, setDeliveryData] = useState("")
    const [open, setOpen] = React.useState(false);
    const [randonValue, setRandomValue] = useState("")
    const [returnData,setReturnData]=useState({});
    const [allReturn,setReturn]=useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    const ordersArray = useSelector(state => state.orders)

    useEffect(() => {
        getAllReturnOrder();
        let userId = localStorage.getItem("userId")
        dispatch(getOrderById(userId));
    }, [randonValue])


    const getAllReturnOrder=async()=>{
          try{
            let response=await httpCommon.get("/getAllReturnOrder");
            let {data}=response;
            setReturn(data);
          }catch(err){
            console.log(err);
          }
    }

    const TrackOrder = async (orderId) => {
        
        try {
        //     if(active==="DELIVER"){
        //     let response=await httpCommon.get(`/getReturnOrder/${id}`);
        //    var  returnTrack=response?.data?._id;
        //     }
        //     console.log("dafshj")
            let id=active==="DELIVER" ? "64745b59710094051132dbd21" : orderId;
            let response = await httpCommon.get(`/trackOrder/${id}`)
            let { data } = response;
            if(data?.length===0)
            {
                handleClickOpen()

            }
            else{
                router.push(data[0].tracking_data?.track_url);  
            }
            setTrackDetail(data)
            if (data[0].tracking_data?.shipment_track[0].current_status === "Delivered") {
                let responseStatus = await httpCommon.patch(`/updateShipOrderId/${orderId}`, { status: "DELIVER" });
            }
            let x = Math.floor((Math.random() * 100) + 1);
            setRandomValue(x)

            let findData = ordersArray?.find(f1 => f1?._id === orderId)
            setTrackDetailById(findData)
            const constexDate = new Date(new Date(findData?.createdAt)?.toString())
            const inFiveDays = new Date(new Date(constexDate)?.setDate(constexDate?.getDate() + 5))
            setFiveDays(inFiveDays?.toLocaleString());
            //  addDays()
            // setOpen(true)

        }
        catch (err) {
            console.log(err)
        }
    }
    const ReturnOrder = async (orderId) => {
        let orderData = ordersArray?.find(f1 => f1?._id === orderId)
        let totalPrice = orderData?.items?.map(it => ({ price: it?.MRP * it?.quantity }));
        let totalPrice1 = totalPrice?.reduce((acc, curr) => acc + curr?.price, 0);
        let length = orderData?.items?.reduce((acc, curr) => acc + (+curr?.length), 0);
        let height = orderData?.items?.reduce((acc, curr) => acc + (+curr?.height), 0);
        let breadth = orderData?.items?.reduce((acc, curr) => acc + (+curr?.breadth), 0);
        let weight = orderData?.items?.reduce((acc, curr) => acc + (+curr?.weight), 0);
        let item = orderData?.items?.map(it => (
            {
                name: it?.sparePartName,
                sku: it?.skuNo,
                units: it?.quantity,
                selling_price: it?.MRP,
                discount: "",
                tax: "",
                hsn: 441122
            }
        ))

        try {
            let obj={name:orderData.name,email:orderData.email,contact:orderData.contact,city:orderData.city,state:orderData.state,pin:orderData.pin,customerId:orderData.customerId,address:orderData.address,address2:orderData.address2,status:"RETURN",orderId:orderData._id,items:orderData.items,shipment:orderData.shipment,shipOrderId:orderData.shipOrderId}
            let response1=await httpCommon.post("/createReturnOrder",obj);
            let data1=response1?.data;

            let response = await httpCommon.get(`/getSpecificOrder/${orderData?.shipOrderId}`)
            let { data } = response;

            let returnData = {
                "order_id": data1?._id,
                "order_date": new Date(orderData?.createdAt).toLocaleDateString(),
                "channel_id": data?.data?.channel_id,
                "pickup_customer_name": orderData?.name,
                "pickup_last_name": "",
                "company_name": " ",
                "pickup_address": orderData?.address,
                "pickup_address_2": orderData?.address2,
                "pickup_city": orderData?.city,
                "pickup_state": orderData?.state,
                "pickup_country": "India",
                "pickup_pincode": +(orderData?.pin),
                "pickup_email": orderData?.email,
                "pickup_phone": orderData?.contact,
                "pickup_isd_code": "91",
                "shipping_customer_name": data?.data?.pickup_address?.name,
                "shipping_last_name": "",
                "shipping_address": data?.data?.pickup_address?.address,
                "shipping_address_2": data?.data?.pickup_address?.address_2,
                "shipping_city": data?.data?.pickup_address?.city,
                "shipping_country": data?.data?.pickup_address?.country,
                "shipping_pincode": +(data?.data?.pickup_address?.pin_code),
                "shipping_state": data?.data?.pickup_address?.state,
                "shipping_email": data?.data?.pickup_address?.email,
                "shipping_isd_code": "91",
                "shipping_phone": +(data?.data?.pickup_address?.phone),
                "order_items": item,
                "payment_method": "PREPAID",
                "total_discount": "0",
                "sub_total": totalPrice1,
                "length": +length,
                "breadth": +breadth,
                "height": +height,
                "weight": +weight

            }


            let responseReturn = await httpCommon.post(`/returnOrder`, returnData)
            let data2 = responseReturn?.data;

            setReturnDetail(data2);

            let x = Math.floor((Math.random() * 100) + 1);
            setRandomValue(x)
        }
        catch (err) {
            console.log(err)
        }

    }
    const CancelOrder = async (orderId, id, brandId, MRP, quantity) => {
        try {
            let obj = { ids: [orderId] };
            let response = await httpCommon.post(`/cancelOrder`, obj);
            let { data } = response;
            if (data?.status_code === 200) {
            let response = await httpCommon.patch(`/updateShipOrderId/${id}`, { brandId: brandId, MRP: MRP, quantity: quantity, status: "CANCEL" });
             }

            setCancelDetail(data)
            let x = Math.floor((Math.random() * 100) + 1);
            setRandomValue(x)
        }
        catch (err) {
            console.log(err)
        }
    }
    const orderData = active ? ordersArray?.filter(f1 => f1.status === active) : ordersArray;
    const orderData1 = ordersArray.reverse()
    console.log("deliverData", deliverData);
    console.log("trackDetail", trackDetail);
    return (
        <div >
            <Header />
            <div className='container'>
                <div className='mt-5'>
                    <h1 ><span className='bg-dark text-white p-2  text-center'>My Orders</span></h1>
                </div>
                <div className="mt-4">
                    <button className={`btn ${active === "ORDER" ? "btn-dark" : "btn-outline-secondary text-dark"}`} onClick={() => setActive("ORDER")}>Ordered</button>
                    <button className={`btn ${active === "DELIVER" ? "btn-dark" : "btn-outline-secondary text-dark"} ms-2 me-2`} onClick={() => setActive("DELIVER")}>Delivered</button>
                    <button className={`btn ${active === "CANCEL" ? "btn-dark" : "btn-outline-secondary text-dark"}`} onClick={() => setActive("CANCEL")}>Canceled</button>
                </div>
                {orderData?.length > 0 ? orderData?.map((order, i) =>
                    <div className='mt-3 border p-2'>
                        <div key={i} className='row d-flex align-items-center1' >
                            {/* <div className='col-md-2 col-12 me-5'>
                                <div className='fw-bold'>  Order Id
                                </div>
                                <div> {order?._id}
                                </div>
                            </div> */}
                            <div className='col-md-2 col-12 '>
                                <div className='row'>
                                    <div className='fw-bold col-md-12 col-6'> Order Id
                                    </div>
                                    <div className='col-md-12 col-6' style={{ fontSize: "10px" }}> {order?._id}
                                    </div>
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
                                        {order?.status === "ORDER" ?
                                            <>
                                                <div className="col-6 col-md-6 text-end"> <button className='btn btn-primary btn-sm text-center' onClick={() => TrackOrder(order?._id)} >Track Order</button></div>
                                                <div className="col-6 col-md-6 text-start"> <button className='btn btn-danger btn-sm' onClick={() => CancelOrder(order?.shipOrderId, order?._id, item?.brandId, item?.MRP, item?.quantity)}>Cancel Order</button></div>
                                            </>
                                            : ""}
                                        {(order?.status === "DELIVER" && allReturn.find(f1=> f1?.orderId===order?._id)) ?

                                       <div className="col-6 col-md-6 text-end"> <button className='btn btn-primary btn-sm text-center' onClick={() => TrackOrder(order?._id)} >Track Return Order</button></div>
                                               
                                         : (order?.status === "ORDER" || order?.status === "CANCEL") ? ""  : <div className="col-6 col-md-6 text-center"> <button className='btn btn-warning btn-sm' onClick={() => ReturnOrder(order?._id,)}>Return Order</button></div>}
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
                                                        <span id="details"> {(order?.createdAt && new Date(order?.createdAt).toLocaleString())}</span>
                                                    </div>
                                                    <div className="col-12 pull-right">
                                                        <div id="heading">Order No.</div>
                                                        <div id="details" style={{ width: "10px" }} > {trackDetailById?._id}</div>
                                                    </div>
                                                    <div className="col-12">
                                                        <span id="heading"> Status</span><br />
                                                        <span id="details">  Order Confirmed

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
                                            {/* <div className="tracking">
                                                <div className="title">Tracking Order</div>
                                            </div>
                                            <div className="progress-track">
                                                <ul id="progressbar">
                                                    <li className="step0 active " id="step1">Order Confirm</li>
                                                    <li className="step0  text-center" id="step2">Shipped</li>
                                                    <li className="step0   text-right" id="step3">On the way</li>
                                                    <li className="step0 text-right" id="step4">Delivered</li>
                                                </ul>
                                            </div> */}
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