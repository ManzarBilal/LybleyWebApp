"use client";
import Login from "@/pages/login";
import Register from "@/pages/register";
import React, { useState } from "react";
import ForgetPassword from "../forgetPassword";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from "next/link";
import OtpVerification from "../register/otpVerification";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function Header(props) {
    
    const [show, setShow] = useState(false)
    const [forget, setForget] = useState(false)
    const [otpShow ,setOtpShow]=useState(false)
    const handleLogin = (bool) => {
        setShow(bool);
    }
    const handleForget = (bool) => {
        setForget(bool);
    }
    const handleOpt = (bool) => {
        setOtpShow(bool);
    }
//    if(typeof window !== "undefined"){
//     var userId=localStorage?.getItem("userId");
//     var userName=localStorage?.getItem("userName");
//     }
    return (
        <>

           {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
           <div className="container">
            <a className="navbar-brand" href="#">
            <img src="https://lybley.com/APP/assets/backend/assets/images/text_only.png" alt="" width="250" height="60" className="d-inline-block align-text-top" />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Service</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" tabindex="-1" aria-disabled="true">Contact</a>
                </li>
              </ul>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </nav> */}
            <div className="d-flex  justify-content-end  p-4">
                {/* <button className="btn btn-outline-primary ">Login</button> */}
                <div className="d-flex" >
               {/* {userId ? <> <AccountCircleIcon/> </>  :  */}
                <div>
                
                        {show ? <Login onForget={handleForget} onSubmit={handleLogin} bool={show} onSubmit1={handleOpt} /> : forget ? <ForgetPassword bool={forget} onSubmit1={handleLogin} onSubmit={handleForget} /> 
                         : <Register onSubmit={handleLogin} onSubmit1={handleOpt} />}
                    </div> 
                    {/* } */}
                    <div> <OtpVerification onSubmit={handleLogin} onSubmit1={handleOpt} bool={otpShow} /></div>
                    <div className={props?.detail ? "ms-4 p-2 text-dark fw-bold" :"ms-4 p-2 text-dark fw-bold"} >
                       <Link href="/checkout" className="text-decoration-none text-dark" > Cart <ShoppingCartIcon color={props?.detail ? "" :"white"}/></Link>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Header;