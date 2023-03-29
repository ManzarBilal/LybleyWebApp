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

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleLogin=()=>{
          setOpen(false);
          props.onSubmit(true);
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
                    <Grid container>
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
                            />
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
                            />
                        </Grid>
                        <Grid item sm={12} md={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
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
                                id="name"
                                label="Password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <VisibilityIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <VisibilityOffIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            </Grid>
                            <Grid item sm={12} md={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Confirm Password"
                                    type="password"
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <VisibilityIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <VisibilityOffIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                </DialogContent>
                <DialogActions>
                    <div className='d-flex justify-content-between w-100' >
                        <div className={`${style.common_curs} ps-2 mt-1 text-primary`} onClick={handleLogin}> Already have an account?/SignIn </div>
                        <div>
                    <Button variant='contained' color='secondary' autoFocus onClick={handleClose}>
                        CANCEL
                    </Button>
                    <Button variant='contained' autoFocus onClick={handleClose}>
                        SIGNUP
                    </Button>
                    </div>
                    </div>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}