import React from "react";
import SearchBar from "./SearchBar";
import axios from "axios";

const InboxSidebar = () => {
	const users = [
		{
			name: "John Doe",
			profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
			lastMessage: "Hey, how are you?",
			time: "12:30 PM",
		},
		{
			name: "Jane Smith",
			profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
			lastMessage: "Can we meet tomorrow?",
			time: "1:45 PM",
		},
		{
			name: "Alice Johnson",
			profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
			lastMessage: "Don't forget the meeting.",
			time: "3:15 PM",
		},
		{
			name: "Bob Brown",
			profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
			lastMessage: "See you soon!",
			time: "4:00 PM",
		},
	];
    
	return (
		<div className="w-full md:w-1/4 bg-gray-100 h-screen p-4 border-r border-gray-300 overflow-y-auto">
			<div className="text-xl font-bold mb-4">Inbox</div>
			<SearchBar />
			<div className="space-y-4">
				{users.map((user, index) => (
					<div key={index} className="flex items-center p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-200">
						<img src={user.profilePic} alt="Profile" className="w-12 h-12 rounded-full object-cover mr-4" />
						<div className="flex-1">
							<div className="flex justify-between">
								<span className="font-semibold text-gray-900">{user.name}</span>
								<span className="text-sm text-gray-500">{user.time}</span>
							</div>
							<div className="text-sm text-gray-700 truncate">{user.lastMessage}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default InboxSidebar;
