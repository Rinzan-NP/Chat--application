import React from "react";
import Navbar from "../components/Navbar";
import InboxSidebar from "../components/Inbox";
import ChatWindow from "../components/ChatWindow";

const Messages = () => {
	return (
		<>
			<Navbar />
			<div className="flex mb-4">
				<InboxSidebar />
                
				<ChatWindow />
			</div>
		</>
	);
};

export default Messages;
