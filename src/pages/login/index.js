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
import style from "./login.module.css";
import Link from 'next/link';
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
    const [open, setOpen] = React.useState(props?.bool);
    const [showIcon,setShowIcon]=React.useState(true);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        props.onSubmit(false);
    };
 const passwordVisibility=()=>{
    let type=document.getElementById("password");
    if(type?.type==="password"){
        document.getElementById("password").type="text";
        setShowIcon(false)
    }else{
        document.getElementById("password").type="password"
        setShowIcon(true);
    }
 }
 const handleForget=()=>{
    props.onSubmit(false);
    props.onForget(true);
}
    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Login
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={props?.bool}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Login
                </BootstrapDialogTitle>
                <DialogContent >
                    <Grid >
                        <Grid item sm={12} md={12}>
                            <div className=' d-flex justify-content-center  '>  <img src='https://thumbs.dreamstime.com/z/login-icon-button-vector-illustration-isolated-white-background-127000355.jpg' height="100" width="100" /></div>
                        </Grid>
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
                            />
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
                                           {showIcon ? <VisibilityOffIcon onClick={passwordVisibility}/> : <VisibilityIcon onClick={passwordVisibility}/> }
                                        </InputAdornment>
                                    ),
                                    // endAdornment: (
                                    //     <InputAdornment position="end">
                                    //         
                                    //     </InputAdornment>
                                    // ),
                                }}
                            />

                        </Grid>
                    </Grid>
                    
                </DialogContent>
                <DialogActions>
                    <div className='d-flex justify-content-between w-100'>
                        <div className='row'>
                            
                        <div  className={`${style.common_curs} ps-4 text-primary col-md-6 col-12 mb-3 `} onClick={handleForget}>Forget Password</div>
                        <div className='col-md-6 col-12 mb-3'>
                            <Button variant='contained' color='secondary' autoFocus onClick={handleClose}>
                                CANCEL
                            </Button>
                            <Button className='ms-2 me-2' variant='contained' autoFocus onClick={handleClose}>
                                SIGNIN
                            </Button>
                        </div>
                        </div >
                    </div>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}