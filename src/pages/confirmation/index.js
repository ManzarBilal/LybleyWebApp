import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import "bootstrap/dist/css/bootstrap.css"
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

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
  const router=useRouter();
  const {order}=router.query;
  console.log(order);


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
const Confirmation = () => {
    const data = useSelector(state=>state.checkoutData)
    const [open,setOpen]=useState(false);
    const handleClose = () => {
        setOpen(false);
    
      };
      useEffect(()=>{
        setOpen(true)
      },[])
  return (
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
  )
}

export default Confirmation;