import React, { useEffect } from 'react'
import Header from '../header';
import Footer from '../footer';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '@/redux/actions/order';
import httpCommon from '@/http-common';
import { useState } from 'react';
import axios from 'axios';

const Orders = () => {

    const [trackDetail, setTrackDetail] = useState([])

    const dispatch = useDispatch();
    const ordersArray = useSelector(state => state.orders)

    useEffect(() => {
        let userId = localStorage.getItem("userId")

        dispatch(getOrderById(userId));
    }, [])

    const orders = ordersArray.reverse()


    const TrackOrder = async (orderId) => {
        try {

            let response = await httpCommon.get(`/trackOrder/${orderId}`)
            let { data } = response;
            setTrackDetail(data)
        }
        catch (err) {
            console.log(err)
        }
    }
    const ReturnOrder = async (orderId) => {
        try {

            let response = await httpCommon.post(`/returnOrder`)
            let { data } = response;
            setTrackDetail(data)
        }
        catch (err) {
            console.log(err)
        }
    }
    const CancelOrder = async (orderId) => {
        try {
            let obj={ids:[orderId]};
            let response = await httpCommon.post(`/cancelOrder`,obj);
            let { data } = response;
            setTrackDetail(data)
        }
        catch (err) {
            console.log(err)
        }
    }

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