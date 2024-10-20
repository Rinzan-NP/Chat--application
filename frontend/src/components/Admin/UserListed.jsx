import React from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserListed = (props) => {
  let { user, removeUser } = props;
  const navigate = useNavigate()
  const dummy =
    "https://toppng.com/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png";
  const baseImage = "http://127.0.0.1:8000/";

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('access')
      const id = user.id
      let response = await axios.delete(
        `http://127.0.0.1:8000/api/admin/user/delete/${user.id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return removeUser(id)
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetail =() => {
    navigate(`/admin/userDetail/${user.id}`)
  }
  return (
    <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center" onClick={handleDetail}>
      <div className="flex items-center w-full mb-4">
        <div className="rounded-full overflow-hidden mr-3">
          <img
            src={user.profile_pic ? baseImage + user.profile_pic : dummy}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-10 h-10 object-cover"
          />
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-xl font-semibold text-gray-700">{`${user.first_name} ${user.last_name}`}</h3>
          <p className="text-purple-900">{user.email}</p>
        </div>
        <button className="rounded-full p-2 pl-2.5 bg-indigo-500 text-white w-10 h-10 ml-auto mr-2" onClick={handleDetail}>
          <PencilAltIcon className="h-5 w-5" />
        </button>
        <button
          className="rounded-full p-2 pl-2.5 bg-red-500 text-white w-10 h-10"
          onClick={handleDelete}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default UserListed;
