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
import style from "./login.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userLog } from '@/redux/actions/userLogin';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpCommon from '@/http-common';
import { userEmail } from '@/redux/actions/userEmail';


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

export default function Login(props) {

    const showToastMessage = (data) => {
        // console.log(data?.status)
        if (data?.status === true)
            toast.success(`${data?.msg}!`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000
            });
        else {
            toast.error(`${data?.msg}!`, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(props?.bool);
    const [showIcon, setShowIcon] = React.useState(true);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        props.onSubmit(false);
    };
    const passwordVisibility = () => {
        let type = document.getElementById("password");
        if (type?.type === "password") {
            document.getElementById("password").type = "text";
            setShowIcon(false)
        } else {
            document.getElementById("password").type = "password"
            setShowIcon(true);
        }
    }
    const handleForget = () => {
        props.onSubmit(false);
        props.onForget(true);
    }

    const userData = useSelector(state => state?.users)

    const login = async (obj) => {
        try {
            let response = await httpCommon.post("/userPhoneLogin", obj);
            let { data } = response;
            // if(data?.user?.status==="ACTIVE"){
            // window.location.reload(false);
            // localStorage.setItem("userId",data?.user?._id);
            // localStorage.setItem("userName",data?.user?.name);
            // localStorage.setItem("user",JSON.stringify(data?.user));
            // props.onSubmit(false);
            // }
            if (data?.status === true) {
                props.onSubmit1(true);
                props.onSubmit(false);
            }
            else {
                showToastMessage(data);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const handleRegister = () => {
        props.onSubmit(false);
        props?.setOpen1(true)
    }

    const submit = data => {

        let obj = { contact: +data?.contact }
        dispatch(userEmail(data?.contact));
        login(obj);

    }

    const validationSchema = Yup.object().shape({
        contact: Yup.string().required("Mobile number is required").min(10, "Min 10 digit is required").max(10, "Max 10 digit is required"),
        // email: Yup.string()
        //     .required('Email is required')
        //     .email('Email is invalid'),
        // password: Yup.string()
        //     .required('Password is required')
        //     .min(6, 'Password must be at least 6 characters')
        //     .max(40, 'Password must not exceed 40 characters'),

    });


    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    return (
        <div>
            <button className='bg-white btn btn-sm fw-bold text-dark' onClick={handleClickOpen}>
                Login
            </button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={props?.bool}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Login
                </BootstrapDialogTitle>
                <DialogContent >
                    <Grid className={`${style.mainDiv}`}>
                        <Grid item sm={12} md={12}>
                            <div className=' d-flex justify-content-center mb-2'>  <img src='/favicon.ico' height="70" width="60" /></div>
                        </Grid>
                        <Grid item sm={12} md={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Mobile number"
                                type="number"
                                fullWidth
                                variant="outlined"
                                size='small'
                                {...register('contact')}
                                error={errors.contact ? true : false}
                            />
                            <Typography variant="inherit" color="red">
                                {errors.contact?.message}
                            </Typography>
                        </Grid>
                        {/* <Grid item sm={12} md={12}>
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
                        <Grid item sm={12} md={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="password"
                                label="Password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                size='small'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {showIcon ? <VisibilityOffIcon onClick={passwordVisibility} /> : <VisibilityIcon onClick={passwordVisibility} />}
                                        </InputAdornment>
                                    ),
                                    // endAdornment: (
                                    //     <InputAdornment position="end">
                                    //         
                                    //     </InputAdornment>
                                    // ),
                                }}
                                {...register('password')}
                                error={errors.password ? true : false}
                            />
                            <Typography variant="inherit" color="red">
                                {errors.password?.message}
                            </Typography> */}
                        <Grid item sm={12} md={12} mt={5} sx={{ display: "flex", justifyContent: "space-between" }}>
                            <div className='d-flex justify-content-between1 w-100'>

                                {/* <div className={`${style.common_curs} ${style.paddTopFrgt} text-primary col-md-6 col-12 mb-3 `} onClick={handleForget}>Forget Password &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> */}

                                {/* <Button className='' variant='contained' color='secondary' autoFocus onClick={handleClose}>
                                    CANCEL
                                </Button> */}


                                <Button className='w-100' variant='contained' autoFocus onClick={handleSubmit(submit)}>
                                    SIGNIN
                                </Button>

                            </div>
                        </Grid>
                        <Grid item sm={12} md={12} mt={3} sx={{ display: "flex", justifyContent: "center" }} >
                            <Button variant='outlined' onClick={handleRegister} >Create account</Button>
                        </Grid>

                    </Grid>

                </DialogContent>

            </BootstrapDialog>

        </div>
    );
}