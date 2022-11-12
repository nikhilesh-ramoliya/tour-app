import React from 'react'
import styles from "./Header.module.css";
import { Link, useNavigate } from 'react-router-dom';
import Home from './../pages/Home';
import { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { SETUSER } from '../redux/feature/authSlice';
import { toast } from 'react-toastify';
import { setTour } from '../redux/feature/tourSlice';
import { Box, Button } from '@mui/material';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    return (
        <div className={styles.header}>
            <Box width="1000px" margin='auto' sx={{ background: "transparent" }} className={styles.header} >
                <div className={styles.logo}>logo</div>
                <ul>
                    <li>{user ? `Logged is as: ${user?.result?.name}` : "please login"}</li>
                    <li><Link to="/" onClick={() => {
                        !user && toast.warn("login first")
                    }}>Home</Link></li>
                    {user ? <><li><Link to="/AddTour" onClick={() => {
                        !user && toast.warn("login first")
                    }}>Add tour</Link></li>
                        <li><Link to="/dashboard" onClick={() => {
                            !user && toast.warn("login first")
                        }}>Dashboard</Link></li>
                        <GoogleLogout
                            clientId={process.env.REACT_APP_CLIENT_ID}
                            onLogoutSuccess={() => {
                                sessionStorage.clear();
                                localStorage.clear();
                                dispatch(setTour())
                                dispatch(SETUSER(null))
                                navigate("/")
                            }}
                            render={(renderProps) => (
                                <button
                                    onClick={renderProps.onClick}
                                >
                                    logout
                                </button>
                            )}>
                        </GoogleLogout></> : <></>}
                </ul>
            </Box>
        </div>
    )
}

export default Header