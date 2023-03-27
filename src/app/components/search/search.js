import React from 'react'

const Search = () => {

  return (
    <div className='container'>
    <div className='d-flex justify-content-center mt-5'><img src='https://lybley.com/APP/assets/backend/assets/images/text_only.png' height="100" width="300" className='' /></div>
    <div className='row mt-5'>
      <div className='col-2'></div>
      <div className='col-8'> 
        <div className='form-group'>
       <div className='d-flex justify-content-between'> <input type="text" className='form-control' placeholder='Search'/>  <button className='btn btn-primary ms-2'>Search</button></div>
        </div>       
        </div>
      <div className='col-2'></div>
    </div>
    </div>
  )
}


export default Search;