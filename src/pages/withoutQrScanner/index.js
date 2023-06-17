

import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactPlayer from 'react-player'
import httpCommon from '@/http-common'
import { useRouter } from 'next/router'
import "bootstrap/dist/css/bootstrap.css"
import Footer from '../footer'
import Header from '../header'


const WithoutQrScanner = () => {

    const [verify, setVerify] = useState(false)
    const [video, setVideo] = useState(false)
    const [loading, setLoading] = useState(false);
    const [randomValue, setRandomValue] = useState("");
    const [returnVideo, setReturnVideo] = useState(null);

    const [partvideo, setPartVideo] = useState(null)

    const [videoUrl, setVideoUrl] = useState("")
    const ordersArray = useSelector(state => state.orders)

    const router = useRouter()
    const { id } = router.query;

    const playerRef = useRef(null);

    const orderItemId = useSelector(state => state.orderItem)

    useEffect(() => {
        GetAllReturnVideoByOrderId()
    }, [randomValue])


    const handleVerify = () => {

        let orderById = ordersArray?.find(f1 => f1?._id === id)
        let productId = orderById?.items?.find(f2 => f2?.sparePartId === scanResult)


        if (scanResult === productId?.sparePartId) {
            alert("Match Product Id")
            setVerify(true)
        } else {
            alert("QR Code Not Verified")
        }
    }

    const handleFileChange = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        if (!file) return;
        setVideoUrl(URL.createObjectURL(file));
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            if (e.target.name === "file") {
                // setImage(e.target.files[0]);
                setPartVideo(e.target.files[0])
            }
        }
    };

    const addProductVideo = async () => {
        let orderData = ordersArray?.find(f1 => f1?._id === id)

        let orderItem = orderData?.items?.find(f1 => f1?.sparePartId === orderItemId?.itemId)

        const formData = new FormData()
        formData.append("orderId", orderData?._id);
        formData.append("brandId", orderItem?.brandId);
        formData.append("video", partvideo);
        try {
            setLoading(true);
            let response = await httpCommon.post("/verifyReturnOrder", formData);
            let { data } = response;
            setLoading(false);

            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x)

        } catch (err) {
            console.log(err);
        }
    }

    const GetAllReturnVideoByOrderId = async () => {
        try {
            let response = await httpCommon.get(`/getReturnVerify/647d8a540b95d07009aa3dcc`)
            let { data } = response
            setReturnVideo(data)
        }
        catch (err) {
            console.log(err)


        }
    }

    const ReturnOrder = async (orderId) => {
        let userData = localStorage.getItem("user")
        let userInfo = JSON.parse(userData)

        let orderData = ordersArray?.find(f1 => f1?._id === id)
        let totalPrice = orderData?.items?.map(it => ({ price: it?.MRP * it?.quantity }));
        let totalPrice1 = totalPrice?.reduce((acc, curr) => acc + curr?.price, 0);
        let length = orderData?.items?.reduce((acc, curr) => acc + (+curr?.length), 0);
        let height = orderData?.items?.reduce((acc, curr) => acc + (+curr?.height), 0);
        let breadth = orderData?.items?.reduce((acc, curr) => acc + (+curr?.breadth), 0);
        let weight = orderData?.items?.reduce((acc, curr) => acc + (+curr?.weight), 0);

        let orderItem = orderData?.items?.filter(f1 => f1?.sparePartId === orderItemId?.itemId)

        let item = orderItem?.map(it => (
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
            let obj = { name: orderData.name, email: orderData.email, contact: orderData.contact, city: orderData.city, state: orderData.state, pin: orderData.pin, customerId: orderData.customerId, address: orderData.address, address2: orderData.address2, status: "RETURN", orderId: orderData._id, items: orderData.items, shipment: orderData.shipment, shipOrderId: orderData.shipOrderId }
            let response1 = await httpCommon.post("/createReturnOrder", obj);
            let data1 = response1?.data;

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
            router.push("/orders");


        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        <>
            <Header />
            <div className='container  '>

                <>

                    <div className=' row mt-5  mb-5'>
                        <div className='col-12 col-md-4 col-lg-4'></div>
                        {returnVideo?.orderId === id ?

                            <div className='col-12 col-md-4 col-lg-4'>
                                <h3 className="">Verification for return request</h3>
                                <div className='mt-3'> Id : {returnVideo?._id}</div>

                                <div>Status : {returnVideo?.status}</div>
                                <div>Video</div>
                                <div>  <ReactPlayer ref={playerRef} url={returnVideo?.video} controls width="200px" height="200px" /></div>

                                {returnVideo?.status === "NOT_VERIFIED" ?
                                    <div className='mt-5'><button disabled={true} className='btn btn-primary'  > Verification Pending</button></div>
                                    : <div className='mt-5'><button className='btn btn-primary' onClick={() => ReturnOrder()}>Return Order</button></div>
                                }
                            </div>

                            : <div className='col-12 col-md-4 col-lg-4'>
                                <h2 className='text-center'> Upload Video </h2>
                                <div className="col-md-12 mt-4">
                                    <label className="form-label">Product video Upload</label>
                                    <small className="d-block text-muted mb-2">Only portrait or square video, 2M max and 2000px max-height.</small>
                                    <div id='create-token' className='dropzoneww'>
                                        <div className='mb-3' >
                                            <input id='filesize' onChange={(e) => handleFileChange(e)} name="file" type="file" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff, .mp4, .webm, .mp3, awv, .ogg, .glb"></input>
                                        </div>
                                        {videoUrl === "" ? <div className='text-danger fw-bold text-center'>Please select Video</div> : <ReactPlayer ref={playerRef} url={videoUrl} controls width="200px" height="200px" />}

                                    </div>
                                    <button type="submit" className="btn btn-primary mt-5" disabled={loading} onClick={addProductVideo}>{loading ? "Uploading" : "Add Product Video"}</button>
                                </div>
                            </div>
                        }
                        <div className='col-12 col-md-4 col-lg-4'></div>
                    </div>


                </>

            </div>
            <Footer />
        </>
    )
}

export default WithoutQrScanner