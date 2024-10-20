import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDetail = (props) => {
  let { userId } = props;
  const token = localStorage.getItem("access");
  const [form, setForm] = useState({
    profile_pic: "",
    first_name: "",
    phone_number: "",
    last_name: "",
    email: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form);
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/admin/user/update/${userId}`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if(response.status == 200){
        alert("Updated Successfully!");
        navigate("/admin/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/admin/user/detail/${userId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setForm(response.data);
      } catch (error) {
        if (error.response.status == 404) {
          alert("User not found");
          navigate("/admin/");
        }
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">User Detail</h1>
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={handleChange}
            value={form.first_name}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={form.phone_number}
            readOnly
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            readOnly
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-400"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UserDetail;
