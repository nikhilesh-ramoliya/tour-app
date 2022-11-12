import { configureStore } from "@reduxjs/toolkit"
import AuthReducer from "./feature/authSlice";
import MyReducer from "./feature/mySlice";
import TourReducer from "./feature/tourSlice";

export default configureStore({
    reducer: {
        auth: AuthReducer,
        my: MyReducer,
        tour: TourReducer
    }
})