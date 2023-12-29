import React, { useEffect } from 'react'
 
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands } from '@/redux/actions/brand';

const SparePartBrand = () => {

    const dispatch = useDispatch();
    const brandsLogo = useSelector(state => state.brands)

    useEffect(() => {
        dispatch(getAllBrands());
    }, [])


    return (
        <div>
             
            <div className='container mt-5'>

                <div className='row  ms-md-5 me-md-5'>
                    <div className='col-12 mb-5 '>
                        <h1 ><span className='bg-dark text-white p-2  text-center'>Our Brands</span></h1>
                    </div>
                    {brandsLogo?.allBrands?.filter(b1 => b1?.approval === "APPROVED")?.map((img, i) =>
                        <div key={i} className='col-6 col-md-4 d-flex justify-content-center mb-3'>
                            <img className='rounded' src={img?.brandLogo} alt={img?.brandName} height="100" width="100" />
                        </div>
                    )}
                </div>
            </div>
           
        </div>
    )
}

export default SparePartBrand;