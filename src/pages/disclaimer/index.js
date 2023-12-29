import React, { useState } from 'react'
import Header from '../header';
import Footer from '../footer';

const Disclaimer = () => {


  return (
    <div className='bg-light'>
      
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-12 col-md-4 d-flex align-items-center mt-md-5 pt-md-5 h-100 '><img src="https://kewlmotors.com/wp-content/uploads/2021/06/about-kewl-motors.png" alt="logo"  className=' img-fluid' /></div>
          <div className='col-12 col-md-8'>
            <h1 className='mt-3 fw-bold'>Disclaimer</h1>
            <hr className='border border-5 border-secondary' />
            <p className='text-justify'>
            The following disclaimer outlines the terms and conditions governing the use of the SpareTrade website. By accessing and using our website, you agree to comply with these terms.
            </p>
            <p>
            Accuracy of Information: We strive to provide accurate and up-to-date information on our website. However, we do not warrant or guarantee the accuracy, completeness, or reliability of any information or content on the website. Users are advised to verify any information before making any decisions or taking any actions based on it.
            </p>
            <p>
            Product Availability: While we make every effort to ensure the availability of spare parts listed on our website, we cannot guarantee the availability of all products at all times. Product availability is subject to change without notice. In the event that a product is unavailable after an order is placed, we will notify the customer and offer alternative options or a refund.
            </p>
            <p>
            Third-Party Content: Our website may contain links to third-party websites, advertisements, or content. These links are provided for convenience and informational purposes only. We do not endorse or assume responsibility for the content, accuracy, or actions of any third-party websites. Users are encouraged to review the terms and privacy policies of any third-party websites they visit.
            </p>
            <p>
            User Responsibility: Users of the SpareTrade website are solely responsible for their use of the website and any actions taken based on the information or content found on it. We are not liable for any damages, losses, or liabilities arising from the use of our website or reliance on the information provided.
            </p>
            <p>
            Security: We take reasonable measures to ensure the security of our website and protect user information. However, we cannot guarantee the security of information transmitted over the internet. Users are responsible for implementing their own security measures, such as using secure passwords and protecting personal information.
            </p>
            <p>
            Modifications: We reserve the right to modify, update, or discontinue any part of our website or services at any time without prior notice. We may also update or modify these disclaimers and terms of use. Users are encouraged to review this page periodically for any changes.
            </p>
            <p>
            Governing Law: These disclaimers and the use of our website are governed by the laws of the jurisdiction in which SpareTrade operates.
                </p>
                <p>
                If you have any questions or concerns regarding our disclaimer or terms of use, please contact us at <span className='text-primary fw-bold'>support@sparetrade.com</span>.
                </p>
          </div>
        </div>
      </div>
      
    </div>
  )
}
export default Disclaimer; 