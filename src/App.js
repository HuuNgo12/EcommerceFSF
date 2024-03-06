import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";

import "antd/dist/antd";
import "bootstrap/dist/css/bootstrap.min.css";

import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";

import { currentUser } from "./functions/auth";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // console.log(user);

  //to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, []);
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        {/* <Route path="/user/history" element={<History />} /> */}

        <Route
          path="/user/history"
          element={<UserRoute Component={History} />}
        />
        <Route
          path="/user/password"
          element={<UserRoute Component={Password} />}
        />
        <Route
          path="/user/wishlist"
          element={<UserRoute Component={Wishlist} />}
        />
        <Route
          path="/admin/dashboard"
          element={<AdminRoute Component={AdminDashboard} />}
        />
        <Route
          path="/admin/category"
          element={<AdminRoute Component={CategoryCreate} />}
        />
        <Route
          path="/admin/category/:slug"
          element={<AdminRoute Component={CategoryUpdate} />}
        />
      </Routes>
    </>
  );
};

export default App;
