import React, { useEffect, useState } from 'react'
import Header from '../header'
import Footer from '../footer'
import style from "../common.module.css"
import { useRouter } from 'next/router'
import httpCommon from '@/http-common'
import DateRangeIcon from '@mui/icons-material/DateRange';
import ReactLoader from '../loading'
 


const BlogDetail = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { id } = router.query;


    useEffect(() => {
        getBlog();
    }, [ ]);


    const getBlog = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get(`/getBlogById/${id}`);
            let { data } = response;
            setData(data);
            setLoading(false)

        } catch (err) {
            setLoading(false)
            console.log(err);
        }
    }

    return (
        <>
            <Header />
            {loading===true ? <div  className='vh-100 d-flex align-items-center justify-content-center'><ReactLoader /></div> 
            :
            <div className='container'>
                <div className='mt-5'>
                    {/* ${style.brandBannerHgt} */}
                    <img className={` fluid-img rounded`} src={data?.image} alt='' width="100%" />

                </div>
                <div className='mt-5'>
                    <h2 className='text-break'>{data?.title}</h2>
                </div>
                <div>
                    <h4 className='text-break'>{data?.content}</h4>
                </div>
                <div className='d-flex mt-5'>
                    <DateRangeIcon color='primary' />  <div className='ms-2'>{new Date(data?.createdAt).toDateString()}</div>
                </div>
            </div>
                
            }
            <Footer />
        </>
    )
}

export default BlogDetail