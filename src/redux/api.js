import axios from 'axios';
const API = axios.create({ baseURL: "http://localhost:5000" });


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
        console.log('====================================');
        console.log(a);
        console.log('====================================');
    }
    return req
})

export const login = (FormData) => API.post("/user/signin", FormData);
export const signup = (FormData) => API.post("/user/signup", FormData);
export const googlesignin = (FormData) => API.post("/user/googlesignin", FormData);
export const createTour = (FormData) => API.post("/tour", FormData);
export const getTours = () => API.get("/tour");