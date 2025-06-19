import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Page.css';

 


const CreatePage = () => {
     const navigate = useNavigate();
     
  return (
    <div className="container-fluid page-bg d-flex align-items-center justify-content-center vh-100">
      <div className="text-center p-4">
        <div className="welcome-text mb-2">Welcome to</div>
        <h1 className="connect-title mb-4">CONNECT-ME</h1>

        <div className="d-flex flex-column align-items-center gap-4">
           <div className="d-flex justify-content-center gap-4">
                <button className="custom-btn" onClick={() => navigate('/create-chat-room')} >CREATE CHAT ROOM</button> 
                <button className="custom-btn" onClick={() => navigate('/create-video-room')}>CREATE VIDEO ROOM</button>
            </div>
            <button className="custom-btn" onClick={() => navigate('/join-room')} >JOIN</button>
        </div>

      </div>
    </div>
  );
};

export default CreatePage;
