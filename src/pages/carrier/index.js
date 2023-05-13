import React from 'react'
import Header from '../header';
import Footer from '../footer';

const Carrier = () => {
  return (
    <>
      <Header />
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-12 col-md-4 d-flex align-items-center '><img src="https://kewlmotors.com/wp-content/uploads/2021/06/about-kewl-motors.png" alt="logo" className=' img-fluid' /></div>
          <div className='col-12 col-md-8'>
            <h1 className='mt-3 fw-bold'>Join our Team</h1>
            <hr className='border border-5 border-secondary' />
            <p className='text-justify'>
              SpareTrade is a fast-growing online platform that connects customers directly with brands to purchase genuine spare parts. We are dedicated to providing the highest quality and most reliable spare parts to our customers while ensuring a seamless and user-friendly experience.
            </p>
            <p>
              We are always on the lookout for talented individuals who are passionate about our mission and values. If you are someone who is motivated, dynamic, and eager to make a difference, we invite you to join our team.
            </p>
            <p>
              Current Openings:
            </p>
            <p>
              We currently have the following openings:
            </p>
            <div>
              Software Engineer
            </div>
            <div>
              Customer Support Representative
            </div>
            <div>
              Marketing Specialist
            </div>
            <div>
              Supply Chain Coordinator
            </div>
            <p>
              If you are interested in any of these positions, please email us your resume and a cover letter explaining your interest and qualifications to <span className='text-primary fw-bold'>careers@sparetrade.com</span>.
            </p>
            <p>
              Benefits of Working at SpareTrade
            </p>

            
            <p>
              We are an equal opportunity employer and welcome diversity in our team. We believe in creating a workplace that values and respects each individual's unique perspectives and experiences.
            </p>

            <p>
              If you don't see a position that matches your skillset, but you are interested in joining our team, please feel free to send us your resume and a cover letter, and we will keep it on file for future openings.
            </p>
            <p>
              Thank you for considering SpareTrade as your next career move. We look forward to hearing from you!
            </p>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Carrier;