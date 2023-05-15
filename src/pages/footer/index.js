
import Link from "next/link";
import React from "react";
import style from "../common.module.css"
export default function Footer() {
    return (
        <>
            <footer className="w-100 py-4 flex-shrink-0 bg-dark mt-5"  >
                <div className="container">
                    <div className="row gy-4 gx-5">
                        <div className="col-lg-4 col-md-6">
                            <h5 className="h1 text-white"><Link href="/"><img src="https://lybley-webapp-collection.s3.amazonaws.com/PNG-04.png-1683867426179-153282453" alt="logo" height="45px" width="40px" />
                            </Link></h5>
                            <p className="small text-muted">India's biggest online marketplaces for spare parts.</p>
                            {/* <p className="small text-muted mb-0">&copy; Copyrights. All rights reserved. <a className="text-primary" href="#">Bootstrapious.com</a></p> */}
                            <div className="mt-5">
                                <img className="p-1 bg-white rounded-circle" src="https://cdn-icons-png.flaticon.com/512/1051/1051382.png" alt="logo" height="40px" width="40px"  /> 
                                {/* <img className="p-1" src="https://lybley-webapp-collection.s3.amazonaws.com/facebook-logo-png-5.png-1683869724419-25458077" alt="logo" height="30px" width="30px" /> 
                                <img className="p-1" src="https://lybley-webapp-collection.s3.amazonaws.com/whatsapp-icon-3933.png-1683869804569-439943255" alt="logo" height="30px" width="30px" /> 
                                <img className="p-1" src="https://lybley-webapp-collection.s3.amazonaws.com/pngegg.png-1683869876816-914477302" alt="logo" height="30px" width="30px" />  */}
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-3">About</h5>
                            <ul className="list-unstyled text-muted">
                                <Link className={`${style.footerLink} text-decoration-none text-muted`}  href="/aboutUs"> <li className={`${style.footerLink}`}>About Us</li></Link>
                                <Link className={`${style.footerLink} text-decoration-none text-muted`} href="/contactUs" ><li> Contact Us</li></Link>
                                <Link className={`${style.footerLink} text-decoration-none text-muted`} href="/faqs" ><li>FAQ</li></Link>
                                <Link className={`${style.footerLink} text-decoration-none text-muted`} href="/carrier" > <li> Carees </li></Link>

                                <li>Investor Relations </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-3">Policy</h5>
                            <ul className="list-unstyled text-muted">
                            <Link className={`${style.footerLink} text-decoration-none text-muted`} href="/returnPolicy" >  <li>Return Policy</li></Link>
                                <Link className={`${style.footerLink} text-decoration-none text-muted`} href="/privacyPolicy" >  <li>Privacy Policy</li></Link>
                                <Link className={`${style.footerLink} text-decoration-none text-muted`} href="/disclaimer" >  <li>Disclaimer</li></Link>
                                <Link className={`${style.footerLink} text-decoration-none text-muted`} href="/termOfUse" > <li>Terms of Use</li></Link>
                                <Link className={`${style.footerLink} text-decoration-none text-muted`} href="/buyersPolicy" >  <li>Buyers Policy</li></Link>
                                <Link className={`${style.footerLink} text-decoration-none text-muted`} href="/sellersPolicy" >  <li>Sellers Policy</li></Link>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <h5 className="text-white mb-3">Useful links</h5>
                            <ul className="list-unstyled text-muted">
                            <Link className={`${style.footerLink} text-decoration-none text-muted`} href="/Article" ><li>Article</li></Link>
                            <Link className={`${style.footerLink} text-decoration-none text-muted`} href="/sparePartBrands" ><li>Brands</li></Link>
                            <Link className={`${style.footerLink} text-decoration-none text-muted`} href="/SiteMap" ><li>SiteMap</li></Link>
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
                <div className="text-white text-center"><p className="small text-muted mb-0">&copy; Copyrights. All rights reserved. <a className="text-primary" href="/">SpareTrade.com</a></p></div>
            </footer>
        </>
    )
}