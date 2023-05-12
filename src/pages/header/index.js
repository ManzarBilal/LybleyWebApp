"use client";
import Login from "@/pages/login";
import Register from "@/pages/register";
import React, { useEffect, useState } from "react";
import ForgetPassword from "../forgetPassword";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from "next/link";
import OtpVerification from "../register/otpVerification";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cart from "../cart";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from "react-toastify";

function Header(props) {
  const showToastMessage = ( ) => {
  
        toast.success(` Logout Successefully !`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose:1000
        });
  }
  const [open1, setOpen1] = useState(false)
  const [show, setShow] = useState(false)
  const [forget, setForget] = useState(false)
  const [otpShow, setOtpShow] = useState(false)
  const [userData, setUserdata] = useState("")
  const [randomValue, setRandomValue] = useState("")
  const handleLogin = (bool) => {
    setShow(bool);
   props?.detail && props?.setShowLogin(false);
    let x = Math.floor((Math.random() * 10) + 1);
    setRandomValue(x);
    
  }
  const handleForget = (bool) => {
    setForget(bool);
  }
  const handleOpt = (bool) => {
    setOtpShow(bool);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    let x = Math.floor((Math.random() * 10) + 1);
    setRandomValue(x);
    handleClose()
    window.location.reload(false);
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserdata(localStorage.getItem("userId"))
    }
  }, [randomValue])

   //https://lybley-webapp-collection.s3.amazonaws.com/PNG-04.png-1683867426179-153282453
   //https://lybley-webapp-collection.s3.amazonaws.com/PNG-01%20%282%29.png-1683267967762-208485470
  return (
    <>
      
      <div className="d-flex justify-content-between sticky-top bg-dark align-items-center p-2">
        <div> <Link href="/"><img src="https://lybley-webapp-collection.s3.amazonaws.com/PNG-04.png-1683867426179-153282453" alt="logo" height="45px" width="40px" /></Link> </div>
        <div className="d-flex align-items-center">
        {  userData === null ?
         
         <div className="">
            {/* {userId ? <> <AccountCircleIcon/> </>  :  */}
            <div>

              {(props?.bool ? props?.bool : show) ? <Login setOpen1={setOpen1} onForget={handleForget} onSubmit={handleLogin} bool={props?.bool ? props?.bool : show} onSubmit1={handleOpt} /> : forget ? <ForgetPassword bool={forget} onSubmit1={handleLogin} onSubmit={handleForget} />
                : <Register open={open1} setOpen1={setOpen1} onSubmit={handleLogin} onSubmit1={handleOpt} />}
            </div>
            {/* } */}
            <div>
              <div> <OtpVerification onSubmit={handleLogin} onSubmit1={handleOpt} bool={otpShow} /></div>
            </div>
          </div>
          :
          <>

          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <AccountCircleIcon sx={{ color: "white", backgroundColor: "black", borderRadius: "50%",fontSize:"40px" }} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Order</MenuItem>
            <hr className="m-0 p-0"></hr>
            <MenuItem onClick={handleLogout} >Logout</MenuItem>
          </Menu>
          

        </>
        }
        <Cart user={userData} randomValue={props?.randomValue} onSubmit={handleLogin} />
        <ToastContainer />
        </div>
      </div>

    </>
  )
}
export default Header;