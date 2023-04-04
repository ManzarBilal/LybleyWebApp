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

const OtpVerification = () => {
    const [open, setOpen] = React.useState(true);
    const [otp, setOtp] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);

    };
    const handleChange = (newValue) => {
        setOtp(newValue)
    }
    return (
        <div >
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
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

                            <Button variant='contained' autoFocus  >
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