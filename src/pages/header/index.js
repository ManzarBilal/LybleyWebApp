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
import httpCommon from "@/http-common";

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
  const [userInfo,setUserInfo]=useState({});
  const [randomValue, setRandomValue] = useState("")
  const [userDetail, setUserDetails] = useState()
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
    let x = Math.floor((Math.random() * 10) + 1);
    setRandomValue(x);
    handleClose()
    window.location.reload(false);
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
   
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserdata(localStorage.getItem("userId"))
      let user=localStorage.getItem("user");
      setUserInfo(JSON.parse(user));
    }
    getUserDetails()
  }, [randomValue,props?.random])
  const getUserDetails = async () => {

    try {
        const dataU = JSON.parse(localStorage.getItem("user"))
        let response = await httpCommon.get(`/userDetail/${dataU?._id}`);
        let { data } = response;
        setUserDetails(data)
        setRandomValue(props?.random)
    } catch (err) {
        console.log(err);
    }
}
 
   
   //https://lybley-webapp-collection.s3.amazonaws.com/PNG-04.png-1683867426179-153282453
   //https://lybley-webapp-collection.s3.amazonaws.com/PNG-01%20%282%29.png-1683267967762-208485470
  return (
    <>
      
      <div className="d-flex justify-content-between sticky-top bg-dark align-items-center">
        <div className="ms-3"> <Link href="/"><img src="https://lybley-webapp-collection.s3.amazonaws.com/PNG-04.png-1683867426179-153282453" alt="logo" height="45px" width="40px" /></Link> </div>
        <div className="d-flex align-items-center me-2">
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
          <div class="d-flex align-items-center text-center">
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className="m-0 p-0"
          >
          {userDetail?.image==="" || userDetail?.image===undefined ? <AccountCircleIcon sx={{ color: "white", backgroundColor: "black", borderRadius: "50%",fontSize:"40px" }} />
           :<img src={userDetail?.image} alt="profile Photo"height={"40"} width={"40"} style={{borderRadius: "50%"}}/>
        }
           <div className="text-white fw-bold m-0 p-0 ms-2">{userDetail?.name}</div> 
          </Button>
          
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}><Link className="text-decoration-none text-dark" href="/userProfile">Profile</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link className="text-decoration-none text-dark" href="/orders">Order</Link> </MenuItem>
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