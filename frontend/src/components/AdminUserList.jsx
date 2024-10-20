import React, { useState, useEffect } from "react";
import axios from "axios";
import UserListed from "./Admin/UserListed";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const navigate = useNavigate()
  

  const filteredUsers = users.filter((user) =>
    `${user.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const removeUser = (id) => {
   
      let new_users = users.filter((user) => user.id !== id)
      setUsers(new_users) 
  }
  
  

  useEffect(() => {
    const token = localStorage.getItem("access");
    const fetchData = async () => {
      try {
      
        let response = await axios.get(
          "http://127.0.0.1:8000/api/admin/users",
          {
            headers: {
              authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto my-10 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        User Listing
      </h2>

      <div className="flex items-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users..."
          className="flex-1 p-3 border rounded-md focus:outline-none focus:ring focus:border-purple-300"
        />
        <button
          onClick={() => navigate('/admin/addUser/') }
          className="ml-4 p-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-400 focus:ring focus:border-purple-300"
        >
          Add User
        </button>
      </div>

   

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, i) => (
          <div key={i}>
            <UserListed user={user} removeUser={removeUser}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
export const id  = 3;
