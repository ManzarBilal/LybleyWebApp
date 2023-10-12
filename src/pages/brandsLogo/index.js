import Link from 'next/link';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands } from '@/redux/actions/brand';
import style from "./brandLogo.module.css"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const BrandsLogo = () => {
  const dispatch = useDispatch();
  const [abc, setABC] = useState(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]);
  const [page, setPage] = useState(1);
  const [page1, setPage1] = useState(1);

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

  let pageNum1 = page1;
  let size1 = 20;
  let startIndex1 = (pageNum1 - 1) * size1;
  let endIndex1 = brandsLogo1?.filter(b1 => b1?.approval === "APPROVED")?.length > (startIndex1 + size1 - 1) ? startIndex1 + size1 - 1 : brandsLogo1?.filter(b1 => b1?.approval === "APPROVED")?.length - 1;
  let brandsLogo2 = brandsLogo1?.filter(b1 => b1?.approval === "APPROVED")?.length > size1 ? brandsLogo1?.filter(b1 => b1?.approval === "APPROVED")?.filter((lt, index) => index >= startIndex1 && index <= endIndex1) : brandsLogo1.filter(b1 => b1?.approval === "APPROVED");
  console.log(endIndex1 + 1,brandsLogo1?.filter(b1 => b1?.approval === "APPROVED")?.length);
  return (
    <div className='container mt-3'>
      <div class="d-flex justify-content-between">
        <div className='row w-100'>
          { brandsLogo1?.filter(b1 => b1?.approval === "APPROVED")?.length === 0 ?
          <div className='col-12' > <h3 className='text-center'>No Brand Found</h3></div> 
          :
            brandsLogo2?.filter(b1 => b1?.approval === "APPROVED")?.map((img, i) =>
              <div key={i} className={` ${style.brandLodoMargin} d-flex justify-content-between col-md-3 col-lg-2 col-3`} >
                <Link href={`/brand?id=${img?._id}`} > <img className={` ${style.brandLogoImage} rounded`} src={img?.brandLogo} alt={img?.brandName} onClick={()=>localStorage.setItem("brandLogoId",img?._id)}  /> </Link>
              </div>
            )}
        </div>
        <div class="d-flex flex-column align-items-center">
          {page === 1 ? "" : <span style={{ cursor: "pointer" }} className='text-primary' onClick={() => setPage(page - 1)}>
            {/* <img src="https://lybley-webapp-collection.s3.amazonaws.com/download%20%281%29.png-1685358572061-710678286" height="15px" alt="up" /> */}
            <ArrowDropUpIcon />
            </span>}
          {abc1.map(a1 =>
            <div style={{ cursor: "pointer" }} className="text-primary" >{abcSearch === a1 ? <h4 onClick={() => setABCSearch("")}>{a1}</h4> : <span onClick={() => setABCSearch(a1)}>{a1}</span>}</div>
          )}
          {(endIndex + 1) === 26 ? "" : <span style={{ cursor: "pointer" }} className='text-primary' onClick={() => setPage(page + 1)}>
            {/* <img src="https://lybley-webapp-collection.s3.amazonaws.com/download.png-1685358657113-341080787" alt="down" height="15px" /> */}
            <ArrowDropDownIcon />
            </span>}
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-3">
      {page1 === 1 ? "" : <button className="btn btn-primary" onClick={() => setPage1(page1 - 1)}>Prev</button>} {brandsLogo1?.filter(b1 => b1?.approval === "APPROVED")?.length > size1? <div className='ms-2 me-2'>{startIndex1 + 1}-{endIndex1 + 1} of {brandsLogo1?.filter(b1 => b1?.approval === "APPROVED")?.length}</div> : ""} {endIndex1 + 1 === brandsLogo1?.filter(b1 => b1?.approval === "APPROVED")?.length ? "" : <button className="btn btn-primary" onClick={() => setPage1(page1 + 1)}>Next</button>}
      </div>
    </div>
  )
}

export default BrandsLogo;