import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api"

export const createTour = createAsyncThunk("/tour",
    async ({ tourData, navigate, toast }) => {
        try {
            const response = await api.createTour(tourData);
            toast.success("created sucessfully")
            navigate("/");
            return response.data
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    })
export const editTour = createAsyncThunk("/edittour",
    async ({ tourData, navigate, toast }) => {
        try {
            const response = await api.editTour(tourData);
            toast.success("Updated sucessfully")
            navigate("/");
            console.log(response.data);
            return response.data
        } catch (error) {
            toast.error(error.response.data.message);
        }
    })

export const getTours = createAsyncThunk("/gettours",
    async (toast, username) => {
        console.log({ username });
        try {
            const respose = await api.getTours();
            return respose.data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    })
export const getToursByUser = createAsyncThunk("/gettoursbyuser",
    async (toast) => {
        try {
            const respose = await api.getToursByUser();
            return respose.data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    })
export const DeleteTour = createAsyncThunk("/deletetour",
    async ({ toast, _id }) => {
        console.log(_id);
        try {
            const response = await api.deleteTour(_id);
            console.log(response.data);
            toast.success("deleted")
            return response.data
        } catch (error) {
            console.log(error);
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
            state.tours = [...state.tours, action.payload]
            state.userTours = [...state.userTours, action.payload]
        },
        [createTour.rejected]: (state, action) => {
            state.loading = false
            console.log(state.error);
            state.error = action.payload;
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
        [getToursByUser.pending]: (state, action) => {
            state.loading = true

        },
        [getToursByUser.fulfilled]: (state, action) => {
            state.loading = false
            state.userTours = action.payload;
        },
        [getToursByUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        },
        [editTour.pending]: (state, action) => {
            state.loading = true
        },
        [editTour.fulfilled]: (state, action) => {
            state.loading = false
            state.tours = state?.tours?.filter((item) => {
                return item._id !== action.payload._id
            })
            state.userTours = state?.userTours.filter((item) => {
                return item._id !== action.payload._id
            })
            console.log(action.payload);
            state.tours = [...state.tours, action.payload]
            state.userTours = [...state.userTours, action.payload]
        },
        [editTour.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        },
        [DeleteTour.pending]: (state, action) => {
            state.loading = true
        },
        [DeleteTour.fulfilled]: (state, action) => {
            state.loading = false
            state.tours = state.tours.filter((item) => {
                return item._id !== action.payload._id
            })
            state.userTours = state.userTours.filter((item) => {
                return item._id !== action.payload._id
            })
        },
        [DeleteTour.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message;
        },
    }
})

export const { setTour } = tourSlice.actions;

export default tourSlice.reducer;