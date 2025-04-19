// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBghDU80bZsztQLuJzr9Vo4z2zLlI-Ep_8",
  authDomain: "superbase-d981f.firebaseapp.com",
  projectId: "superbase-d981f",
  storageBucket: "superbase-d981f.firebasestorage.app",
  messagingSenderId: "183937038531",
  appId: "1:183937038531:web:76e939db232e476b8b4a76",
  measurementId: "G-82H206SZ83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)
export{app, analytics,auth, db}