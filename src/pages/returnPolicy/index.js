import React, { useState } from 'react'
import Header from '../header';
import Footer from '../footer';

const ReturnPolicy = () => {


    return (
        <div className='bg-light'>
            <Header />
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-12 col-md-4 d-flex align-items-center mt-md-5 pt-md-5 h-100 '><img src="https://kewlmotors.com/wp-content/uploads/2021/06/about-kewl-motors.png" alt="logo" className=' img-fluid' /></div>
                    <div className='col-12 col-md-8'>
                        <h1 className='mt-3 fw-bold'>Return Policy</h1>
                        <hr className='border border-5 border-secondary' />
                        <p className='text-justify'>
                            At SpareTrade, we strive to ensure customer satisfaction with our products. If you are not entirely satisfied with your purchase, we offer a hassle-free return policy to make your shopping experience as seamless as possible. Please review the following guidelines for our return policy:
                        </p>
                        <p>Eligibility:</p>
                        <p>
                            Only products purchased directly from the SpareTrade website are eligible for return.
                            Products must be unused, undamaged, and in their original packaging.
                            Return requests must be initiated within [2] days from the date of delivery.
                            Return Process:
                        </p>
                        <p>
                            To initiate a return, please contact our customer support team at <span className='text-primary fw-bold'>support@sparetrade.com</span> or call us at <span className='text-primary fw-bold'>+91 7777 883 885</span>. Provide your order details and the reason for the return.
                            Our customer support team will guide you through the return process and provide you with a return authorization.
                        </p>
                        <p>
                            Pack the product securely in its original packaging, including all accessories, manuals, and any promotional items that were included with the purchase.
                            Clearly label the package with the return authorization provided by our customer support team.
                        </p>
                        <p>Return Shipping:</p>
                        <p>
                            Customers are responsible for the return shipping costs unless the return is due to an error on our part (e.g., wrong item shipped, damaged product).
                            We recommend using a reliable shipping method with tracking and insurance for the return shipment. SpareTrade is not responsible for any lost or damaged return packages.
                        </p>
                        <p>Inspection and Refund:</p>
                        <p>
                            Once we receive the returned product, our team will inspect it to ensure it meets our return policy requirements.
                        </p>
                        <p>
                            If the returned product meets the eligibility criteria, we will issue a refund for the purchase price, excluding any shipping charges, to the original payment method used for the purchase.
                        </p>
                        <p>
                            Please allow 7 business days for the refund to be processed. The timing of the refund may vary depending on the payment method and financial institution.
                        </p>
                        <p>
                            Non-Returnable Items:
                        </p>
                        <p>
                            Certain items are non-returnable for hygiene or safety reasons, such as opened software, downloadable products, or perishable goods. These items will be clearly stated as non-returnable on the product page.
                        </p>
                        <p>
                            Damaged or Defective Products:
                        </p>
                        <p>
                            If you receive a damaged or defective product, please contact our customer support team immediately. We will arrange for a replacement or offer a refund, depending on the situation.
                        </p>
                        <p>
                            Please note that our return policy may be subject to change without prior notice. We encourage you to review the return policy page on our website for the most up-to-date information.
                        </p>
                        <p>
                            If you have any questions or concerns regarding our return policy, please contact us at <span className='text-primary fw-bold'>support@sparetrade.com</span>.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default ReturnPolicy; 