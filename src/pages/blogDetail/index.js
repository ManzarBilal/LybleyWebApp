import React, { useEffect, useState } from 'react'
import Header from '../header'
import Footer from '../footer'
import style from "../common.module.css"
import { useRouter } from 'next/router'
import httpCommon from '@/http-common'
import DateRangeIcon from '@mui/icons-material/DateRange';


const BlogDetail = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getBlog();
    }, []);
    const router = useRouter()
    const { id } = router.query;
    const getBlog = async () => {
        try {
            let response = await httpCommon.get(`/getBlogById/${id}`);
            let { data } = response;
            setData(data);

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Header />
            <div className='container'>
                <div className='mt-5'>
                    <img className={`${style.brandBannerHgt} rounded`} src={data?.image} alt='' width="100%" />

                </div>
                <div className='mt-5'>
                    <h2 className='text-break'>{data?.title}</h2>
                </div>
                <div>
                    <h4 className='text-break'>{data?.content}</h4>
                </div>
                <div className='d-flex mt-5'>
                <DateRangeIcon color='primary' />  <div className='ms-2'>{new Date (data?.createdAt).toDateString()}</div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default BlogDetail