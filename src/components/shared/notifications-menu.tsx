"use client";

import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client"; // Import Socket.IO client library

const NotificationsMenu = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Establish a connection to the Socket.IO server
    const socket = io("https://huddle-api.onrender.com/"); // Replace with your server's URL

    socket.on("receiveInvitation", (data) => {
      console.log("Invitation received:", data);
    });

    // Cleanup: Disconnect socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full h-auto mb-[100px]">
      <div className="bg-[#F2F2F2] flex rounded-md justify-between items-center px-3 py-2">
        <h1 className="font-bold text-xl text-custom-semiBlack">
          Notifications
        </h1>
        <div className="bg-white h-8 w-8 grid place-content-center rounded-full relative">
          <Bell size={18} color="#EEAE05" fill="#EEAE05" />
          {showAlert && (
            <div
              id="alert"
              className="w-2 h-2 rounded-full bg-red-500 absolute top-0 right-5 z-10"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsMenu;
