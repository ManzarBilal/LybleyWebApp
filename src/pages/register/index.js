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
import { Grid, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import style from "./register.module.css";
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
    const [open, setOpen] = React.useState(false);
    const [showIcon1,setShowIcon1]=React.useState(true);
    const [showIcon2,setShowIcon2]=React.useState(true);
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
    const passwordVisibility1=()=>{
        let type1=document.getElementById("pass1");
        if(type1?.type==="password"){
            document.getElementById("pass1").type="text";
            setShowIcon1(false)
        }else{
            document.getElementById("pass1").type="password"
            setShowIcon1(true);
        }
     }
     const passwordVisibility2=()=>{
        let type1=document.getElementById("pass2");
        if(type1?.type==="password"){
            document.getElementById("pass2").type="text";
            setShowIcon2(false)
        }else{
            document.getElementById("pass2").type="password"
            setShowIcon2(true);
        }
     }
    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
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
                        <Grid item sm={12} md={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name"
                                type="email"
                                fullWidth
                                variant="outlined"
                                size='small'
                            />
                        </Grid>
                        <Grid item sm={12} md={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                size='small'
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item sm={12} md={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                size='small'
                                label="Contact No."
                                type="number"
                                fullWidth
                                variant="outlined"
                            />
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
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                           {showIcon1 ? <VisibilityOffIcon onClick={passwordVisibility1}/> : <VisibilityIcon onClick={passwordVisibility1}/> }
                                        </InputAdornment>
                                    ),
                                    // endAdornment: (
                                    //     <InputAdornment position="end">
                                    //         <VisibilityOffIcon />
                                    //     </InputAdornment>
                                    // ),
                                }}
                            />
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
                                           {showIcon2 ? <VisibilityOffIcon onClick={passwordVisibility2} /> : <VisibilityIcon onClick={passwordVisibility2} /> }
                                        </InputAdornment>
                                    ),
                                    // endAdornment: (
                                    //     <InputAdornment position="end">
                                    //         <VisibilityOffIcon />
                                    //     </InputAdornment>
                                    // ),
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <div className='d-flex justify-content-between w-100' >
                        <div className='row'>
                            <div className={`${style.common_curs} ${style.loginTxtF} ps-4 text-primary col-md-6 col-12 mb-3`} onClick={handleLogin}> Already have an account?/SignIn </div>
                            <div className='col-md-6 col-12 mb-3'>
                                <Button className='ms-2 '  variant='contained' color='secondary' autoFocus onClick={handleClose}>
                                    CANCEL
                                </Button>
                                <Button className='ms-2 ' variant='contained' autoFocus onClick={handleClose}>
                                    SIGNUP
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}