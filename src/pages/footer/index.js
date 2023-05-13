 
import Link from "next/link";
import React from "react";
import { BsFillSendFill } from 'react-icons/bs';
export default function Footer() {
    return (
        <>
         <footer className="w-100 py-4 flex-shrink-0 bg-dark mt-5"  >
        <div className="container">
            <div className="row gy-4 gx-5">
                <div className="col-lg-4 col-md-6">
                    <h5 className="h1 text-white"><img src="https://lybley-webapp-collection.s3.amazonaws.com/PNG-04.png-1683867426179-153282453" alt="logo" height="45px" width="40px" /></h5>
                    <p className="small text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                    {/* <p className="small text-muted mb-0">&copy; Copyrights. All rights reserved. <a className="text-primary" href="#">Bootstrapious.com</a></p> */}
                    <div className="mt-5"><img className="p-1" src="https://lybley-webapp-collection.s3.amazonaws.com/twitter-icon-83.png-1683868908280-955619544" alt="logo" height="30px" width="30px" /> <img className="p-1"  src="https://lybley-webapp-collection.s3.amazonaws.com/facebook-logo-png-5.png-1683869724419-25458077" alt="logo" height="30px" width="30px" /> <img className="p-1"  src="https://lybley-webapp-collection.s3.amazonaws.com/whatsapp-icon-3933.png-1683869804569-439943255" alt="logo" height="30px" width="30px" /> <img className="p-1"  src="https://lybley-webapp-collection.s3.amazonaws.com/pngegg.png-1683869876816-914477302" alt="logo" height="30px" width="30px" /> </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-white mb-3">About</h5>
                    <ul className="list-unstyled text-muted">
                        <Link className="text-decoration-none text-muted" href="/aboutUs"> <li>About us</li></Link>
                        <li><Link href="/contactUs" > Contact</Link></li>
                        <li><Link href="/faqs" >FAQ</Link></li>
                        <li><Link href="/carrier" >Carees</Link></li>
                     
                        <li>Investor Relations </li>
                    </ul>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h5 className="text-white mb-3">Policy</h5>
                    <ul className="list-unstyled text-muted">
                        <li>Return Policy</li>
                        <li>Privacy Policy</li>
                        <li>Disclaimer</li>
                        <li>Terms of Use</li>
                        <li>Buyers Policy</li>
                        <li>Sellers Policy</li>
                    </ul>
                </div>
                <div className="col-lg-2 col-md-6">
                    <h5 className="text-white mb-3">Useful links</h5>
                    <ul className="list-unstyled text-muted">
                        <li>Article</li>
                        <li>Brands</li>
                        <li>Catalogues</li>
                        <li>SiteMap</li>
                    </ul>
                    {/* <p className="small text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                    <form action="#">
                        <div className="input-group mb-3">
                            <input className="form-control" type="text" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <button className="btn btn-primary" id="button-addon2" type="button"><BsFillSendFill />  </button>
                        </div>
                    </form> */}
                </div>
            </div>
          
        </div>
        <div className="text-white text-center"><p className="small text-muted mb-0">&copy; Copyrights. All rights reserved. <a className="text-primary" href="#">SpareTrade.com</a></p></div>
    </footer>
        </>
    )
}