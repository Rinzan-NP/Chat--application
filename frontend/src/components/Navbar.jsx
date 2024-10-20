
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'


const Navbar = () => {
const user = useSelector((state) => state.authentication_user)


  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Home
        </Link>
        <div>
          {user.isAuthenticated ?(
            <Link to="/profile" className="text-white mr-4">
              Profile
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">
                Login
              </Link>
              <Link to="/signup" className="text-white">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
