import axios from 'axios';
const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });


API.interceptors.request.use((req) => {
    var a;
    if (localStorage.getItem("profile")) {
        a = JSON.parse(localStorage.getItem("profile")).token1;
        if (a) {
            req.headers.Authorization = a
        } else {
            a = JSON.parse(localStorage.getItem("profile")).token
            req.headers.Authorization = a
        }
    }
    return req
})

export const login = (FormData) => API.post("/user/signin", FormData);
export const signup = (FormData) => API.post("/user/signup", FormData);
export const googlesignin = (FormData) => API.post("/user/googlesignin", FormData);
export const createTour = (FormData) => API.post("/tour", FormData);
export const editTour = (FormData) => API.post("/tour/edit", FormData);
export const deleteTour = (FormData) => API.delete(`/tour/${FormData}`);
export const getTours = () => API.get("/tour");
export const getToursByUser = () => API.get("/tour/user");