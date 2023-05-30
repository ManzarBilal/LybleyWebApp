import Link from 'next/link';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands } from '@/redux/actions/brand';
import style from "./brandLogo.module.css"

const BrandsLogo = () => {
  const dispatch = useDispatch();
  const [abc, setABC] = useState(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]);
  const [page, setPage] = useState(1);
  const [abcSearch, setABCSearch] = useState("");
  const brandsLogo = useSelector(state => state.brands);
  const brandsLogo1 = abcSearch ? brandsLogo?.allBrands?.filter(f1 => f1.brandName?.toLowerCase()?.startsWith(abcSearch?.toLowerCase())) : brandsLogo?.allBrands;

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch])

  let pageNum = page;
  let size = 6;
  let startIndex = (pageNum - 1) * size;
  let endIndex = abc?.length > (startIndex + size - 1) ? startIndex + size - 1 : abc?.length - 1;
  let abc1 = abc?.length > size ? abc?.filter((lt, index) => index >= startIndex && index <= endIndex) : abc;

  return (
    <div className='container mt-3'>
      <div class="d-flex justify-content-between">
        <div className='row w-100'>
          {brandsLogo1?.length === 0 ?
          <div className='col-12' > <h3 className='text-center'>No Brand Found</h3></div> 
          :
            brandsLogo1?.filter(b1 => b1?.approval === "APPROVED")?.map((img, i) =>
              <div key={i} className={` ${style.brandLodoMargin} d-flex justify-content-between col-md-3 col-lg-1 col-3`} >
                <Link href={`/brand?id=${img?._id}`} > <img className='rounded' src={img?.brandLogo} alt={img?.brandName} height="45" width="45" /> </Link>
              </div>
            )}
        </div>
        <div class="d-flex flex-column align-items-center">
          {page === 1 ? "" : <span style={{ cursor: "pointer" }} className='text-primary' onClick={() => setPage(page - 1)}><img src="https://lybley-webapp-collection.s3.amazonaws.com/download%20%281%29.png-1685358572061-710678286" height="15px" alt="up" /></span>}
          {abc1.map(a1 =>
            <div style={{ cursor: "pointer" }} className="text-primary" >{abcSearch === a1 ? <h4 onClick={() => setABCSearch("")}>{a1}</h4> : <span onClick={() => setABCSearch(a1)}>{a1}</span>}</div>
          )}
          {(endIndex + 1) === 26 ? "" : <span style={{ cursor: "pointer" }} className='text-primary' onClick={() => setPage(page + 1)}><img src="https://lybley-webapp-collection.s3.amazonaws.com/download.png-1685358657113-341080787" alt="down" height="15px" /></span>}
        </div>
      </div>
    </div>
  )
}

export default BrandsLogo;