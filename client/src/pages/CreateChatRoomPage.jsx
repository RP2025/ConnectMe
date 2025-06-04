import React from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import "./Page.css";

const CreateChatRoomPage = () => {
  const navigate = useNavigate();

  const createRoom = () => {
    const roomId = crypto.randomUUID();
    socket.emit("join-room", roomId);
    navigate(`/chat/${roomId}`);
  };


  return (
    <div className="container-fluid page-bg d-flex align-items-center justify-content-center vh-100">
      <div className="text-center p-4">
        <h2 className="connect-title mb-4">Create Chat Room</h2>
        <button className="custom-btn" onClick={createRoom}>
          Create Room
        </button>
      </div>
    </div>
  );
};

export default CreateChatRoomPage;
