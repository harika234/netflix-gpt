// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL2XcaSQfzo2VxE7T4jPBB_cwajFkCcBI",
  authDomain: "netflixgpt-e09fc.firebaseapp.com",
  projectId: "netflixgpt-e09fc",
  storageBucket: "netflixgpt-e09fc.firebasestorage.app",
  messagingSenderId: "329075553729",
  appId: "1:329075553729:web:e7513273d537b18476ab40",
  measurementId: "G-T82FYT0QH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();