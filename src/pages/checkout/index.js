import React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import { useSelector } from 'react-redux'
import httpCommon from '@/http-common'
import { useState } from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Link from 'next/link'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


const Checkout = () => {
  const [open, setOpen] = React.useState(false);
  const data = useSelector(state => state.checkoutData)
  const [pin, setPin] = useState("");
  const [checkoutData, setCheckoutData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    address: "",
    address2: "",
    state: "",
    city: ""
  })
  let data1 = data?.map(c1 => ({ totPrice: c1?.MRP * c1?.quantity }));

  const handleChange = (e) => {
    const { currentTarget: input } = e;
    let checkoutData1 = { ...checkoutData };
    checkoutData1[input.name] = input.value;
    setCheckoutData(checkoutData1);
  }
  const getStateAndCity = async (pin) => {
    try {
      let response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
      let { data } = response;
      setCheckoutData({ ...checkoutData, state: data[0].PostOffice[0].State, city: data[0].PostOffice[0].District });
    } catch (err) {
      console.log(err);
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);

  };

  const handlePin = (e) => {
    setPin(e.currentTarget.value)
    getStateAndCity(e.currentTarget.value);
  };

  let { firstName, lastName, contact, email, address, address2, state, city } = checkoutData;
  return (
    <>
      <div className='bg-light'>
        <div className='container pt-5'>

          <p className="lead text-center">
            <h2>Checkout form</h2>
          </p>
          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <span className="badge badge-primary badge-pill">3</span>
              </h4>
              <ul className="list-group mb-3">
                {data?.map((d1, i) =>
                  <li key={i} className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">{d1?.sparePartName}</h6>
                      <small className="text-muted">Quantity : {d1?.quantity}</small>
                    </div>
                    <span className="text-muted">RS.{d1?.MRP * d1?.quantity}</span>
                  </li>)}
                {/* <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">Second product</h6>
                    <small className="text-muted">Brief description</small>
                  </div>
                  <span className="text-muted">$8</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">Third item</h6>
                    <small className="text-muted">Brief description</small>
                  </div>
                  <span className="text-muted">$5</span>
                </li> */}
                {/* <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">
                    <h6 className="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span className="text-success">-$5</span>
                </li> */}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (INR)</span>
                  <strong>RS.{data1?.reduce((acc, curr) => acc + curr.totPrice, 0)}</strong>
                </li>
              </ul>
              {/* <form className="card p-2">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Promo code"
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-secondary">
                      Redeem
                    </button>
                  </div>
                </div>
              </form> */}
            </div>
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Billing address</h4>
              <form  >
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName">First name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder=""
                      defaultValue=""
                      name='firstName'
                      value={firstName}
                      onChange={handleChange}
                      required=""
                    />
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName">Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder=""
                      defaultValue=""
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                      required=""
                    />
                    <div className="invalid-feedback">Valid last name is required.</div>
                  </div>
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="username">Username</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">@</span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Username"
                      required=""
                    />
                    <div className="invalid-feedback" style={{ width: "100%" }}>
                      Your username is required.
                    </div>
                  </div>
                </div> */}
                <div className='row'>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email">
                      Contact No. <span className="text-muted"></span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contact"
                      placeholder=""
                      name="contact"
                      value={contact}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email">
                      Email <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="you@example.com"
                      name="email"
                      value={email}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    name="address"
                    value={address}
                    onChange={handleChange}
                    required=""
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="address2">
                    Address 2 <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder="Apartment or suite"
                    name='address2'
                    value={address2}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zip">Pin</label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      name='pin'
                      value={pin}
                      placeholder=""
                      required=""
                      onChange={(e) => handlePin(e)}
                    />
                    <div className="invalid-feedback">Zip code required.</div>
                  </div>
                  <div className="col-md-5 mb-3">
                    <label htmlFor="country">State</label>
                    <select
                      className="form-select d-block w-100"
                      id="country"
                      required=""
                      name="state"
                      value={state}
                    >
                      <option value="">Choose...</option>
                      <option>{state}</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="state">City</label>
                    <select
                      className="form-select d-block w-100"
                      id="city"
                      required=""
                      name="city"
                      value={city}
                    >
                      <option value="">Choose...</option>
                      <option>{city}</option>
                    </select>
                    <div className="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>

                </div>
                <hr className="mb-4" />
                <div className="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="same-address"
                  />
                  <label className="form-check-label" htmlFor="same-address">
                    Shipping address is the same as my billing address
                  </label>
                </div>
                <div className="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="save-info"
                  />
                  <label className="form-check-label" htmlFor="save-info">
                    Save this information for next time
                  </label>
                </div>
                <hr className="mb-4" />
                <Button variant='contained' onClick={handleClickOpen}>
                  Continue to checkout
                </Button>
              </form>
            </div>
          </div>
          <footer className="my-5 pt-5 text-muted text-center text-small">
            <p className="mb-1">©2022-2023 SpareTrade</p>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#">Privacy</a>
              </li>
              <li className="list-inline-item">
                <a href="#">Terms</a>
              </li>
              <li className="list-inline-item">
                <a href="#">Support</a>
              </li>
            </ul>
          </footer>
        </div>
      </div>
      <div>

        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >

          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Your Order
          </BootstrapDialogTitle>
          <DialogContent >
            <Grid className="mb-3 ">

              <Grid item sm={12} md={12}>
                <div className="w-100 d-flex justify-content-center align-items-center">
                  <div className=''>
                    <div className="mb-4 text-center">
                      <TaskAltIcon color='success' sx={{ fontSize: "100px" }} />
                    </div>
                    <div className="ms-2 me-2 text-center">
                      <h1>Thank you for your order!</h1>
                      We’re working hard to get it shipped to you. Hang tight!
                    </div>

                    <div className="ms-5 mt-3 me-5">
                      <h3 className=''>Order Details :</h3>
                      {data?.map((d1, i) =>
                        <div key={i} className='border mb-2 p-3' >

                          <div className=''>  <span className='fw-bold'> OrderId :</span> {d1?.orderId} </div>
                          <div className=' '>  <span className='fw-bold'> Product Name :</span>  {d1?.sparePartName} </div>
                          <div className=' '>  <span className='fw-bold'> Quantity :</span>  {d1?.quantity} </div>
                          <div className=' '> <span className='fw-bold'> Price :</span> Rs. {d1?.MRP * d1?.quantity} </div>
                        </div >)}
                    </div >
                    <div className="text-center mt-3">
                      <Link href="/" className='text-decoration-none'> <button className="btn btn-primary"> Back to home</button></Link>
                    </div>
                  </div>
                </div>
              </Grid>

            </Grid>
          </DialogContent>

        </BootstrapDialog>
      </div >
    </>

  )
}

export default Checkout;