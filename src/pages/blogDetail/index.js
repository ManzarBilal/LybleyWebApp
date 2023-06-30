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
    }, []);


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
            {loading === true ? <div className='vh-100 d-flex align-items-center justify-content-center'><ReactLoader /></div>
                :
                <div className='container'>
                    <div className='mt-5'>
                        <h2 className='text-break'>{data?.title}</h2>
                    </div>
                    <div className='fs-12 d-flex mt-4'>
                        <DateRangeIcon color='primary' />  <div className='ms-2'>{new Date(data?.createdAt).toDateString()}</div>
                    </div>
                    <div className='mt-3'>
                        <div className='fs-12 text-primary'>{data?.category}</div>
                    </div>
                    <div className='mt-5'>
                        {/* ${style.brandBannerHgt} */}
                        <img className={`img-fluid rounded`} src={data?.image} alt={data?.metaTitle} width="50%" />

                    </div>

                    <div>
                        <div style={{fontSize:"16px",fontWeight:"400",color:"#1b1b28",fontFamily:"ColfaxAI, helvetica, sans-serif"}}  className=' mt-5'>{data?.content}</div>
                    </div>
                   
                </div>

            }
            <Footer />
        </>
    )
}

export default BlogDetail