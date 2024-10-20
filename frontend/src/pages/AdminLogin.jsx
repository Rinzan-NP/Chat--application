import React from "react";
import LoginForm from "../components/LoginForm";
const AdminLogin = () => {
  return (
    <>
      <LoginForm url="api/admin/login/" navigated="/admin/" Title="Admin Login"/>
    </>
  );
};

export default AdminLogin;
