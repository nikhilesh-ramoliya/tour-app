import { createSlice, createAsyncThunk, applyMiddleware } from "@reduxjs/toolkit";
import * as api from "../api"

export const createTour = createAsyncThunk("/tour",
    async ({ tourData, navigate, toast }) => {
        try {
            const respose = await api.createTour(tourData);
            toast.success("tour added sucessfull")
            navigate("/");
            return respose.data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    })
export const getTours = createAsyncThunk("/gettours",
    async (toast) => {
        try {
            const respose = await api.getTours();
            return respose.data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    })



const tourSlice = createSlice({
    name: "tour",
    initialState: {
        tour: {},
        tours: [],
        userTours: [],
        error: "",
        loading: false
    },
    reducers: {
        setTour: (state, action) => void (state.tours = [])
    },
    extraReducers: {
        [createTour.pending]: (state, action) => {
            state.loading = true
        },
        [createTour.fulfilled]: (state, action) => {
            state.loading = false
            state.tours = [action.payload];
        },
        [createTour.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        },
        [getTours.pending]: (state, action) => {
            state.loading = true

        },
        [getTours.fulfilled]: (state, action) => {
            state.loading = false
            state.tours = action.payload;
        },
        [getTours.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        },
    }
})

export const { setTour } = tourSlice.actions;

export default tourSlice.reducer;