// server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*", // Replace with frontend domain in production
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("join-room", ({ roomId, name }) => {
    socket.join(roomId);
    socket.data.name = name;
    console.log(`👥 ${name} joined room ${roomId}`);

    const joinMessage = {
      senderName: "System",
      text: `${name} has joined the chat.`,
      timestamp: new Date().toISOString(),
    };

    io.to(roomId).emit("receive-message", joinMessage);
  });

  socket.on("send-message", (data) => {
    io.to(data.roomId).emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    const name = socket.data.name;
    if (!name) return;

    // Notify rooms this user was in
    const disconnectMessage = {
      senderName: "System",
      text: `${name} left the chat.`,
      timestamp: new Date().toISOString(),
    };

    // Get all rooms this socket was part of
    const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
    rooms.forEach((roomId) => {
      socket.to(roomId).emit("receive-message", disconnectMessage);
    });

    console.log(`🔴 ${name} disconnected`);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
