import React, { useState } from 'react'
import axios from "axios";
import Cards from '../cards';
import brandLogo from "../../assets/lybley_logo.png";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { allSparePart } from '@/redux/actions/sparePart';
import Link from 'next/link';
import httpCommon from '@/http-common';
const Search = () => {
  const router = useRouter();
  // const dispatch=useDispatch();
  // const [data,setData]=useState({});
  const [search, setSearch] = useState("")
  const [spareParts, setSparePart] = useState([]);
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
  //https://lybley-webapp-collection.s3.amazonaws.com/Spare+Trade+LOGO+Final.png
  return (
    <div className='container mt-3'>
      <div className='d-flex justify-content-center'><img src="https://lybley-webapp-collection.s3.amazonaws.com/PNG-01.png-1683104555712-389269871" height="250px" width="350px" className='m-0 p-0' alt='logo' /></div>
      <div className='row mt-4'>
        <div className='col-12'>
          <div className='form-group'>
            <div className='d-flex justify-content-between'> <input type="text" className='form-control border border-2 border-dark' placeholder='Search' onChange={(e) => setSearch(e.currentTarget.value)} onKeyUp={(e) => onEnter(e)} />  <button className='btn btn-primary bg-dark ms-2' onClick={() => setParams()}>Search</button></div>
          </div>
        </div>

      </div>
      <div className='row mt-4'>

        {spareParts?.map((p1, i) =>
          <div className='col-md-3 col-4 d-flex justify-content-center mb-3'>
            <Link href={`/detail?id=${p1._id}`} className="text-decoration-none text-dark">
              <div className="card">
                <img src={p1?.images[0]} class="card-img-top" alt="..." height="200px" width="200px" />
                <div className="card-body">
                  <h5 className="card-title">{p1?.partName}</h5>
                  <p className="card-text">{"Best Price - " + p1?.bestPrice + " INR"}</p>
                  <p className='text-muted text-decoration-line-through'>{"MRP - " + p1?.MRP + " INR"}</p>
                </div>
              </div>
              </Link>
          </div>
        )}
      </div>
    </div>
  )
}


export default Search;