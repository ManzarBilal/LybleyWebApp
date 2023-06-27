import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import httpCommon from '@/http-common';

function ReviewDiscription(props) {
        const [reviews,setReviews]=useState([]);
          
        useEffect(()=>{
           getReviews();
        },[props?.id])

        const getReviews=async()=>{
            try{
                let response=await httpCommon.get(`/getReviewByProductId/${props?.id}`);
                let {data}=response;
                setReviews(data);
            }catch(err){
               console.log(err);
            }
        }


    return (
        <ul className="list-unstyled mb-4">
            {
                reviews?.map((d, i) => {
                    return <li key={'kdmowem' + i} className="card mb-2">
                        <div className="card-body p-lg-4 p-3">
                            <div className="d-flex mb-3 pb-3 border-bottom flex-wrap">
                                <img  style={{width:"50px" ,height:"50px"}} className="avatar rounded" src="https://c8.alamy.com/comp/2F9GW5A/the-electric-motor-from-the-washing-machine-spare-parts-used-to-repair-home-appliances-isolated-background-2F9GW5A.jpg" alt="" />
                                <div className="flex-fill ms-3 text-truncate">
                                    <h6 className="mb-0"><span>{d.customerName}</span></h6>
                                    <span className="text-muted">{new Date(d.createdAt)?.toDateString()}</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="mb-2 me-3">
                                        <a href='#!' className="rating-link active"><i className="bi bi-star-fill text-warning"></i></a>
                                        <a href='#!' className="rating-link active"><i className="bi bi-star-fill text-warning"></i></a>
                                        <a href='#!' className="rating-link active"><i className="bi bi-star-fill text-warning"></i></a>
                                        <a href='#!' className="rating-link active"><i className="bi bi-star-fill text-warning"></i></a>
                                        <a href='#!' className="rating-link active"><i className="bi bi-star-half text-warning"></i></a>
                                    </span>
                                </div>
                            </div>
                            <div className="timeline-item-post">
                                <h6 className="">{d.productName}</h6>
                                <p>{d.review}</p>

                                {
                                    d.type === 'second' ? <div>
                                        <div className="d-flex mt-3 pt-3 border-top">
                                            <img style={{width:"50px" ,height:"50px"}}  className="avatar rounded" src={d.img} alt="" />
                                            <div className="flex-fill ms-3 text-truncate">
                                                <p className="mb-0"><span>{d.secondname}</span> <small className="msg-time text-muted">5 Day ago</small></p>
                                                <span className="text-muted">{d.secondtime}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <textarea className="form-control" placeholder="Replay"></textarea>
                                        </div>
                                    </div> : null
                                }

                            </div>
                        </div>
                    </li>
                })
            }
        </ul>

    )
}
export default ReviewDiscription;