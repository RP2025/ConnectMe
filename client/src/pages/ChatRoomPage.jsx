import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import socket from "../socket";
import "./Page.css";

const ChatRoomPage = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state || {};

  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!name) {
      alert("Name is required to join chat");
      navigate("/join-room");
      return;
    }

    socket.emit("join-room", { roomId, name });

    const receiveMessageHandler = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive-message", receiveMessageHandler);

    return () => {
      socket.off("receive-message", receiveMessageHandler);
    };
  }, [roomId, name, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!msg.trim()) return;

    const messageData = {
      roomId,
      senderName: name,
      text: msg.trim(),
      timestamp: new Date().toISOString(),
    };

    socket.emit("send-message", messageData);
    // Do NOT add message locally here; wait for server to broadcast it back
    setMsg("");
  };

  return (
    <div className="container-fluid page-bg d-flex flex-column vh-100 p-4">
      <h2 className="connect-title text-center mb-3">Room: {roomId}</h2>
      <div
        className="chat-box flex-grow-1 mb-3 p-3"
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflowY: "auto",
          maxHeight: "65vh",
        }}
      >
        {messages.map((m, idx) => (
          <div
            key={idx}
            className="mb-2"
            style={{ textAlign: m.senderName === name ? "right" : "left" }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: m.senderName === name ? "#2575fc" : "#e6e6e6",
                color: m.senderName === name ? "#fff" : "#000",
                padding: "8px 12px",
                borderRadius: "15px",
                maxWidth: "75%",
                wordWrap: "break-word",
              }}
            >
              <strong>{m.senderName}</strong>
              <br />
              {m.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Type your message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="custom-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoomPage;
