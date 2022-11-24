import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const mySlice = createSlice({
    name: "my",
    initialState: {
        user: null,
        error: " ",
        loading: false
    }
})

export default mySlice.reducer;