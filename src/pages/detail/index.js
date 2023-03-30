import React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Header from '../header';
import Footer from '../footer';
const Detail = () => {
  return (
    <div className="bg_image">
      <Header detail={true}/>

      <div className='container'>
        <div className="row">
          <div className='col-md-4 col-12 text-center'> <img src='https://5.imimg.com/data5/SELLER/Default/2021/6/ED/WN/JB/31656971/intex-air-cooler-1000x1000.png' height="350" width="300" />
            <div className='row mt-2'>
              <div className='col-md-12 col-12 text-center'>
                <button className='btn btn-light btn-sm me-2'>-</button> <span className='text-white'> 5 </span> <button className='btn btn-light btn-sm ms-2'>+</button>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-12 col-12 text-center'>
                <button className='btn btn-primary btn_width'>BUY</button> <button className='btn btn-warning btn_width'>ADD TO CART</button>
              </div>
              <div className='mt-3'>
                  <button className='btn btn-success'>Book Technician to Fit It - 300 Rs Only</button>
                </div>
            </div>
          </div>
          <div className='col-md-4 col-12 fw-bold text-white'>
            <div className='mt-5'>
              <div>MRP - 600</div>
              <div>Best Price - 300</div>
              <div>
                <h5 className='mt-3'>Product Info</h5>
                Air Coolers · Symphony Storm C-100 XL 95 Litres Tower Air Cooler (Honeycomb Pad, ACOTO412 · Hindware Calisto 105 Litres Desert Air Cooler)
                
              </div>
              
              </div>
              </div>
        </div>
       <div className='row mt-2'>
        <div className='col-9'></div>
        <div className='col-md-3 col-12'> 
        <div className='form-group'>
          <select className='form-select'>
           <option>Select Fault</option>
           <option>Option1</option>
           <option>Option2</option>
           <option>Option3</option>
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