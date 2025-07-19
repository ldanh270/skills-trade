// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBdsWrp2aMBPOyiRfmFDh3XTnDQCRu1ww",
  authDomain: "auto-send-email-reset-password.firebaseapp.com",
  projectId: "auto-send-email-reset-password",
  storageBucket: "auto-send-email-reset-password.firebasestorage.app",
  messagingSenderId: "12248865290",
  appId: "1:12248865290:web:0efba5368ea4d559e0ddf3",
  measurementId: "G-7YREQDBMQ6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
