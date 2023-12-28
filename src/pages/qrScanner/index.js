import { Html5QrcodeScanner } from 'html5-qrcode'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import httpCommon from '@/http-common'
import Footer from '../footer'
import Header from '../header'

const QrScanner = () => {
  const [scanResult, setScanResult] = useState(null)
  const [verify, setVerify] = useState(false)
  const [loading, setLoading] = useState(false)

  const ordersArray = useSelector(state => state.orders)

  const router = useRouter()
  const { id } = router.query;



  const orderItemId = useSelector(state => state.orderItem)

  useEffect(() => {

    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        top: 20,
        width: 350,
        height: 350,
      },
      fps: 5,
    })
    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result)
    }
    function error(err) {
      console.log(err);
    }

  }, [])

  const handleVideo = () => {
    router.push(`/withoutQrScanner?id=${id}`);
  }

  const handleVerify = () => {

    let orderById = ordersArray?.find(f1 => f1?._id === id)
    let productId = orderById?.items?.find(f2 => f2?.sparePartId === scanResult)


    if (scanResult === productId?.sparePartId) {
      alert("Product Id matched")
      setVerify(true)
    } else {
      alert("QR Code Not Verified")
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

    // alert("Match Product Id")
    try {
      setLoading(true)
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
      setLoading(false)

      router.push("/orders");

    }
    catch (err) {
      setLoading(false)
      console.log(err)

    }

  }
  return (
    <>
      <Header />
      <div className='container  '>

        {/* <h2 className='mt-5 text-center'>Please Scan Qr Code</h2> */}

        {scanResult ? <div className='mt-5 pt-5'> success: <a href={"http://" + scanResult}>{scanResult} </a>
          {verify === false ? <button className='btn btn-primary ms-5' onClick={() => handleVerify()}>Verify</button> : ""}
          {verify === true ? <button className='btn btn-primary ms-5' disabled={loading} onClick={() => ReturnOrder(scanResult)}>  Return Order</button>
            : ""}
        </div>
          :
          <>
            <div className='mt-2 mb-2 text-center'><button className='btn btn-primary mt-2 ' onClick={() => handleVideo()}> Without QR Code </button></div>

            <div id="reader" className=''>  </div>

          </>
        }
      </div>
      <Footer />
    </>
  )
}

export default QrScanner