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
    let x = Math.floor((Math.random() * 10) + 1);
    setRandomValue(x);
    handleClose()
    showToastMessage()
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserdata(localStorage.getItem("userId"))
    }
  }, [randomValue])

   
  return (
    <>

      <div className="d-flex  justify-content-end  p-4">
        {  userData === null ?
         
         <div className="d-flex align-items-center">
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
            <AccountCircleIcon sx={{ color: "white", backgroundColor: "black", borderRadius: "50%" }} />
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
            <MenuItem onClick={handleLogout} >Logout</MenuItem>
          </Menu>
          

        </>
        }
        <Cart user={userData} randomValue={props?.randomValue} onSubmit={handleLogin} />
        <ToastContainer />
      </div>

    </>
  )
}
export default Header;