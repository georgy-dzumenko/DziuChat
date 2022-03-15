// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { config } from "../config";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: config.MY_API_KEY,
  authDomain: "dziu-chat.firebaseapp.com",
  projectId: "dziu-chat",
  storageBucket: "dziu-chat.appspot.com",
  messagingSenderId: "548329777610",
  appId: "1:548329777610:web:f3ee842291cd6477494733",
  measurementId: "G-YTQ2DKXWRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);