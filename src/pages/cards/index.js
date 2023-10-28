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
import VisibilityIcon from '@mui/icons-material/Visibility';

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
  <div className={`${style.cardHeaderH}`}>
      <div className= "card border-0" >
        {props?.product === true ?
          <>
          <div className='d-none d-md-block d-lg-block '>
            <Link className='text-decoration-none' href={`/productDetail?id=${props?.id}`} >
              <img src={props.img}  className={`${style.cardImage} img-fluid`}   alt= {props?.categoryName} />
            </Link>
            <div className="card-body">
              <Link className='text-decoration-none' href={`/productDetail?id=${props?.id}`}>
                <div className={`${style.cardTitle} card-title`}  >{props.title}</div>
              </Link>
              <Link className='text-decoration-none' href={`/productDetail?id=${props?.id}`}>
                <div>{props?.bestPrice}</div>
              </Link>
              <Link className='text-decoration-none' href={`/productDetail?id=${props?.id}`}> <div className='text-muted text-decoration-line-through'>{props?.mrp}</div> </Link>
              {props?.product === true ? 
              <div className={`${style.cardTitle} d-flex justify-content-between card-text`} data-bs-toggle="tooltip" data-bs-placement="top" title='Click here'>
                <div  style={{ cursor:"pointer" }}>{props?.description?.substring(0, 22)}{props?.description?.length>21 ? "..." :""}   </div>
                <div><VisibilityIcon onClick={handleClickOpen} /></div>
              </div>
                : <div className={`${style.cardTitle} card-text`} data-bs-toggle="tooltip" data-bs-placement="top" title='Click here'  >{props?.description?.substring(0, 30)}</div>}
              {props.brand ? "" : <a href="#" className="btn btn-primary">{props.link}</a>}
            </div>
            </div>
            {/* mobile view  */}
            <div  className='d-block d-md-none d-lg-none'>
            <Link className='text-decoration-none' href={`/productDetail?id=${props?.id}`} >
              <img src={props.img} className={`${style.cardImage} img-fluid`}   alt= {props?.categoryName} />
            </Link>
            <div className="card-body">
              <Link className='text-decoration-none' href={`/productDetail?id=${props?.id}`}>
                <div className={`${style.cardTitle} card-title`}  >{props.title?.substring(0, 18)}{props?.title?.length>17 ? "..." :""} </div>
              </Link>
              <Link className='text-decoration-none' href={`/productDetail?id=${props?.id}`}>
                <div>{props?.bestPrice}</div>
              </Link>
              <Link className='text-decoration-none' href={`/productDetail?id=${props?.id}`}> <div className='text-muted text-decoration-line-through'>{props?.mrp}</div> </Link>
              {props?.product === true ? 
              <div className={`${style.cardTitle} d-flex justify-content-between card-text`} data-bs-toggle="tooltip" data-bs-placement="top" title='Click here'>
                <div  style={{ cursor:"pointer" }}>{props?.description?.substring(0, 15)}{props?.description?.length>15 ? "..." :""}   </div>
                <div><VisibilityIcon onClick={handleClickOpen} /></div>
              </div>
                : <div className={`${style.cardTitle} card-text`} data-bs-toggle="tooltip" data-bs-placement="top" title='Click here'  >{props?.description?.substring(0, 18)}</div>}
              {props.brand ? "" : <a href="#" className="btn btn-primary">{props.link}</a>}
            </div>
            </div>
          </>
          :
          <>
            <img src={props?.img}  className={`${style.cardImage} img-fluid`}   alt={props?.img} />
            <div className="card-body">
              <div className={`${style.cardTitle} card-title ${props?.center ? "text-center" : ""}`}  >{props?.title} </div>
              <div>{props?.bestPrice}</div>
              <div className='text-muted text-decoration-line-through'>{props?.mrp}</div>
               <div className={`${style.cardTitle} card-text`} data-bs-toggle="tooltip" data-bs-placement="top" title='Click here'  >{props?.description?.substring(0, 30)}</div> 
              {props.brand ? "" : <a href="#" className="btn btn-primary">{props.link}</a>}
            </div>
          </>
}
      </div>
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