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
import { getTours } from "./redux/feature/tourSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const user1 = JSON.parse(localStorage.getItem("profile"))

  useEffect(() => {
    dispatch(SETUSER(user1));
  }, [])
  useEffect(() => {
    if (user) {
      dispatch(getTours(toast))
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
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login please={true} />} />
          <Route path="/AddTour" element={user ? <AddTour /> : <Login please={true} />} />
          <Route path="/EditTour/:id" element={user ? <AddTour /> : <Login please={true} />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog/:id" element={<BlogDiscription />} />
          <Route path="*" element={<div>page not found</div>} />
        </Routes>
      </div>
    </BrowserRouter >
  );
}
export default App;
