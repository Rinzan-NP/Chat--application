import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { set_Authentication } from "../redux/Authentication/AuthenticationSlice";

const Homes = () => {
  let user = useSelector((state) => state.authentication_user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    dispatch(
      set_Authentication({
        name: null,
        isAuthenticated: false,
        isAdmin: null,
      })
    );
    
  };
  return (
    <>
      {user.isAuthenticated ? (
        <div className="bg-green-100 p-4 rounded-md shadow-md max-w-md mx-auto mt-8">
          <p className="text-gray-500 font-semibold mb-4">
            You have successfully logged in!
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <h1>NO logined</h1>
      )}
    </>
  );
};

export default Homes;
