import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { set_Authentication } from "../redux/Authentication/AuthenticationSlice";

const Profile = () => {
  const [form, setForm] = useState({
    profile_pic: "",
    first_name: "",
    last_name: "",
    email: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("access");
    const fetch_data = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/profile/", {
          headers: {
            authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setForm({
            profile_pic: response.data.profile_pic,
            email: response.data.email,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetch_data();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "profile_pic") {
      setForm({
        ...form,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access");
      const formData = new FormData();

      // Append form data to FormData object
      formData.append("profile_pic", e.target.elements.profile_pic.files[0]);
      formData.append("first_name", form.first_name);
      formData.append("last_name", form.last_name);
      formData.append("email", form.email);

      let response = await axios.post(
        "http://127.0.0.1:8000/api/profile/update",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        set_Authentication({
          name: response.data.first_name,
          isAuthenticated: true,
          isAdmin: response.data.is_superuser,
        })
      );
      alert("Updated successfully");  
    } catch (error) {
      console.error(error);
    }
  };
  const dummyImage =
    "https://toppng.com/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png";
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          <div className="w-24 h-24 mb-4 rounded-full overflow-hidden mx-auto">
            <img
              src={form.profile_pic != "" ? form.profile_pic : dummyImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            name="profile_pic"
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 ml-15 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
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

export default Profile;
