import React, { useEffect } from 'react'
import Header from '../header';
import Footer from '../footer';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '@/redux/actions/order';

const Orders = () => {

    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders)

    useEffect(() => {
        let userId = localStorage.getItem("userId")

        dispatch(getOrderById(userId));
    }, [])

    console.log("orders", orders);
    return (
        <div >
            <Header />
            <div className='container'>
                <div className='mt-5'><h1>My Orders</h1></div>
                {orders && orders?.map((order, i) =>
                    <div className='mt-5 border p-2'>
                        <div key={i} className='row d-flex align-items-center' >
                            <div className='col-md-2 col-6 me-5'>
                            <div className='fw-bold'>  Order Id
                            </div>
                            <div> {order?._id}
                            </div>
                            </div>
                            <div className='col-md-2 col-6'>
                            <div className='fw-bold'> User Name
                            </div>
                            <div> {order?.name}
                            </div>
                            </div>
                            <div className='col-md-6'>{order?.items?.map((item, i) =>
                                <div key={i} className='d-flex align-items-center'>
                                    <img className='rounded p-2' src={item?.sparePartImage} alt={item?.sparePartImage} height="70" width="70" />
                                    <div>{item?.sparePartName}</div>
                                    <div>{item?.sparePartModel}</div>
                                    <div>{item?.sparePartCategory}</div>
                                    <div>{item?.quantity}</div>
                                    <div>{item?.MRP}</div>
                                    <div>{item?.technician}</div>
                                </div>
                            )} </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}
export default Orders;