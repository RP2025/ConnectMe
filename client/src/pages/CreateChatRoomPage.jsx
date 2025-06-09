// This part will generate a unique room code and allow the user to create a chat room with their name.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import "./Page.css";

const CreateChatRoomPage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const generateRoomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCreate = () => {
    if (!name.trim()) return alert("Please enter your name");
    const roomId = generateRoomCode();
    socket.emit("join-room", { roomId, name });
    navigate(`/chat/${roomId}`, { state: { name } });
  };

  return (
    <div className="container-fluid page-bg d-flex align-items-center justify-content-center vh-100">
      <div className="text-center p-4">
        <h2 className="connect-title mb-4">Create Chat Room</h2>
        <input
          type="text"
          placeholder="Enter your nameee"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="custom-btn" onClick={handleCreate}>
          Generate Room & Join
        </button>
      </div>
    </div>
  );
};

export default CreateChatRoomPage;
