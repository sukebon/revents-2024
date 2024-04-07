import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

console.log(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  apiKey: "AIzaSyCgHn-3-rX6y7UIRv_l8rlID9a2u_WOyjg",
  authDomain: "revents-2024-a25e6.firebaseapp.com",
  projectId: "revents-2024-a25e6",
  storageBucket: "revents-2024-a25e6.appspot.com",
  messagingSenderId: "157547344353",
  appId: "1:157547344353:web:01dc8a2b67bc1030fae2a0"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);