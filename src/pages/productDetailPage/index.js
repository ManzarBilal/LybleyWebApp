import 'bootstrap/dist/css/bootstrap.min.css';
import OculusVR from './OculusVR';
import ProgressBar from './ProgressBar';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import ReviewDiscription from './ReviewDiscription';
import Discription from './Discription';
import About from './About';
import React, { useEffect, useRef, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import Header from '../header';
import Footer from '../footer';
import style from "../common.module.css"
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, setOne } from "../../redux/actions/index"
import { useRouter } from 'next/router';
import { addToCart, addCart } from '@/redux/actions/addToCart';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import { handleCheckout } from '@/redux/actions/checkout';
import AlertDialog from "./dialog";
import httpCommon from '@/http-common';
import ReactPlayer from 'react-player';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import ReceiptIcon from '@mui/icons-material/Receipt';

function ProductDetail (props){


  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const allSpareParts = useSelector(state => state?.spareParrts);
  const qty = useSelector(state => state?.value);
  const [technician, setTechnician] = useState(0);
  const [randomValue, setRandomValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cartValue, setCartValue] = useState(false)
  const [cart, setCart] = useState(null);
  const [user, setUser] = useState("");
  const [check, setCheck] = useState("");
  const [userData, setUserdata] = useState({});
  const [userDetail, setUserDetail] = useState({});
  const [videoUrl, setVideoUrl] = useState([])
  const [hasWindow, setHasWindow] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminProduct, setAdminProduct] = useState({});
  const [product, setProduct] = useState(false)
  const getVideos = async () => {
    try {
      let response = await httpCommon.get("/getAllVideos");
      let { data } = response;
      setVideoUrl(data);
    } catch (err) {
      console.log(err);
    }
  }
  const router = useRouter()
  const { id } = router.query;

  const discountSpareParts = (userDetail?.role === "Reseller" && userDetail?.discount === "VERIFIED") ? allSpareParts.map(s1 => ({ ...s1, bestPrice: +(s1?.bestPrice - ((10 / 100) * (+s1?.bestPrice)))?.toFixed(0) })) : allSpareParts;
