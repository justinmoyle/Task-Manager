// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-c0554.firebaseapp.com",
  projectId: "taskmanager-c0554",
  storageBucket: "taskmanager-c0554.firebasestorage.app",
  messagingSenderId: "31853129040",
  appId: "1:31853129040:web:de14aed40d46b3cf7f5055",
  measurementId: "G-DR84T87022"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);