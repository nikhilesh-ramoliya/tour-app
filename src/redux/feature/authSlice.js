import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api"

export const login = createAsyncThunk("auth/login", async ({ values, navigate, toast }) => {
    try {
        const respose = await api.login(values);
        toast.success("login sucessfull")
        navigate("/tour-app/");
        return respose.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
})

export const signup = createAsyncThunk("auth/signup", async ({ values, navigate, toast }) => {
    try {
        const respose = await api.signup(values);
        toast.success("registered sucessfull")
        navigate("/tour-app/");
        return respose.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
})
export const googlesignin = createAsyncThunk("auth/googlesignin", async ({ values, navigate, toast }) => {
    try {
        const respose = await api.googlesignin(values);
        toast.success("google login sucessfull")
        navigate("/tour-app/");
        console.log("googlelogin :", respose.data);
        return respose.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: "",
        loading: false
    },
    reducers: {
        SETUSER: (state, action) => void (state.user = action.payload),
        SETLOADING: (state, action) => void (state.loading = action.payload),
        SETERROR: (state, action) => void (state.error = action.payload)
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload
        },
        [login.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        },
        [signup.pending]: (state, action) => {
            state.loading = true
        },
        [signup.fulfilled]: (state, action) => {
            state.loading = false
            console.log(JSON.stringify({ ...action.payload }));
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload
        },
        [signup.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        },
        [googlesignin.pending]: (state, action) => {
            state.loading = true
        },
        [googlesignin.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload
        },
        [googlesignin.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        }
    }
})

export const { SETERROR, SETLOADING, SETUSER } = authSlice.actions;
export default authSlice.reducer;