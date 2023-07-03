import httpCommon from '@/http-common';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ReactLoader from '../loading';
import "bootstrap/dist/css/bootstrap.css"
import Header from '../header';
import Footer from '../footer';
import { useSelector } from 'react-redux';


const SparePartsByCategory = () => {
    const [loading, setLoading] = useState(false)
    const [spareParts, setSpareParts] = useState([])
    const router = useRouter();
    const { category } = router.query;

    const allBrands=useSelector(state=>state.brands)
 
    useEffect(() => {
        getAllSpareParts();
    }, [category]);

    const getAllSpareParts = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get(`/sparePartByCategory?category=${category}`)
            let { data } = response;
            setSpareParts(data)
            setLoading(false)

        }
        catch (err) {
            console.log(err)
            setLoading(false)

        }
    }
    
     
    return (
        <>
        <Header />
            {loading === true ?
                <div className='vh-100 d-flex align-items-center justify-content-center'><ReactLoader /></div>
                :
                <div className='container mt-5'>
                    
                    <div className='row w-100'>
                        <div className='col-12 col-md-3 col-lg-3 '>
                            <div className='fw-bold '>Filter & Refine Results</div>
                            <div className='border mt-3 p-3'>
                       {allBrands?.allBrands?.map((brand,i)=> <div key={i} >{brand?.brandName}</div>
                       )}
                       </div>
                       </div>
                       <div className='col-12 col-md-9 col-lg-9'>
                        <div className='row'>
                       {spareParts?.map((item,i)=> <div className='col-12 col-md-4 col-lg-4 border'>{item?.partName}</div>
                       )}
                       </div>
                       </div>
                    </div>
                 
                </div>
            }
            <Footer />
        </>
    )
}

export default SparePartsByCategory