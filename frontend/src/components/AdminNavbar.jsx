import React from 'react';
import { useDispatch } from 'react-redux';
import { set_Authentication } from '../redux/Authentication/AuthenticationSlice';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
    navigate('/admin/login');

  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-indigo-500 text-white">
      <div className="flex items-center">
        <a href="/" className="text-lg font-semibold">Home</a>
      </div>
      <div className="flex items-center">
        <img src="https://toppng.com/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png" alt="Profile" className="w-8 h-8 rounded-full mr-4"/>
        <span className="mr-4">Admin</span>
        <button className=" hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
