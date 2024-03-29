
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
import { Grid, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
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
    const [file, setFile] = React.useState(null);
    const [showIcon1, setShowIcon1] = React.useState(true);
    const [showIcon2, setShowIcon2] = React.useState(true);
    const dispatch = useDispatch();
    // const [role,setRole]=React.useState("");
    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
        props?.setOpen1(false)
    };
    const handleLogin = () => {
        setOpen(false);
        props?.setOpen1(false)
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


    const registration = (body) => {
        if (body?.role === "Service center") {
            serviceCenterRegistration(body);
        } else {
            userRegistration(body);
        }
    }

    const userRegistration = async (registration) => {
        try {
            let response = await httpCommon.post("/userRegistration", registration);
            let { data } = response;
            showToastMessage(data)
            if (data?.status === true) {
                props.onSubmit1(true);
                handleClose()

            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
        }
    }
    const serviceCenterRegistration = async (registration) => {
        try {
            const formData = new FormData();
            formData.append("name", registration?.name);
            formData.append("email", registration?.email);
            formData.append("contact", registration?.contact);
            formData.append("role", registration?.role);
            // formData.append("password", registration?.password);
            formData.append("document", file);

            let response = await httpCommon.post("/serviceCenterRegistration", formData);
            let { data } = response;
            showToastMessage(data)
            if (data?.status === true) {
                props.onSubmit1(true);
                handleClose()

            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
        }
    }


    const onSubmit = data => {

        let obj = { name: data?.name, email: data?.email, contact: data?.contact, role: data?.role }

        registration(obj);
        // dispatch(userReg(obj));
        // showToastMessage(userData)
        dispatch(userEmail(data?.contact))
    };

    const handleFileChange = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            if (e.target.name === "file") {
                // console.log(e.target.files[0]);
                setFile(e.target.files[0]);
            }
        }
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
        role: Yup.string()
            .required('Role is required'),
        // password: Yup.string()
        //     .required('Password is required')
        //     .min(6, 'Password must be at least 6 characters')
        //     .max(40, 'Password must not exceed 40 characters'),
        // confirmPassword: Yup.string()
        //     .required('Confirm Password is required')
        //     .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    });


    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const role = watch("role");

    return (
        <div>

            <> <button className='bg-white btn btn-sm fw-bold text-dark' onClick={handleClickOpen}>
                SIGNUP
            </button>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={props?.open || open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Sign Up
                    </BootstrapDialogTitle>
                    <DialogContent >
                        <Grid className={`${style.mainDiv}`}>
                            <Grid item sm={12} md={12}>
                                <div className=' d-flex justify-content-center mb-2'>  <img src='/favicon.ico' height="70" width="60" /></div>
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
                                    <FormControl fullWidth className='mt-2 mb-1'>
                                        <InputLabel id="demo-simple-select-label   " > User Role</InputLabel>
                                        <Select

                                            margin="dense"
                                            // labelId="demo-simple-select-label"
                                            // id="demo-simple-select"
                                            size='small'
                                            label="User Role"
                                            value={role}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => setRole(e.currentTarget.value)}
                                            {...register('role')}
                                            error={errors.role ? true : false}
                                        >
                
                                            <MenuItem value="End user">End user</MenuItem>
                                            <MenuItem value="Reseller">Reseller</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Typography variant="inherit" color="red">
                                        {errors.role?.message}
                                    </Typography>
                                </Grid>
                                {role === "Reseller" && <Grid item sm={12} md={12}>
                                    <label ><span className='fw-bold'>Upload Document :</span> <span className='text-muted'>( GST/Shop Image or any Certificate ) </span></label> <br />
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={handleFileChange}
                                    />
                                </Grid>}
                                {/* <Grid item sm={12} md={12}>
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
                                </Grid> */}
                                <Grid item sm={12} md={12} mt={5}  >
                                    
                                        <div className='row ms-2 me-2'>
                                            
                                                {/* <Button variant='contained' color='secondary' autoFocus onClick={handleClose}>
                                                    CANCEL
                                                </Button> */}
                                                <Button className='w-100 col-md-12 col-12 mb-3 d-flex justify-content-center' variant='contained' autoFocus onClick={handleSubmit(onSubmit)} >
                                                    SIGNUP
                                                </Button>
                                           
                                            <div className={`${style.common_curs} ${style.loginTxtF} ${style.paddTopAcnt}  text-primary col-md-12 col-12 mb-3`} onClick={handleLogin}> Already have an account?/SignIn  </div>

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