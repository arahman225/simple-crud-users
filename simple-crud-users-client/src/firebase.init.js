// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhfjHByJNMUAX0UY9VYYHhhpelR-iKSQU",
  authDomain: "simple-crud-coffee-user.firebaseapp.com",
  projectId: "simple-crud-coffee-user",
  storageBucket: "simple-crud-coffee-user.firebasestorage.app",
  messagingSenderId: "1021355821821",
  appId: "1:1021355821821:web:bea7d2cd628cad971a8c94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);