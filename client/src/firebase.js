// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


  const firebaseConfig = {
  apiKey: "AIzaSyBjPsl--J_vRFuOjNSPWEKWcHUyERVM19Q",
  authDomain: "connectme-a211d.firebaseapp.com",
  projectId: "connectme-a211d",
  storageBucket: "connectme-a211d.firebasestorage.app",
  messagingSenderId: "241045449625",
  appId: "1:241045449625:web:6dc1905428253381214108",
  measurementId: "G-0PZ4NRGX89"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
