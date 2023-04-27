import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Header from '../header';
import Footer from '../footer';

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, setOne } from "../../redux/actions/index"
import { useRouter } from 'next/router';
import { addToCart, addCart } from '@/redux/actions/addToCart';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
const Detail = () => {
  const dispatch = useDispatch();
  const allSpareParts = useSelector(state => state?.spareParrts);
  const qty = useSelector(state => state?.value);
  const [randomValue, setRandomValue] = useState("")

  useEffect(() => {
    dispatch(setOne(1));
  }, [dispatch]);
  const router = useRouter()
  const { id } = router.query;

  const [loading, setLoading] = useState(false);

  const getSparePart = allSpareParts?.find(f => f?._id === id)


  const [mainImage, setMainImage] = useState(getSparePart?.images[0])


  const handleAddToCart = (id) => {
    let data = allSpareParts?.find(f => f?._id === id)
    const userId = localStorage.getItem("userId")
    let obj = { userId: userId, brandId: data?.userId, sparePartId: data?._id, MRP: data?.MRP, sparePartModel: data?.productModel, sparePartCategory: data?.category, sparePartName: data?.partName, sparePartImage: data?.images[0], quantity: qty }
    dispatch(addCart(obj));
    let x = Math.floor((Math.random() * 5));
    setRandomValue(x);
  }

  return (
    <div className="bg_image">
      <Header randomValue={randomValue} detail={true} />
      <div className='container'>
        <h2 className='mb-3 fw-bold'>Product Detail</h2>
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="product-details">
                <div className="row ">
                  <div className="col-lg-6 mt-3 mb-3 d-flex justify-content-between align-items-center "  >
                    <div className=" nav flex-column "  >
                      {getSparePart?.images?.map((img, i) => {
                        return <div className='border p-2 m-2' key={i}
                        >
                          <img onMouseEnter={() => setMainImage(img)} onClick={() => setMainImage(img)} role='button' height={60} width={60} src={img} alt="" />
                        </div>
                      })}
                    </div>
                    <div className="product-image pe-5">
                      <div   >
                        <img height={250} width={300} src={mainImage?.length > 0 ? mainImage : getSparePart?.images[0]} alt="" />
                      </div>
                      {/* <div className='mt-3'>
                        <button className='btn btn-success'>Book Technician to Fit It - 300 Rs Only</button>
                      </div> */}
                    </div>
                  </div>

                  <div className="col-lg-6 d-flex justify-content-between align-items-center">
                    <div className='w-100'>
                      <div> <h2 className="fw-bold fs-4"> {getSparePart?.partName}</h2></div>
                      <div> <span className="text-muted ms-3">(449 customer review)</span></div>
                      <div> <h6 className="price-title fw-bold">Price</h6>
                        <p className="sale-price">Rs. {getSparePart?.MRP} </p>
                        <p className="regular-price text-danger">$ 179 USD</p></div>
                      <div><p> {getSparePart?.description} 
                         </p></div>
                      <div> <div className="d-flex flex-wrap mb-3">
                        <div className="mt-2 mt-sm-0  me-1">
                          <div className="">
                            <button className='btn btn-outline-danger btn-sm me-2' onClick={() => dispatch(decrement(-1))}>-</button> <span className='text-dark'> {qty} </span> <button className='btn btn-outline-success btn-sm ms-2' onClick={() => dispatch(increment(1))}>+</button>
                          </div>
                        </div>

                        <ToastContainer />
                      </div></div>
                      <div className='d-flex'>
                        <div className='w-75 '> <Link href="/checkout" >
                          <button className="btn btn-warning mt-2 w-100 mt-sm-0"><i className="fa fa-heart me-1"></i> BUY</button></Link>
                        </div>
                        <div onClick={(e) => handleAddToCart(getSparePart?._id)} className="btn btn-primary mx-1 mt-2 mt-sm-0 w-75"><i className="fa fa-shopping-cart me-1"></i> Add to Cart</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Detail;