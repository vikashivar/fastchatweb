import reportWebVitals from "./reportWebVitals";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC05yXCP69IOE52ibgne6KG1qBggri-4W4",
  authDomain: "fastchat-web.firebaseapp.com",
  projectId: "fastchat-web",
  storageBucket: "fastchat-web.appspot.com",
  messagingSenderId: "688731813423",
  appId: "1:688731813423:web:453b760ce6529747bb78da",
  measurementId: "G-QDP2PTVRN0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default app;
