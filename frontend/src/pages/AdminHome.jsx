import React from "react";
import AdminUserList from "../components/AdminUserList";
import AdminNavbar from "../components/AdminNavbar";

const AdminHome = () => {
  return (
    <>
      <AdminNavbar />   
      <AdminUserList />
    </>
  );
};

export default AdminHome;
