import Login from "@/pages/login";
import Register from "@/pages/register";
import React, { useState } from "react";
import ForgetPassword from "../forgetPassword";
function Header() {
    const [show, setShow] = useState(true)
    return (
        //    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        //    <div className="container">
        //     <a className="navbar-brand" href="#">
        //     <img src="https://lybley.com/APP/assets/backend/assets/images/text_only.png" alt="" width="250" height="60" className="d-inline-block align-text-top" />
        //     </a>
        //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        //       <span className="navbar-toggler-icon"></span>
        //     </button>
        //     <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //         <li className="nav-item">
        //           <a className="nav-link active" aria-current="page" href="#">Home</a>
        //         </li>
        //         <li className="nav-item">
        //           <a className="nav-link" href="#">About</a>
        //         </li>
        //         <li className="nav-item">
        //           <a className="nav-link" href="#">Service</a>
        //         </li>
        //         <li className="nav-item">
        //           <a className="nav-link" href="#" tabindex="-1" aria-disabled="true">Contact</a>
        //         </li>
        //       </ul>
        //       <form className="d-flex">
        //         {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
        //         <button className="btn btn-primary">Login</button>
        //       </form>
        //     </div>
        //   </div>
        // </nav>
        <>
            <div className="text-end p-4">
                {/* <button className="btn btn-outline-primary ">Login</button> */}
              
                    <Login /> <ForgetPassword /> <Register />
                 
            </div>

        </>
    )
}
export default Header;