import { initializeApp } from "firebase/app";
import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getDatabase } from "firebase/database";

declare global {
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "revents-2024-a25e6.firebaseapp.com",
  projectId: "revents-2024-a25e6",
  databaseURL: "https://revents-2024-a25e6-default-rtdb.firebaseio.com",
  storageBucket: "revents-2024-a25e6.appspot.com",
  messagingSenderId: "157547344353",
  appId: "1:157547344353:web:01dc8a2b67bc1030fae2a0"
};


export const app = initializeApp(firebaseConfig);

if (import.meta.env.Dev) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LfCdckpAAAAALrTVatZzvfm2UO34mMVahiH47nz'),
  isTokenAutoRefreshEnabled: true
});

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const fb = getDatabase(app);