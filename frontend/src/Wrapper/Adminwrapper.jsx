import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPrivateRoute from "../utils/AdminPrivateRoute";
import AdminLogin from "../pages/AdminLogin";
import AdminHome from "../pages/AdminHome";
import AdminAdduser from "../pages/AdminAdduser";
import AdminUserDetail from "../pages/AdminUserDetail";
import NoAdminnRoute from "../utils/NoAdminRoute"

const AdminWrapper = () => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <NoAdminnRoute>
              <AdminLogin />
            </NoAdminnRoute>
          }
        />
        <Route
          path="/"
          element={
            <AdminPrivateRoute>
              <AdminHome />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/addUser"
          element={
            <AdminPrivateRoute>
              <AdminAdduser />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/userDetail/:userId"
          element={
            <AdminPrivateRoute>
              <AdminUserDetail />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AdminWrapper;
