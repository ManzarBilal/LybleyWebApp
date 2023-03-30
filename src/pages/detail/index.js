import React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Header from '../header';
import Footer from '../footer';
const Detail = () => {
  return (
    <div className="bg-light">
      <Header />

      <div className='container'>
        <div className="row">
          <div className='col-md-4 col-12 text-center'> <img src='https://5.imimg.com/data5/SELLER/Default/2021/6/ED/WN/JB/31656971/intex-air-cooler-1000x1000.png' height="350" width="300" />
            <div className='row mt-2'>
              <div className='col-md-12 col-12 text-center'>
                <button className='btn btn-danger btn-sm me-2'>-</button> 5 <button className='btn btn-success btn-sm ms-2'>+</button>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-12 col-12 text-center'>
                <button className='btn btn-primary btn_width'>BUY</button> <button className='btn btn-warning btn_width'>ADD TO CART</button>
              </div>
            </div>
          </div>
          <div className='col-md-4 col-12'>
            <div className='mt-5'>
              <div>MRP - 600</div>
              <div>Best Price - 300</div>
              <div>
                <h5 className='mt-3'>Product Info</h5>
                Air Coolers · Symphony Storm C-100 XL 95 Litres Tower Air Cooler (Honeycomb Pad, ACOTO412 · Hindware Calisto 105 Litres Desert Air Cooler)
                <div className='mt-5 text-center'>
                  <button className='btn btn-info'>Book Technician to Fit It - 300 Rs Only</button>
                </div>
              </div>
              
              </div>
              </div>
        </div>
       <div className='row mt-2'>
        <div className='col-10'></div>
        <div className='col-md-2'> 
        <div className='form-group'>
          <select className='form-select'>
           <option>Select Fault</option>
          </select>
        </div>
        </div>
       </div>
      </div>
      <Footer />
    </div>
  )
}

export default Detail;