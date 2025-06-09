import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import "./Page.css";

const JoinChatRoomPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    const trimmedCode = roomCode.trim().toUpperCase();

    if (!name.trim() || trimmedCode.length !== 6) {
      alert("Please enter a valid name and 6-digit room code");
      return;
    }

    socket.emit("join-room", { roomId: trimmedCode, name });
    navigate(`/chat/${trimmedCode}`, { state: { name } });
  };

  return (
    <div className="container-fluid page-bg d-flex align-items-center justify-content-center vh-100">
      <div className="text-center p-4">
        <h2 className="connect-title mb-4">Join Chat Room</h2>
        
        <input
          type="text"
          placeholder="Enter your name"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter 6-digit Room Code"
          className="form-control mb-3 text-uppercase"
          maxLength={6}
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />

        <button className="custom-btn" onClick={handleJoin}>
          Join Room
        </button>
      </div>
    </div>
  );
};

export default JoinChatRoomPage;
