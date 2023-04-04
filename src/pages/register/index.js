
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
import style from "./register.module.css";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { userReg } from '@/redux/actions/userRegistration';
import OtpVerification from './otpVerification';
import { userEmail } from '@/redux/actions/userEmail';
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

export default function Register(props) {

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
    const [open, setOpen] = React.useState(false);
   
    const [showIcon1, setShowIcon1] = React.useState(true);
    const [showIcon2, setShowIcon2] = React.useState(true);
    const dispatch = useDispatch();
    const data = useSelector(state => state.users);
    console.log(data);


    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleLogin = () => {
        setOpen(false);
        props.onSubmit(true);
    }
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
const userData=useSelector(state=>state?.users);

const userRegistration=async(registration)=>{
    try{
        let response= await httpCommon.post("/userRegistration", registration);
        let {data}=response;
        showToastMessage(data)
       if(data?.status===true){
        props.onSubmit1(true);
        handleClose()
       
    }else{
       return null; 
    }
    }catch(err){
        console.log(err);
    }
}
    const onSubmit = data => {
        
        let obj = { name: data?.name, email: data?.email, contact: data?.contact, password: data?.password }
        userRegistration(obj);
       // dispatch(userReg(obj));
        // showToastMessage(userData)
        dispatch(userEmail(data?.email))
        
        

    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required')
            .min(4, "Name must be at least 4 characters"),
        contact: Yup.string()
            .required('Contact No. is required')
            .min(10, 'Contact No. must be at least 10 characters')
            .max(10, 'Contact No. must not exceed 10 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
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
            
                <> <Button variant="contained" onClick={handleClickOpen}>
                    Register
                </Button>
                    <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Sign Up
                        </BootstrapDialogTitle>
                        <DialogContent >
                            <Grid className={`${style.mainDiv}`}>
                                <Grid item sm={12} md={12}>
                                    <div className=' d-flex justify-content-center  '>  <img src='https://thumbs.dreamstime.com/z/login-icon-button-vector-illustration-isolated-white-background-127000355.jpg' height="80" width="100" /></div>
                                </Grid>
                                <form  >
                                    <Grid item sm={12} md={12}>

                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="n"
                                            label="Name"
                                            type="email"
                                            fullWidth
                                            variant="outlined"
                                            size='small'
                                            name="name"

                                            onChange={(e) => handleChange(e)}
                                            {...register('name')}
                                            error={errors.name ? true : false}
                                        />
                                        <Typography variant="inherit" color="red">
                                            {errors.name?.message}
                                        </Typography>

                                    </Grid>
                                    <Grid item sm={12} md={12}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="na"
                                            size='small'
                                            label="Email Address"
                                            type="email"
                                            fullWidth
                                            name='email'
                                            variant="outlined"

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
                                            id="ame"
                                            size='small'
                                            label="Contact No."
                                            type="number"
                                            fullWidth
                                            name='contact'
                                            variant="outlined"

                                            {...register('contact')}
                                            error={errors.contact ? true : false}
                                        />
                                        <Typography variant="inherit" color="red">
                                            {errors.contact?.message}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12} md={12}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="pass1"
                                            label="Password"
                                            type="password"
                                            fullWidth
                                            size='small'
                                            variant="outlined"
                                            name='password'

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
                                            size='small'
                                            variant="outlined"
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
                                        <div className='d-flex justify-content-between w-100' >
                                            <div className='row'>
                                                <div className={`${style.common_curs} ${style.loginTxtF} ${style.paddTopAcnt}  text-primary col-md-7 col-12 mb-3`} onClick={handleLogin}> Already have an account?/SignIn  </div>
                                                <div className='col-md-5 col-12 mb-3 d-flex justify-content-between'>
                                                    <Button variant='contained' color='secondary' autoFocus onClick={handleClose}>
                                                        CANCEL
                                                    </Button>
                                                    <Button className='ms-3 ' variant='contained' autoFocus onClick={handleSubmit(onSubmit)} >
                                                        SIGNUP
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </form>
                            </Grid>
                        </DialogContent>

                    </BootstrapDialog>
                </>
                 
        
        </div>
    );
}