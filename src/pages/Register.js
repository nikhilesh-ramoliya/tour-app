import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux';
import { signup } from '../redux/feature/authSlice';

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { values, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            dispatch(signup({
                values,
                toast,
                navigate
            }))
        }
    });

    return (
        <div >
            <Box m={5}>
                <Typography variant="h3" textAlign="center" color="initial">
                    Sign up
                </Typography>
            </Box>
            <form autoComplete='false'>
                <Box mx={5} my={5}>

                    <TextField
                        type="text"
                        required
                        autoComplete='off'
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                    />
                    <TextField
                        type="text"
                        required
                        autoComplete='off'
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                    />
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
                        type="password"
                        autoComplete='off'
                        onChange={handleChange}
                        value={values.password}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        id="password"
                    />
                    <Button variant="contained" color="primary" type='submit' onClick={handleSubmit} name="submit">
                        submit
                    </Button>
                    <Button variant='contained'
                        color='secondary'
                        onClick={() => {
                            navigate("/tour-app/login")
                        }}
                    >
                        login
                    </Button>
                </Box>
            </form>

        </div>

    )
}

export default Register;