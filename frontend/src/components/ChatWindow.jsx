import React from "react";
import { FiSend } from "react-icons/fi";

// ReceiverChat Component
const ReceiverChat = ({ message, imageUrl }) => {
  return (
    <div className="mb-4 flex">
      <img
        src={imageUrl}
        alt="Profile"
        className="w-8 h-8 rounded-full object-cover mr-2"
      />
      <div className="bg-white p-3 rounded-lg shadow text-sm text-gray-700">
        {message}
      </div>
    </div>
  );
};

// SenderChat Component
const SenderChat = ({ message }) => {
  return (
    <div className="mb-4 flex justify-end">
      <div className="bg-blue-500 text-white p-3 rounded-lg shadow text-sm">
        {message}
      </div>
    </div>
  );
};

// Main ChatWindow Component
const ChatWindow = () => {
  return (
    <div className="flex-1 bg-white h-screen p-4 flex flex-col">
      <div className="flex items-center mb-4 p-2 bg-white text-black rounded-lg shadow">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover mr-4"
        />
        <div className="font-semibold text-lg">John Doe</div>
      </div>
      {/* Chat messages container */}
      <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-inner overflow-y-auto">
        <ReceiverChat
          message="Hey, how are you?"
          imageUrl="https://randomuser.me/api/portraits/men/1.jpg"
        />
        <SenderChat message="I'm good, thanks! How about you?" />
        <ReceiverChat
          message="Doing great, thanks for asking!"
          imageUrl="https://randomuser.me/api/portraits/men/1.jpg"
        />
        <ReceiverChat
          message="Are you available for a call later?"
          imageUrl="https://randomuser.me/api/portraits/men/1.jpg"
        />
        <SenderChat message="Sure, just let me know the time." />
      </div>
      {/* Input area */}
      <div className="mt-4 flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500 h-12"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg flex items-center h-12">
          <FiSend className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
