import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import httpCommon from '@/http-common'
import DateRangeIcon from '@mui/icons-material/DateRange';
import style from "../common.module.css"
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BasicPopover from './popHover';

const Blog = () => {
    const [data, setData] = useState([]);
    const [truncate, setTruncate] = useState(false);
    const [viewAll, setViewAll] = useState(false);
    const [truncateId, setTruncateId] = useState("");

    useEffect(() => {
        getBlogs();
    }, []);

    const getBlogs = async () => {
        try {
            let response = await httpCommon.get("/getAllBlogs");
            let { data } = response;
            setData(data?.reverse());

        } catch (err) {
            console.log(err);
        }
    }
    const handleView = (id) => {
        setTruncateId(id)
        setTruncate(!truncate)
    }

    const handleViewAll = () => {
        setViewAll(!viewAll)
    }

    const viewAllData = viewAll === true ? data : data?.slice(0, 3)
    return (
        <div className=' mt-3'>
            <h1> <u> Articles , Reviews &  Videos</u></h1>
            <div className="d-flex justify-content-between">
                <div className="row w-100 m-0">
                    {viewAllData?.map(d1 =>
                        <div className='mt-5 col-12 col-md-4 col-lg-4' >
                            <div className={`${style.cardHeaderH} card `} >
                                <Link href={`/blogDetail?id=${d1?._id}`} className='text-decoration-none text-dark'>
                                <div  >
                                    <img src={d1?.image} style={{ width: "100%", height: "200px" }} alt={d1?.metaTitle} />
                                </div>
                                <div className="card body p-2"  >

                                    <p className={d1?._id !== truncateId || truncate === false ? "  text-truncate1 fw-bold fs-5" : "  fw-bold fs-5"}>{(d1?.title)?.substr(0, 18)}{d1?.title?.length > 18 ? "..." : ""}</p>
                                    
                                       <BasicPopover  shortDes={d1?.shortDescription}/>
                                     
                                    <div className="d-flex1 justify-content-between align-items-end ">
                                        {/* <div className='text-primary'style={{cursor:"pointer"}} onClick={(e) => handleView(d1?._id)}> {d1?._id !== truncateId || truncate === false  ? "View" : "Hide"} </div>
                                               */}


                                        <div className='mt-3 text-muted'> <small>  {new Date(d1?.createdAt)?.toDateString()}</small></div></div>
                                    <div className=''>
                                        <div style={{ fontSize: "12px", }} className='text-primary' >{(d1?.category)?.substr(0, 18)}{d1?.category?.length > 18 ? "..." : ""} </div>
                                    </div>
                                    <div className='mt-3 mb-3'>
                                        <div className='fs-12 text-primary fw-bold'>Read Full Blog <ArrowForwardIcon className='ms-1' /></div>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        </div>)}

                </div>
            </div>
     
            {data?.length > 3 ? <div className='text-center'> <button className='mt-4 btn btn-dark' onClick={(e) => handleViewAll()} >{viewAll === true ? "Hide" : "View All"}</button>  </div> : ""}
            <div className='mt-5' style={{ textAlign: "justify", padding: "25px 30px 15px", boxShadow: "0 3px 10px #ebebeb" }}>
                <h4 className='text-primary  '>Welcome to SpareTrade.in, the #1 online marketplace for buying and selling spare parts!</h4>
                <p>
                    At SpareTrade, we understand the challenges customers face when it comes to finding genuine spare parts for their appliances, vehicles, electronics, and more. That's why we have created a trusted platform where buyers and sellers can connect, ensuring a seamless and reliable experience.
                </p>
                <p>
                    Whether you are a brand looking to sell your spare parts directly to customers or an individual searching for that specific component, SpareTrade is here to cater to your needs. Our platform brings together a vast range of spare parts from renowned brands, ensuring authenticity, quality, and competitive pricing.
                </p>
                <h5 className='text-primary mt-2'> Why choose SpareTrade?</h5>
                <p >
                    <li >  Wide Selection: Browse through an extensive catalog of spare parts for various categories, all in one place. With a diverse range of options, you can easily find the specific part you need.
                     </li>
                </p>
                <p>
                <li >  Authenticity Guaranteed: We prioritize authenticity and quality. All spare parts listed on our platform are sourced directly from trusted brands, eliminating the risk of counterfeit products.
                </li> 
                </p>
                <p>
                <li >  Easy Buying and Selling: SpareTrade provides a user-friendly interface, making it simple to navigate and search for the spare parts you require. Sellers can also list their products hassle-free, reaching a wide audience of potential buyers.
                </li> 
                </p>
                <p>
                <li >  Secure Transactions: Our platform ensures secure transactions, protecting both buyers and sellers. With robust payment gateways and data encryption, you can shop with peace of mind.
                </li> 
                </p>
                <p>
                <li >  Verified Sellers: We verify the authenticity and credibility of sellers on our platform, promoting a safe and trustworthy buying experience. Customer reviews and ratings further contribute to transparency and trust.
                </li> 
                </p>
                <p>
                <li >  Convenient Delivery: SpareTrade facilitates smooth and efficient delivery of your purchased spare parts, right to your doorstep. We partner with reliable logistics providers to ensure timely and reliable shipments.
                </li> 
                </p>
                <p>
                    Whether you're a brand looking to expand your reach or a customer in need of spare parts, SpareTrade is your go-to online marketplace. Join us today and experience the convenience, authenticity, and reliability that SpareTrade has to offer.
                </p>
                <p>
                    Visit <a href='/' target='_blank'>www.sparetrade.in</a> and discover a world of genuine spare parts at your fingertips. Start buying or selling with confidence on SpareTrade, where your spare parts needs are met with utmost care and satisfaction.
                </p>
                {/* <div className='d-flex justify-content-between'>
                    <div className='fw-bold text-primary'> #SpareTrade</div> <div className='fw-bold text-primary'> #OnlineMarketplace </div> <div className='fw-bold text-primary'>#SpareParts</div>  <div className='fw-bold text-primary'>#GenuineParts</div> <div className='fw-bold text-primary'>#QualityAssured</div>
                </div> */}
            </div>
        </div>
    )
}

export default Blog;