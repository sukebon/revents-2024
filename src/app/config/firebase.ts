import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "revents-2024-a25e6",
  storageBucket: "revents-2024-a25e6.appspot.com",
  messagingSenderId: "157547344353",
  appId: "1:157547344353:web:01dc8a2b67bc1030fae2a0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);