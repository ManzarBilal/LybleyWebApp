import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, TextField, Typography } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input'
import style from "./register.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { userVerification } from '@/redux/actions/userVerification';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpCommon from '@/http-common';

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

const OtpVerification = (props) => {

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

    const [open, setOpen] = React.useState(props?.bool);
    const [otp, setOtp] = useState('');

    const dispatch = useDispatch()
    const userEmail = useSelector(state => state?.userEmail)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        props.onSubmit1(false)

    };
    const handleChange = (newValue) => {
        setOtp(newValue)
    }

    const handleLogin = () => {
        setOpen(false);
        props.onSubmit(true);
    }

    const [userData, setUserData] = useState({});
    const verifyOtp = async (regVerify) => {
        try {
            let response = await httpCommon.patch("/otpVerification", regVerify);
            let { data } = response;
            showToastMessage(data)
            if (data?.status === true) {
                handleClose()
                handleLogin();

            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleVerify = () => {
        const obj = { email: userEmail?.email, otp: otp }
        verifyOtp(obj);
        // console.log("obj",obj)
        // dispatch(userVerification(obj))
        // showToastMessage(userData)
        // if(userData?.status===true){
        //     handleClose()
        //     handleLogin();

        // }else{
        //    return null; 
        // }
    }
    return (
        <div >
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={props?.bool}
            >

                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Otp Verification
                </BootstrapDialogTitle>
                <DialogContent className={`${style.mainDiv}`}>
                    <Grid  >
                        <Grid item sm={12} md={12}>
                            <div className=' d-flex justify-content-center  '>  <img src='https://thumbs.dreamstime.com/z/login-icon-button-vector-illustration-isolated-white-background-127000355.jpg' height="100" width="100" /></div>
                        </Grid>
                        <Grid item sm={12} md={12} mt={5} sx={{ display: "flex", justifyContent: "center" }}>
                            <MuiOtpInput value={otp} length={6} onChange={handleChange} />
                        </Grid>
                        <Grid item sm={12} md={12} mt={5} sx={{ display: "flex", justifyContent: "space-between" }}>

                            <Button variant='contained' color='secondary' autoFocus onClick={handleClose}>
                                Re send
                            </Button>

                            <Button variant='contained' autoFocus onClick={handleVerify} >
                                Verify
                            </Button>
                        </Grid>
                    </Grid>

                </DialogContent>

            </BootstrapDialog>

        </div>
    )
}

export default OtpVerification