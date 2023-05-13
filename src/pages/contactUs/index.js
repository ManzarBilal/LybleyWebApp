import React from 'react'
import Header from '../header';
import Footer from '../footer';
 

const ContactUs = () => {
    return (
        <>
            <Header />
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-12 col-md-4 d-flex align-items-center '><img src="https://kewlmotors.com/wp-content/uploads/2021/06/about-kewl-motors.png" alt="logo" className=' img-fluid' /></div>
                    <div className='col-12 col-md-8'>
                        <h1 className='mt-3 fw-bold'>Contact Us</h1>
                        <hr className='border border-5 border-secondary' />
                        <p className='text-justify'>
                            We are always here to assist you with any queries or concerns you may have. Here are some ways you can reach us:
                        </p>
                        <div>
                            Customer Support:
                        </div>
                        <p>
                            For any questions related to spare parts, orders, payments, or deliveries, please email us at <span className='text-primary fw-bold'>support@sparetrade.com</span> or call us at <span className='text-primary fw-bold '>+1 (555) 123-4567</span>.
                            Our customer support team is available from Monday to Friday, 9 am to 6 pm EST.
                        </p>
                        <div>
                        Feedback and Suggestions:
                        </div>
                        <p>
                        We welcome your feedback and suggestions to help us improve our services. You can email us at <span className='text-primary fw-bold'>feedback@sparetrade.com</span>, and we will be happy to hear from you.
                        </p>
                        <div>
                        Partnerships and Collaborations:
                        </div>
                        <p>
                        If you are a brand or a supplier interested in partnering with us, please email us at <span className='text-primary fw-bold'>partnerships@sparetrade.com</span>, and we will get back to you as soon as possible.
                        </p>
                        <div>
                        Media and Press:
                        </div>
                        <p>
                        For media or press-related inquiries, please email us at <span className='text-primary fw-bold'>media@sparetrade.com.</span>
                        </p>
                        <div>
                        Address :
                        </div>
                        <p>
                        If you prefer to write to us or visit us, you can find us at the following address:
                        </p>
                        <div>
                        SpareTrade Inc. A Company Of Lybley India Pvt Ltd
                        </div>
                        <div>
                        A-9 Sector
                        </div>
                        <div>
                        Noida
                        </div>
                        <div>
                        Gautam Budh NagrUttarPardesh 
                        </div>
                        <div>
                        United States : 
                        </div>
                        <div>
                        We look forward to hearing from you and assisting you with your spare parts needs.
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </>
    )
}
export default ContactUs;