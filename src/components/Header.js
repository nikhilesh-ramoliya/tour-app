import React, { useState } from 'react'
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
import { changesearch } from '../redux/feature/mySlice';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { search } = useSelector(state => state.my)
    return (
        <div className={styles.header}>
            <Box width="1000px" margin='auto' sx={{ background: "transparent" }} className={styles.header} >
                <Link to="/">
                    <div className={styles.logo}>
                        logo
                    </div>
                </Link>
                <ul>
                    <li>{user ? `Logged is as: ${user?.result?.name}` : "please login"}</li>
                    <Link to="/" onClick={() => {
                        !user && toast.warn("login first")
                    }}>
                        <li>
                            Home
                        </li>
                    </Link>
                    {user ? <>
                        <Link to="/AddTour" onClick={() => {
                            !user && toast.warn("login first")
                        }}>
                            <li>
                                Add tour
                            </li>
                        </Link>
                        <Link to="/dashboard" onClick={() => {
                            !user && toast.warn("login first")
                        }}>
                            <li>
                                Dashboard
                            </li>
                        </Link>
                        <input type="text" value={search} onChange={(e) => {
                            var a = e.target.value
                            dispatch(changesearch(a))
                        }} />
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