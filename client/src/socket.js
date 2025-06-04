// src/socket.js
import { io } from "socket.io-client";

// Replace with your backend URL or localhost if testing locally
const SOCKET_SERVER_URL = "http://localhost:5000";

const socket = io(SOCKET_SERVER_URL, {
  autoConnect: false,  // manual connect control (optional)
});

// Connect immediately (optional, you can also connect manually)
socket.connect();

export default socket;