//   const getSparePart =   discountSpareParts?.find(f => f?._id === id);
  const getSparePart = (product === true) ? adminProduct : discountSpareParts?.find(f => f?._id === id);


  console.log("allSpareparts",allSpareParts);

  useEffect(() => {
    const user = localStorage.getItem("user");
    let obj = JSON.parse(user)
    setUserdata(obj);
    dispatch(setOne(1));
    setUser("technician");
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }

    getVideos()
    getAdminDetail();
    getUser(obj?._id);
  }, [dispatch, id]);


  const [loading, setLoading] = useState(false);


  // console.log(getSparePart);
  const playerRef = useRef(null);

  let sp = allSpareParts?.find((sp1, index) => index === 0);
  let videoUrl1 = videoUrl?.filter(v1 => v1.productModel === sp?.productModel);

  const [mainImage, setMainImage] = useState(getSparePart?.images[0]);

  const getUser = async (_id) => {
    try {
      let response = await httpCommon.get(`/userDetail/${_id}`);
      let { data } = response;
      setUserDetail(data);
    } catch (err) {
      console.log(err);
    }
  }

  const getAdminDetail = async () => {
    try {
      let response = await httpCommon.get("/getAdminDetail");
      let { data } = response;
      setAdminId(data?._id);
      let response1 = await httpCommon.post("/getSparePartByAdminId", { id: data?._id, partName: getSparePart?.partName })
      setAdminProduct(response1?.data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleAddToCart = (id, bool) => {
    let data = discountSpareParts?.find(f => f?._id === id);
    let tech = bool ? data?.technician : technician;
    const userId = localStorage.getItem("userId");
    let obj = { userId: userId, brandId: data?.userId, skuNo: data?.skuNo, length: data?.length, weight: data?.weight, breadth: data?.breadth, height: data?.height, sparePartId: data?._id, MRP: data?.bestPrice, technician: tech, sparePartModel: data?.productModel, sparePartCategory: data?.category, sparePartName: data?.partName, sparePartImage: data?.images[0], quantity: qty }
    // console.log("obj",obj);
    if (user && tech === 0) {
      setCartValue(true);
      setCart(obj);
      setDialogOpen(true);
    } else {
      dispatch(addCart(obj));
      let x = Math.floor((Math.random() * 5));
      setRandomValue(x);
    }
  }

  const handleBuy = (e, bool) => {
    const userId = localStorage.getItem("userId")
    setCheck("BUY");
    let tech = bool ? getSparePart?.technician : technician;
    if (userId) {
      let obj = { userId: userId, brandId: getSparePart?.userId, skuNo: getSparePart?.skuNo, length: getSparePart?.length, weight: getSparePart?.weight, breadth: getSparePart?.breadth, height: getSparePart?.height, sparePartId: getSparePart?._id, MRP: getSparePart?.bestPrice, technician: tech, sparePartModel: getSparePart?.productModel, sparePartCategory: getSparePart?.category, sparePartName: getSparePart?.partName, sparePartImage: getSparePart?.images[0], quantity: qty }
      dispatch(handleCheckout([obj]));
      if (user && tech === 0) {
        setDialogOpen(true);
      } else {
        router.push("/checkout");
      }
    } else {
      setShowLogin(true);
    }
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setUser("");
    router.push("/checkout");
  }

  const handleCheckbox = (val) => {
    if (technician === 0) {
      setTechnician(val)
    } else {
      setTechnician(0)
    }
  }

  const handleClose = (e) => {
    setTechnician(true);
    setUser("");
    if (check === "BUY") {
      let bool = true;
      handleBuy(e, bool);
      router.push("/checkout");
    } else {
      let bool = true;
      handleAddToCart(getSparePart?._id, bool);
    }
    setCheck("");
    setDialogOpen(false);
    setUser("");
  }

  const handleCloseCart = () => {
    setDialogOpen(false);
    setUser("");
    dispatch(addCart(cart));
    setCartValue(false);
    setCart(null);
  }

        return (
            <>
             {(user && <AlertDialog open={dialogOpen} handleClose={handleClose} onCloseNo={cartValue ? handleCloseCart : handleCloseDialog} />)}
            <Header bool={showLogin} setShowLogin={setShowLogin} randomValue={randomValue} detail={true} />
            <div className="bg-light">
                <div className='container'>
                <div className="row g-3 mb-3">
                    <h2 className='mt-5 fw-bold'>Product Detail</h2>
                    <OculusVR handleBuy={handleBuy} handleAddToCart={handleAddToCart} handleCheckbox={handleCheckbox} technician={technician} qty={qty} mainImage={mainImage} getSparePart={getSparePart} setMainImage={setMainImage} />
                </div>
                <div className='row mt-5 bg-white align-items-center ' >
            <div className='col-md-4 col-12 d-flex justify-content-md-center fw-bold pt-4 pb-4' >
              <div> <LocalShippingIcon fontSize='large' color='primary' /> </div><div className='ms-2 pt-1'>Dispatch within 1 day</div>
            </div>
            <div className='col-md-5 col-12  d-flex justify-content-md-center fw-bold pt-md-4 pb-4' >
              <div><AssignmentReturnIcon fontSize='large' color='primary' /> </div><div className='ms-2 pt-1'>3 Days Assured Return</div>
            </div>
            <div className='col-md-3 col-12  d-flex justify-content-md-center fw-bold pt-md-4 pb-4' >
              <div><ReceiptIcon fontSize='large' color='primary' /> </div><div className='ms-2 pt-1'>GST invoice</div>
            </div>
          </div>

       {product ===false && adminProduct?.length>0 ? 
        <div className='col-md-12 mt-5'>
          <h2 className='mb-3 fw-bold'><u>Compactible Product</u></h2>

          <div className="col-lg-3 col-md-6 col-6 d-flex justify-content-center mb-4"  >

            <div className={`${style.cardHeaderH} card border-0`} style={{ cursor: "pointer" }} onClick={() =>{ setProduct(true);setMainImage(adminProduct?.images?.filter((img, i) => i === 0)) }}>
              <img src={adminProduct?.images?.filter((img, i) => i === 0)} className={`${style.productDtlCard} card-img-top`} alt="..." />
              <div className="card-body"  >
                <div className={`${style.productDtlCardFnttitle}`}>{adminProduct?.partName}</div>

                <div className={`${style.productDtlCardFnt} card-text`}>{"Best Price - " + adminProduct?.bestPrice + " INR"}</div>
                <div className={`${style.productDtlCardFnt} text-muted text-decoration-line-through`}>{"MRP - " + adminProduct?.MRP + " INR"}</div>
              </div>
            </div>

          </div>
        </div>
        :""}

        <div className='col-md-12'>
         
          <div className='mt-5 '>
            <div><h2 className=' fw-bold'>DIY VIDEO</h2></div>
            <div className='row mt-3'>
              {videoUrl1.length === 0 ? <div className='col-12  d-flex justify-content-center   fw-bold pt-5  pb-5 bg-dark text-white'> No Data available  </div>
                : videoUrl1?.map((url, i) => (<div className='col-md-3 col-12 mb-3' key={i}>
                  {hasWindow && <ReactPlayer ref={playerRef} url={url?.video} controls height="250" width="200" />}
                </div>))
              }
            </div>
          </div>
        </div>
                <div className="row g-3 mb-3 mt-5">
                    <div className="col-md-12">
                        <Tab.Container defaultActiveKey="first" className="card">
                            <Row>
                                <Col sm={12}>
                                    <Nav className="nav nav-tabs tab-body-header rounded  d-inline-flex mb-3" role="tablist">
                                        <Nav.Item className="nav-item"><Nav.Link eventKey="first" className="nav-link " data-bs-toggle="tab" href="#review" role="tab">Reviews</Nav.Link></Nav.Item>
                                        <Nav.Item className="nav-item"><Nav.Link eventKey="second" className="nav-link" data-bs-toggle="tab" href="#descriptions" role="tab">Descriptions</Nav.Link></Nav.Item>
                                        <Nav.Item className="nav-item"><Nav.Link eventKey="third" className="nav-link" data-bs-toggle="tab" href="#about" role="tab">About</Nav.Link></Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={12}>
                                    <Tab.Content className="tab-content">
                                        <Tab.Pane eventKey="first" className="tab-pane fade show" id="review">
                                            <div className="row clearfix g-3">
                                                    <div className="col-lg-4 col-md-12">
                                                        <div className="feedback-info sticky-top1">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <ProgressBar />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-8 col-md-12">
                                                        <ReviewDiscription />
                                                        <nav aria-label="...">
                                                            <ul className="pagination justify-content-end">
                                                                <li className="page-item disabled">
                                                                    <span className="page-link">Previous</span>
                                                                </li>
                                                                <li className="page-item"><a className="page-link" href='#!'>1</a></li>
                                                                <li className="page-item active" aria-current="page">
                                                                    <span className="page-link">2</span>
                                                                </li>
                                                                <li className="page-item"><a className="page-link" href='#!'>3</a></li>
                                                                <li className="page-item">
                                                                    <a className="page-link" href='#!'>Next</a>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                    </div>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second" className="tab-pane fade show" id="descriptions">
                                            <div className='card'>
                                                <div className="card-body">
                                                    <Discription />
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="third" className="tab-pane fade show" id="about">
                                            <div className='card'>
                                                <div className="card-body">
                                                    <About />
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
                </div>
                </div>
            </div>
            <Footer />
            </>
        )
    }
export default ProductDetail;