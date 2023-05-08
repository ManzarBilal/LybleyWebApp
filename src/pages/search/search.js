import React, { useState } from 'react'
import axios from "axios";
import Cards from '../cards';
import brandLogo from "../../assets/lybley_logo.png";
const Search = () => {

  const [data,setData]=useState({});
  const [search,setSearch]=useState("")
  const getData=async ()=>{
    try{
     let response=await axios.get(`https://api.pexels.com/v1/search?query=${search}`,{headers:{Authorization:"VFfofZr67uQtJMA9eSJAoYAeYhvI4dgmt6R9cXk4icuYN4wRpRExJ9S8"}});
     setData(response?.data);
    }catch(err){
     console.log(err);
    }
}
//https://lybley-webapp-collection.s3.amazonaws.com/PNG-01.png-1683103978537-428964797
//https://lybley-webapp-collection.s3.amazonaws.com/Spare+Trade+LOGO+Final.png
  return (
    <div className='container mt-3'>
      <div className='d-flex justify-content-center'><img src="https://lybley-webapp-collection.s3.amazonaws.com/PNG-01.png-1683104555712-389269871" height="250px" width="350px" className='m-0 p-0' alt='logo' /></div>
    <div className='row mt-4'>
      <div className='col-12'> 
        <div className='form-group'>
       <div className='d-flex justify-content-between'> <input type="text" className='form-control border border-2 border-dark' placeholder='Search' onChange={(e)=>setSearch(e.currentTarget.value)}/>  <button className='btn btn-primary bg-dark ms-2' onClick={getData}>Search</button></div>
        </div>       
        </div>
    
    </div>
    <div className='row mt-4'>
    
    {data?.photos?.map((p1,i)=>
    <div className='col-md-3 col-4 d-flex justify-content-center mb-3'>
      <Cards key={i} img={p1?.src?.tiny} description={p1?.url} title={p1?.photographer} link="Click" />
      </div>
      )}  
    </div>
    </div>
  )
}


export default Search;