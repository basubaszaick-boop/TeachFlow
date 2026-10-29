import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrkaEu0a2bS5N3FU4xop6Rlkutga1VLww",
  authDomain: "teachflow-be100.firebaseapp.com",
  projectId: "teachflow-be100",
  storageBucket: "teachflow-be100.firebasestorage.app",
  messagingSenderId: "328277015073",
  appId: "1:328277015073:web:9c78621db41c990ff58160",
  measurementId: "G-JYM6JKMYL4",
};

const app = getApps().length > 0
  ? getApp()
  : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);