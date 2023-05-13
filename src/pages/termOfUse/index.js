import React from 'react'
import Header from '../header';
import Footer from '../footer';
 

const TermOfUse = () => {
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
    
            
        </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default TermOfUse;