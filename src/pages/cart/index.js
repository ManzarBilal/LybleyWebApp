import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Badge, Grid, TextField, Typography } from '@mui/material';
import style from "../login/login.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpCommon from '@/http-common';


import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { deleteCart, getCartItems, handleQuantity } from '@/redux/actions/addToCart';
import { decrement } from '@/redux/actions';
import { handleCheckout } from '@/redux/actions/checkout';
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

export default function Cart(props) {
    let dispatch=useDispatch();
    const showToastMessage = (data) => {
        // console.log(data?.status)
        if (data?.status === true)
            toast.success(`${data?.msg}!`, {
                position: toast.POSITION.TOP_CENTER
            });
        else {
            toast.error(`${data?.msg}!`, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const [randomValue, setRandomValue] = React.useState(props?.randomValue)
    const qty = useSelector(state => state?.value);
    const cartItems=useSelector(state=>state?.cartItems);
    const router=useRouter()
    console.log(cartItems);

    const [cartItem, setCartItems] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const {user}=props;
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        getCartItems()
    }, [props?.randomValue])
     
    const getCartItems = async () => {
        try {
            let userId = localStorage.getItem("userId")
            let response = await httpCommon.get(`/getCartItemsById/${userId}`);
            let { data } = response;
            setCartItems(data)
            // showToastMessage(data)
        } catch (err) {
            console.log(err);
        }
    }

    const removeCartItems = async (id) => {
        console.log(id);
        try {
            let response = await httpCommon.deleteData(`/deleteCartItemBy/${id}`);
            let { data } = response;
            setCartItems(data)
            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x);
            getCartItems()
            showToastMessage(data)
        } catch (err) {
            console.log(err);
        }
    }

    const checkout=()=>{
        if(user){
        dispatch(handleCheckout(cartItems));
        setOpen(false);
        router.push("/checkout");
        }else{
            props?.onSubmit(true);
        }
    }
    console.warn("hello")
    var totalPrice=0;
    let tot= cartItems && cartItems.length>0 ? cartItems?.map(c1=>({totPrice:c1?.MRP*c1?.quantity,tech:c1?.technician})): [];

    console.log("cartItem",cartItem);
    return (
        <div>
            <Button onClick={handleClickOpen} >
                <div className='d-flex'>
                <div   className={props?.detail ? "ms-4 p-1 text-white fw-bold d-flex" : "d-flex ms-4 p-1 text-white fw-bold"} >
                    <div className='me-2'>Cart</div>
                    
                </div>
                <div className='pt-2 me-2 text-white fw-bold'>
                    <Badge  badgeContent={cartItems && cartItems.length>0 ?cartItems?.reduce((acc,curr)=> acc+curr?.quantity , 0):"0"} color='secondary'>
                        <ShoppingCartIcon  color={props?.detail ? "" : "white"} />
                    </Badge>
                    </div>
                    </div>
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Cart Item ({cartItems && cartItems.length>0 ?cartItems?.reduce((acc,curr)=> acc+curr?.quantity , 0):"0"})
                </BootstrapDialogTitle>
                <DialogContent >
                    <Grid className={`${style.mainDiv}`}>

                        {cartItems && cartItems.length > 0 ? cartItems?.map((item, i) => {
                            totalPrice +=+item?.MRP;
                            return (
                            <>
                                <Grid item sm={12} md={12} key={i}>
                                    <div key={'ffff'} className="card border-1 mb-1">
                                        <div className="card-body d-flex align-items-center flex-column flex-md-row">
                                            <div>
                                                <img className="rounded img-fluid" src={item?.sparePartImage} alt="" style={{ height: "100px",width:"140px" }} />
                                            </div>
                                            <div className="ms-md-4 m-0 mt-4 mt-md-0 text-md-start text-center w-100">
                                                {/* <div><h6 className="mb-3 fw-bold"> product Name<span className="text-muted small fw-light d-block">description</span></h6></div> */}
                                                <div className="d-flex flex-row flex-wrap align-items-center justify-content-between justify-content-md-between">
                                                    <div className="pe-xl-5 pe-md-4 ps-md-0 px-3 mb-2">
                                                        <div className=""> {item?.sparePartName}</div>
                                                        {/* <strong>12:30pm</strong> */}
                                                        <div className='mt-2'>
                                                            <button className='btn btn-danger btn-sm me-2' onClick={()=>dispatch(handleQuantity({sparePartId:item?.sparePartId,quantity:-1,MRP:-item?.MRP}))} >-</button> <span className='text-dark'> {item?.quantity} </span> <button className='btn btn-success btn-sm ms-2' onClick={()=>dispatch(handleQuantity({sparePartId:item?.sparePartId,quantity:1,MRP:item?.MRP}))}  >+</button>
                                                        </div>
                                                    </div>

                                                    <div className=' ' >
                                                        <div className="">MRP</div>
                                                        <div className='mt-2'> <strong>Rs. {(item?.MRP *item?.quantity)+ (+item?.technician)} </strong>  </div>
                                                        <div className='d-flex justify-content-center' ><button className='btn btn-danger btn-sm' onClick={() => dispatch(deleteCart({sparePartId:item?.sparePartId}))} >Remove</button> </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </>
                            )
                        })

                            :
                            <Grid item sm={12} md={12}>
                                <div className='text-center'>Your Cart is empty please add to cart</div>
                            </Grid>
                        }
                        <Grid item sm={12} md={12}>
                            <div className='p-3 d-flex justify-content-between' >
                                <div className='fw-bold' >TOTAL</div>
                                <div className='fw-bold'>Rs. {tot && tot.length>0 ? tot?.reduce((acc,curr)=> ((acc+curr?.totPrice+(+curr?.tech))) , 0):"0"} </div>
                            </div>
                        </Grid>

                        <Grid item sm={12} md={12}  >

                            <div className='row '>
                                <div className=' col-12 mb-2 d-flex justify-content-between'>
                                    <Button size='small' variant='contained' color='secondary' autoFocus onClick={handleClose}>
                                        CANCEL
                                    </Button>
                                   {cartItems?.length>0 ? <Button className='ms-md-4' size='small' variant='contained' autoFocus onClick={checkout} >
                                        Buy Now
                                    </Button> : ""}
                                </div>
                            </div>
                            <ToastContainer />

                        </Grid>

                    </Grid>

                </DialogContent>

            </BootstrapDialog>

        </div>
    );
}