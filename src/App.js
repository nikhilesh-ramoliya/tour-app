import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { SETUSER } from "./redux/feature/authSlice";
import Header from "./components/Header";
import AddTour from "./pages/AddTour";
import BlogDiscription from './pages/BlogDiscription';
import { getTours, getToursByUser } from "./redux/feature/tourSlice";
import { Box } from "@mui/material";
import Dashboard from './pages/Dashboard';
import EditTour from "./pages/EditTour";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const user1 = JSON.parse(localStorage.getItem("profile"))

  // var userid;
  // if (user) {
  //   const userpassword = user.result.password
  //   if (userpassword) {
  //     userid = user.result._id
  //   } else {
  //     userid = user.result._id.split(" ")[4].split('"')[1]
  //   }
  // }
  // console.log(userid);
  useEffect(() => {
    dispatch(SETUSER(user1));
  }, [])
  useEffect(() => {
    if (user) {
      dispatch(getTours(toast))
      dispatch(getToursByUser());
    }
  }, [user])



  return (
    <BrowserRouter>
      <div>
        <Header />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Box maxWidth="1000px" margin="auto">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Login please={true} />} />
            <Route path="/AddTour" element={user ? <AddTour /> : <Login please={true} />} />
            <Route path="/EditTour/:id" element={user ? <AddTour /> : <Login please={true} />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blog/:id" element={user ? <BlogDiscription /> : <Login please={true} />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Login please={true} />} />
            <Route path="/dashboard/:id" element={user ? <AddTour edit={true} /> : <Login please={true} />} />
            <Route path="*" element={user ? <div>page not found</div> : <Login please={true} />} />
          </Routes>
        </Box>
      </div>
    </BrowserRouter >
  );
}
export default App;
