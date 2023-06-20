import React from 'react'
import Header from '../header'
import Search from '../search/search'
import BrandsLogo from '../brandsLogo'
import Footer from '../footer'

const Dev = () => {
  return (
    <div> 
         <Header />
      <div className='container'>
      <div className=' row d-flex justify-content-center'>
        <div className='col-12 col-md-8'>
         
            <Search />
            <BrandsLogo />
        </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dev