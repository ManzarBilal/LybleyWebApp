import React, { useState } from 'react'
import axios from "axios";
import Cards from '../cards';
import brandLogo from "../../assets/lybley_logo.png";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { allSparePart } from '@/redux/actions/sparePart';
import Link from 'next/link';
import httpCommon from '@/http-common';
import style from "../common.module.css";

const Search = () => {
  const router = useRouter();
  // const dispatch=useDispatch();
  // const [data,setData]=useState({});
  const [search, setSearch] = useState("")
  const [spareParts, setSparePart] = useState([]);
  const [page,setPage]=useState(1);
  
  //   const getData=async ()=>{
  //     try{
  //      let response=await axios.get(`https://api.pexels.com/v1/search?query=${search}`,{headers:{Authorization:"VFfofZr67uQtJMA9eSJAoYAeYhvI4dgmt6R9cXk4icuYN4wRpRExJ9S8"}});
  //      setData(response?.data);
  //     }catch(err){
  //      console.log(err);
  //     }
  // }
  const getSparePart = async () => {
    try {
      let response = await httpCommon.get(`/allSparePart?sparePart=${search}`);
      let { data } = response;
      setSparePart(data);
    } catch (err) {
      console.log(err);
    }
  }

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      setParams();
    }
  }

  const setParams = () => {
    router.query.sparePart = search;
    router.push(router);
    getSparePart(search);
  }

  //https://lybley-webapp-collection.s3.amazonaws.com/PNG-01.png-1683103978537-428964797
  //"https://lybley-webapp-collection.s3.amazonaws.com/Spare+Trade+LOGO+Final.png",


  let pageNum=page;
  let size=12;
  let startIndex=(pageNum-1)*size;
  let endIndex= spareParts?.length > (startIndex+size-1) ? startIndex+size-1 : spareParts?.length-1;
  let spareParts1=spareParts?.length>size ? spareParts?.filter((lt,index)=>index>=startIndex && index<=endIndex)  : spareParts;

  return (
    <div className='  mt-3'>
      <div className='row  mt-3'>
        <div className='col-12 d-flex justify-content-center' >
        <img src="https://lybley-webapp-collection.s3.amazonaws.com/PNG-03.png-1684751589484-776320794" height="230px" width="300px"  alt='logo' />
        </div>
        <div className='col-12 mt-4'>
          <div className='form-group'>
            <div className='d-flex justify-content-between '> <input type="text" className='form-control border border-2 border-dark' placeholder='Search' onChange={(e) => setSearch(e.currentTarget.value)} onKeyUp={(e) => onEnter(e)} />  <button className='btn btn-primary bg-dark ms-2' onClick={() => setParams()}>Search</button></div>
          </div>
        </div>

      </div>
      <div className='row mt-4'>

        {spareParts1?.map((p1, i) =>
          <div className='col-lg-4 col-md-6 col-6 d-flex justify-content-center mb-3'>
            <Link href={`/detail?id=${p1._id}`} className="text-decoration-none text-dark">
              <div className= {`${style.cardHeaderH} card border-0`}>
                <img src={p1?.images[0]} className={`${style.cardImageSearch} img-fluid`}  alt="..."   />
                <div className="card-body">
                  <div className={`${style.cardTitle} card-title fw-bold`}>{p1?.partName}</div>
                  <div className={`${style.cardTitle} card-text`}>{"Best Price - " + p1?.bestPrice + " INR"}</div>
                  <div className='text-muted text-decoration-line-through'>{"MRP - " + p1?.MRP + " INR"}</div>
                </div>
              </div>
              </Link>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center align-items-center mt-3">
     {page===1 ? "" : <button className="btn btn-primary" onClick={()=>setPage(page-1)}>Prev</button>} {spareParts.length>size ? <div className='ms-2 me-2'>{startIndex+1}-{endIndex+1} of {spareParts.length}</div> : "" }{endIndex+1===spareParts?.length ? "" :<button className="btn btn-primary" onClick={()=>setPage(page+1)}>Next</button>}
      </div>
    </div>
  )
}


export default Search;