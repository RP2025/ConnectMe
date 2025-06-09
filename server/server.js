// server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());

// Create socket.io server
const io = new Server(server, {
  cors: {
    origin: "*", // Update with your frontend URL in production
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // Join room with user name
  socket.on("join-room", ({ roomId, name }) => {
    socket.join(roomId);
    socket.data.name = name;
    console.log(`${name} joined room: ${roomId}`);

    // Optional: notify room others joined
    socket.to(roomId).emit("receive-message", {
      senderName: "System",
      text: `${name} has joined the room.`,
      timestamp: new Date().toISOString(),
    });
  });

  // Handle incoming chat messages
  socket.on("send-message", (data) => {
    // Broadcast message to everyone in the room (including sender)
    io.to(data.roomId).emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
    // Optional: handle user leaving notification
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
