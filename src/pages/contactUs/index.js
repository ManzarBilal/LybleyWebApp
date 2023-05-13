import React from 'react'
import Header from '../header';
import Footer from '../footer';
import style from "../common.module.css"

const ContactUs = () => {
    return (
        <>
            <Header />
            <div className='container'>
                <div className='mt-5 '>
                    <div className={`${style.contactHead} d-flex justify-content-center align-items-center text-white fw-bold fs-1`}>Contact Us</div>
                    <div>
                        <div className='mt-5 fw-bold fs-3'>We are always here to assist you with any queries or concerns you may have. Here are some ways you can reach us:</div>
                        <div className='mt-3 fw-bold fs-3'>Customer Support:</div>
                        <div>For any questions related to spare parts, orders, payments, or deliveries, please email us at <span className='text-primary fw-bold'>support@sparetrade.com</span> or call us at <span className='fw-bold fs-5'>+1 (555) 123-4567</span>.
                            Our customer support team is available from Monday to Friday, 9 am to 6 pm EST.</div>
                        <div className='mt-3 fw-bold fs-3'>Feedback and Suggestions:</div>
                        <div>We welcome your feedback and suggestions to help us improve our services. You can email us at <span className='text-primary fw-bold'>feedback@sparetrade.com</span>, and we will be happy to hear from you.</div>
                        <div className='mt-3 fw-bold fs-3'>Partnerships and Collaborations:</div>
                        <div>If you are a brand or a supplier interested in partnering with us, please email us at <span className='text-primary fw-bold'>partnerships@sparetrade.com</span>, and we will get back to you as soon as possible.</div>
                        <div className='mt-3 fw-bold fs-3'>Media and Press:</div>
                        <div>For media or press-related inquiries, please email us at media@sparetrade.com.</div>
                   
                        <div className='mt-3 fw-bold fs-3'>Address :</div>
                        <div>If you prefer to write to us or visit us, you can find us at the following address:</div>
                        <div className='fw-bold'>SpareTrade Inc. A Company Of Lybley India Pvt Ltd</div>
                        <div>A-9 Sector</div>
                        <div>Noida</div> 
                        <div>Gautam Budh NagrUttarPardesh 2</div>
                        <div className='mt-3 fw-bold fs-3'>United States</div>
                        <div>We look forward to hearing from you and assisting you with your spare parts needs!</div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default ContactUs;