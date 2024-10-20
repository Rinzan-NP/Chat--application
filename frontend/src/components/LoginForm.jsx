import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { set_Authentication } from "../redux/Authentication/AuthenticationSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Alert from "./Alert"
const Login = (props) => {
  let {url, navigated, Title} = props
  const baseUrl = 'http://127.0.0.1:8000/'
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const[formError, setFormError] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let response = await axios.post(baseUrl + url,form);
        if (response.status === 200){
          localStorage.setItem("access", response.data.access);
          localStorage.setItem("refresh", response.data.refresh);
          dispatch(
            set_Authentication({
              name: jwtDecode(response.data.access).first_name,
              isAuthenticated: true,
              isAdmin: response.data.isAdmin,
            })
          )
          console.log(response);
          navigate(navigated)
          
        }
      } catch (error) {
        if(error.response && error.response.status === 401){
          setFormError(error.response.data.detail)
        }
      }
      
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">{Title}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="block w-96 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </label>
        {formError && <Alert message={formError} heading="Authentication Error" color="red" />}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-400"
        >
          Log In
        </button>
        
      </form>
    </div>
  );
};
Login.defaultProps = {
  Title: 'Login'
};  

export default Login;
