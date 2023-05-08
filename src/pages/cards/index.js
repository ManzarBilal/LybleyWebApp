import React from 'react'

const Cards = (props) => {
  return (
<div className="card" >
  <img src={props.img} className="card-img-top img-fluid" style={{height:"200px",width:"200px"}} alt="..." />
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className='text-muted text-decoration-line-through'>{props?.mrp}</p>
    <p className="card-text">{props.description}</p>
   {props.brand ? "" : <a href="#" className="btn btn-primary">{props.link}</a>}
  </div>
</div>
  )
}

export default Cards;