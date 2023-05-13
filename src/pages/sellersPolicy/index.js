import React from 'react'
import Header from '../header';
import Footer from '../footer';
 

const SellerPolicy = () => {
  return (
    <div className='bg-light'>
      <Header />
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-12 col-md-4 d-flex align-items-center mt-md-5 pt-md-5 h-100'><img src="https://kewlmotors.com/wp-content/uploads/2021/06/about-kewl-motors.png" alt="logo" className=' img-fluid' /></div>
          <div className='col-12 col-md-8'>
            <h1 className='mt-3 fw-bold'>VENDOR POLICY</h1>
            <hr className='border border-5 border-secondary' />
            <p className='text-justify'>
              This privacy policy (“Privacy Policy”) along with the Terms(hyperlinked), together constitute a legally binding Agreement between the Customer and the Company, with respect to Customer’s use of Our Services. Any terms used herein which begin with a capitalized letter shall have such meaning as assigned to it under the Customer Terms or under the respective clauses of this Privacy Policy.
            </p>
            <p>
            1.BACKGROUND
            </p>
            <p>
            1.1.At SpareTrade, accessible from <span className='text-primary'>https://www.SpareTrade.store</span> , one of Our main priorities is the privacy of Our Customers. We take the privacy of Our Customers very seriously and are committed to safeguarding their privacy while providing a personalized and valuable access to Our Platform.
            </p>
            <p>
            1.2.You agree and understand that access to Services/Platform is conditional upon Your approval of this Privacy Policy. You agree that Your use of Services includes Your consent to collection, retention and use of Your information in accordance with the terms of this Privacy Policy and as per the applicable Law.
            </p>
            
        </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default SellerPolicy;