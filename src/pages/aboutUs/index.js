import React, { useState } from 'react'
import Header from '../header';
import Footer from '../footer';

const AboutUs = () => {


  return (
    <div  className='bg-light'>
      <Header />
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-12 col-md-4 d-flex align-items-center '><img src="https://kewlmotors.com/wp-content/uploads/2021/06/about-kewl-motors.png" alt="logo"  className=' img-fluid' /></div>
          <div className='col-12 col-md-8'>
            <h1 className='mt-3 fw-bold'>About Us</h1>
            <hr className='border border-5 border-secondary' />
            <p className='text-justify'>
              Welcome to SpareTrade – the ultimate online spare parts destination that connects customers directly with brands. Our goal is to simplify the process of finding and purchasing genuine spare parts for your appliances, electronics, and vehicles.
            </p>
            <p>
              At SpareTrade, we understand the importance of using high-quality, authentic spare parts for repairs and maintenance. That's why we've created an online platform that connects you directly with brands, ensuring that you get the authentic spare parts you need.
            </p>
            <p>
              Our platform offers a wide range of spare parts for various products, including refrigerators, air conditioners, washing machines, televisions, mobile phones, laptops, and vehicles, among others. We work closely with brands to source only the highest quality and most reliable spare parts that are compatible with your product.
            </p>
            <p>
              Our user-friendly platform is designed to make your shopping experience as smooth and hassle-free as possible. You can easily browse through our extensive catalog of spare parts, filter your search by brand, model, or product category, and purchase directly from the brand with just a few clicks. Our secure payment options and reliable delivery services ensure that you get your spare parts quickly and without any hassle.
            </p>
            <p>
              At SpareTrade, we are committed to providing exceptional customer service. Our dedicated customer support team is always available to assist you with any queries or concerns you may have. We strive to provide a seamless and hassle-free shopping experience for all our customers.
            </p>
            <p>
              We believe that genuine spare parts are the key to maintaining the quality and performance of your products. At SpareTrade, we are passionate about providing customers with access to high-quality spare parts, direct from the brand, at an affordable price. Join us in our mission to make the world of spare parts more transparent, accessible, and reliable!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default AboutUs; 