import { createSlice } from "@reduxjs/toolkit";

const mySlice = createSlice({
    name: "my",
    initialState: {
        search: ""
    },
    reducers: {
        changesearch: (state, action) => void (state.search = action.payload)
    }
})

export const { changesearch } = mySlice.actions
export default mySlice.reducer;