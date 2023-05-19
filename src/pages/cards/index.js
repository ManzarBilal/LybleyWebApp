import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import style from "../common.module.css"


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

const Cards = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
  
      <div className="card" >
        {props?.product === true ?
          <>
            <Link className='text-decoration-none' href={`/productDetail?id=${props?.id}`} >
              <img src={props.img} className={`${style.cardImage} img-fluid`}   alt="..." />
            </Link>
            <div className="card-body">
              <Link className='text-decoration-none' href={`/productDetail?id=${props?.id}`}>
                <h5 className={`${style.cardTitle} card-title`}  >{props.title}</h5>
              </Link>
              <Link className='text-decoration-none' href={`/productDetail?id=${props?.id}`}>
                <p>{props?.bestPrice}</p>
              </Link>
              <Link className='text-decoration-none' href={`/productDetail?id=${props?.id}`}> <p className='text-muted text-decoration-line-through'>{props?.mrp}</p> </Link>
              {props?.product === true ? <p className={`${style.cardTitle} card-text`} data-bs-toggle="tooltip" data-bs-placement="top" title='Click here' onClick={handleClickOpen} style={{ cursor:"pointer" }}>{props?.description?.substring(0, 30)}</p>
                : <p className={`${style.cardTitle} card-text`} data-bs-toggle="tooltip" data-bs-placement="top" title='Click here'  >{props?.description?.substring(0, 30)}</p>}
              {props.brand ? "" : <a href="#" className="btn btn-primary">{props.link}</a>}
            </div>
          </>
          :
          <>
            <img src={props?.img}  className={`${style.cardImage} img-fluid`}   alt={props?.img} />
            <div className="card-body">
              <h5 className={`${style.cardTitle} card-title ${props?.center ? "text-center" : ""}`}  >{props?.title} </h5>
              <p>{props?.bestPrice}</p>
              <p className='text-muted text-decoration-line-through'>{props?.mrp}</p>
               <p className={`${style.cardTitle} card-text`} data-bs-toggle="tooltip" data-bs-placement="top" title='Click here'  >{props?.description?.substring(0, 30)}</p> 
              {props.brand ? "" : <a href="#" className="btn btn-primary">{props.link}</a>}
            </div>
          </>
}
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>

        </BootstrapDialogTitle>
        <DialogContent >
          <h4>Description</h4>
          <div style={{textAlign:"justify"}}>{props?.description}</div>
        </DialogContent>

      </BootstrapDialog>
    </>
  )
}

export default Cards;