import httpCommon from '@/http-common';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

function ProductReview(props) {
    const { product } = props
    const [review, setReview] = useState(props?.review?.review);
    const [reviewOpen, setReviewOpen] = useState(false);

    //   useEffect(()=>{
    //       getReview();
    //   },[]);

    const showToastMessage = (data) => {
        // console.log(data?.status)
        if (data?.status === true)
            toast.success(`${data?.msg}!`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000
            });
        else {
            toast.error(`${data?.msg}!`, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }
    const PostReview = async () => {
        let userData = localStorage.getItem("user")
        let userInfo = JSON.parse(userData)
        const obj = {
            customerId: userInfo?._id,
            customerName: userInfo?.name,
            customerImage: userInfo?.image,
            productId: product?.sparePartId,
            productName: product?.sparePartName,
            review: review,
        }

        try {
            let response = await httpCommon.post("/createReview", obj);
            let { data } = response;
            let x = Math.floor((Math.random() * 100) + 1);
            props?.setRandomValue(x)
            showToastMessage(data)
        } catch (err) {
            console.log(err);
        }
    }


    const editReview = async () => {
        try {
            let userData = localStorage.getItem("user")
            let userInfo = JSON.parse(userData)
            let response = await httpCommon.patch(`/editReview/${props?.review?._id}`, { review: review });
            let { data } = response;
            let x = Math.floor((Math.random() * 100) + 1);
            props?.setRandomValue(x)
            showToastMessage(data)
        } catch (err) {
            console.log(err);
        }
    }

    return (

        <>
{reviewOpen===true ?
<>
            <div className=' col-md-6 col-lg-6 col-12' >
                <div className="form-outline">
                    <textarea className="form-control" id="textAreaExample3" value={review} onChange={(e) => setReview(e.target.value)} rows="2" placeholder='Product review'></textarea>
                    {/* <label className="form-label" for="textAreaExample3">Message</label> */}
                </div>
            </div>
            <div className=' col-md-6 col-lg-6 col-12' style={{ marginTop: "22px" }} >
                {props?.review?.productId === product?.sparePartId ?
                    <button className='btn btn-primary' onClick={() => editReview()} >Edit Review</button>
                    :
                    <button className='btn btn-primary' onClick={() => PostReview()} >Post Review</button>
                }
            </div>
            <ToastContainer />
            </>
            : 
            <div className='col-md-12 col-lg-12 col-12 text-end pe-4'>
            <button className='btn btn-primary me-3' onClick={() => setReviewOpen(true)} >Review</button>
           </div>}
        </>

    )
}

export default ProductReview