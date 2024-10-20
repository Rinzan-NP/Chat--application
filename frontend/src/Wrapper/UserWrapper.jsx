import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PrivateRoute from "../utils/PrivateRoute";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import isAuthUser from "../utils/isAuthUser";
import { useDispatch, useSelector } from "react-redux";
import { set_Authentication } from "../redux/Authentication/AuthenticationSlice";
import PublicRoute from "../utils/PublicRoute";

const UserWrapper = () => {
  const dispatch = useDispatch();

  const authentication_user = useSelector((state) => state.authentication_user);
  const checkAuth = async () => {
    const isAuthenticated = await isAuthUser();
    dispatch(
      set_Authentication({
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated,
        isAdmin: isAuthenticated.is_superuser,
      })
    );
  };

  useEffect(() => {
    if (!authentication_user.name) {
      checkAuth();
    }
    
    
  }, [authentication_user]);

  return (
    <Routes>
      <Route
        exact
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      ></Route>
      <Route exact path="/" element={<Home />}></Route>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export default UserWrapper;
