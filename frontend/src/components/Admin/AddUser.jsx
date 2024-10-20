// SignUpForm.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpForm = ({ onSignUp }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number : "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let response = await axios.post(
          "http://127.0.0.1:8000/api/register/",
          userData
        );
        if (response.status === 200  ){
          navigate('/admin/')
        }
      } catch (error) {
        console.log(error.response);
       alert(error.response.statusText); 
      }


  
  };

  return (
    <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="first_name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          First Name:
        </label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={userData.first_name}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="last_name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Last Name:
        </label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={userData.last_name}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="phone_number"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Phone Number:
        </label>
        <input
          type="text"
          id="phone_number"
          name="phone_number"
          value={userData.phone_number}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-400 focus:ring focus:border-purple-300"
      >
        Add user
      </button>
    </form>
  );
};

export default SignUpForm;
