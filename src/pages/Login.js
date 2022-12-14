import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from "react-redux";
import { googlesignin, login } from '../redux/feature/authSlice';
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

const initialValues = {
    email: "",
    password: ""
}


function Login({ please }) {
    const clientId = "746987253016-u0obu7o723eefllm8kdvmpd4apjc1kps.apps.googleusercontent.com"

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId,
                scope: '',
            });
        };
        gapi.load('client:auth2', initClient);
    }, []);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { values, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            dispatch(login({ values, navigate, toast }))
        }
    });
    const { user, loading } = useSelector(state => state.auth);

    const onSuccess = (res) => {
        // dispatch(SETUSER(res.profileObj))
        const email = res?.profileObj?.email
        const name = res?.profileObj?.name
        const token = res?.tokenId;
        const googleId = res?.googleId;
        const values = {
            email, name, token, googleId
        }
        dispatch(googlesignin({ values, navigate, toast }))
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };


    return (
        <div >
            <Box m={5}>
                <Typography variant="h3" textAlign="center" color="initial">
                    Login
                </Typography>
            </Box>
            <form autoComplete='false'>
                <Box mx={5} my={5}>

                    <TextField
                        type="email"
                        required
                        autoComplete='off'
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    <TextField
                        autoComplete='off'
                        onChange={handleChange}
                        value={values.password}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                    />
                    <Button variant="contained" color="primary" type='submit' onClick={handleSubmit} name="submit">
                        {loading && "loading"} submit
                    </Button>
                    <div>
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Sign in with Google"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy="single_host_origin"
                            isSignedIn
                            disabled={user}
                        />
                        <Button variant='contained'
                            color='secondary'
                            onClick={() => {
                                navigate("/signup")
                            }}>
                            Sign up
                        </Button>
                    </div>
                </Box>
            </form>

        </div>

    )
}

export default Login