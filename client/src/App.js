import React from 'react';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import CreateChatRoomPage from './pages/CreateChatRoomPage';
import CreateVideoRoomPage from './pages/CreateVideoRoomPage';
import JoinChatRoomPage from './pages/JoinChatRoomPage';
import ChatRoomPage from './pages/ChatRoomPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-chat-room" element={<CreateChatRoomPage />} />
        <Route path="/create-video-room" element={<CreateVideoRoomPage />} />
        <Route path="/join-room" element={<JoinChatRoomPage />} />
        <Route path="/chat/:roomId" element={<ChatRoomPage />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
