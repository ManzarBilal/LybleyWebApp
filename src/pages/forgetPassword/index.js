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
import { Grid, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import style from "./forget.module.css";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { userEmail } from '@/redux/actions/userEmail';
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

export default function ForgetPassword(props) {
    const [open, setOpen] = React.useState(false);
    const [emailOtp, setEmailOtp] = React.useState(true);
    const [getOtp, setGetOtp] = React.useState(false);
    const [cngPass, setCngPass] = React.useState(false);
    const [showIcon1, setShowIcon1] = React.useState(true);
    const [showIcon2, setShowIcon2] = React.useState(true);
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const handleChange = (newValue) => {
        setOtp(newValue)
    }

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

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        props.onSubmit(false);
    };
    const passwordVisibility1 = () => {
        let type1 = document.getElementById("pass1");
        if (type1?.type === "password") {
            document.getElementById("pass1").type = "text";
            setShowIcon1(false)
        } else {
            document.getElementById("pass1").type = "password"
            setShowIcon1(true);
        }
    }
    const passwordVisibility2 = () => {
        let type1 = document.getElementById("pass2");
        if (type1?.type === "password") {
            document.getElementById("pass2").type = "text";
            setShowIcon2(false)
        } else {
            document.getElementById("pass2").type = "password"
            setShowIcon2(true);
        }
    }

   
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    });
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const userData = useSelector(state => state?.userEmail)

    const verifyOtp = async (regVerify) => {
        try {
            let response = await httpCommon.patch("/otpVerification", regVerify);
            let { data } = response;
            showToastMessage(data)
            if (data?.status === true) {
                setGetOtp(false)
                setCngPass(true)

            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
        }
    }

    const reSendOtp = async (resendOtp, bool) => {
        // console.log("inside resendOtp");
        try {
            let response = await httpCommon.post("/resendOtp", resendOtp);
            let { data } = response;
            // console.log(data,bool);
            if (bool === true) {
                showToastMessage(data)
                if (data?.status === true) {
                    setGetOtp(true)
                    setEmailOtp(false)
                }
            }
            else {
                showToastMessage(data)
            }
            
        } catch (err) {
            console.log(err);
        }
    }
    const handleVerify = () => {
        const obj = { email: userData?.email, otp: otp }
        verifyOtp(obj);
    }
``
    const changePassword = async (data1) => {
        try {
            let response = await httpCommon.patch("/forgetPassword", { email: userData?.email, password: data1?.password });
            let { data } = response;
            if (data?.status === true) {
                showToastMessage(data);
                setOpen(false);
                props.onSubmit(false);
                props.onSubmit1(true);
            } else {
                showToastMessage(data);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handlePassword=data=>{
          changePassword(data)
    }

    const handleResend = () => {
        const obj = { email: userData?.email }
        let bool = false
        reSendOtp(obj, bool)
    }
    const handleGetOtp = data => {
        // console.log("inside handleGetOtp",data);
        let bool = true
        reSendOtp(data,bool );
        dispatch(userEmail(data?.email));
    }
    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Forget Password
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={props?.bool}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Forget Password
                </BootstrapDialogTitle>
                <DialogContent >

                    <Grid className={`${style.mainDiv} mb-3`}>
                        <Grid item sm={12} md={12}>
                            <div className=' d-flex justify-content-center  '>  <img src='https://thumbs.dreamstime.com/z/login-icon-button-vector-illustration-isolated-white-background-127000355.jpg' height="100" width="100" /></div>
                        </Grid>
                        {cngPass ? <div>
                            <Grid item sm={12} md={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="pass1"
                                    label="New Password"
                                    type="password"
                                    fullWidth
                                    variant="outlined"
                                    size='small'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {showIcon1 ? <VisibilityOffIcon onClick={passwordVisibility1} /> : <VisibilityIcon onClick={passwordVisibility1} />}
                                            </InputAdornment>
                                        ),
                                        // endAdornment: (
                                        //     <InputAdornment position="end">
                                        //         <VisibilityOffIcon />
                                        //     </InputAdornment>
                                        // ),
                                    }}
                                    {...register('password')}
                                    error={errors.password ? true : false}
                                />
                                <Typography variant="inherit" color="red">
                                    {errors.password?.message}
                                </Typography>

                            </Grid>
                            <Grid item sm={12} md={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="pass2"
                                    label="Confirm Password"
                                    type="password"
                                    fullWidth
                                    variant="outlined"
                                    size='small'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {showIcon2 ? <VisibilityOffIcon onClick={passwordVisibility2} /> : <VisibilityIcon onClick={passwordVisibility2} />}
                                            </InputAdornment>
                                        ),
                                        // endAdornment: (
                                        //     <InputAdornment position="end">
                                        //         <VisibilityOffIcon />
                                        //     </InputAdornment>
                                        // ),
                                    }}
                                    {...register('confirmPassword')}
                                    error={errors.confirmPassword ? true : false}
                                />
                                <Typography variant="inherit" color="red">
                                    {errors.confirmPassword?.message}
                                </Typography>
                            </Grid>
                            <Grid item sm={12} md={12} mt={5} sx={{ display: "flex", justifyContent: "space-between" }}>

                                <Button variant='contained' color='secondary' autoFocus onClick={handleClose}>
                                    CANCEL
                                </Button>
                                <Button className='ms-md-2 ' variant='contained' autoFocus onClick={handleSubmit(handlePassword)}>
                                    Change Password
                                </Button>

                            </Grid>
                        </div>
                            : ""
                        }
                        {emailOtp ? <div>
                             <GetEmailOtp handleClose={handleClose} handleGetOtp={handleGetOtp} />
                        </div>
                            : ""}
                        {getOtp ? <div>
                            <Grid item sm={12} md={12} mt={5} sx={{ display: "flex", justifyContent: "center" }}>
                                <MuiOtpInput value={otp} length={6} onChange={handleChange} />
                            </Grid>
                            <Grid item sm={12} md={12} mt={5} sx={{ display: "flex", justifyContent: "space-between" }}>

                                <Button variant='contained' color='secondary' autoFocus onClick={handleResend}>
                                    Re send
                                </Button>

                                <Button variant='contained' autoFocus onClick={handleVerify} >
                                    Verify
                                </Button>
                            </Grid>
                        </div>
                            : ""}
                    </Grid>

                </DialogContent>

            </BootstrapDialog>
        </div >
    );
}

function GetEmailOtp(props){

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
      
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    return(

        <form>

        <Grid item sm={12} md={12}>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                size='small'
                {...register('email')}
                error={errors.email ? true : false}
            />
            <Typography variant="inherit" color="red">
                {errors.email?.message}
            </Typography>
        </Grid>
        <Grid item sm={12} md={12} mt={5} sx={{ display: "flex", justifyContent: "space-between" }}>

            <Button variant='contained' color='secondary' autoFocus onClick={props?.handleClose}>
                CANCEL
            </Button>
            <Button className='ms-md-2 ' variant='contained' autoFocus onClick={handleSubmit(props?.handleGetOtp)} >
                Get Otp
            </Button>

        </Grid>
        </form>
    )
}