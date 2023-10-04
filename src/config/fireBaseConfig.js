// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//  import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Allows you to connect to db
import { getFirestore } from "firebase/firestore";

// For Auth
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq-13sKeqWNmkQNJo-ndjM29H8i63THlI",
  authDomain: "blog-c1f14.firebaseapp.com",
  projectId: "blog-c1f14",
  storageBucket: "blog-c1f14.appspot.com",
  messagingSenderId: "295771601634",
  appId: "1:295771601634:web:117c2b97d0b76488c5bcbb",
  measurementId: "G-K263SY1ZJF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//  const analytics = getAnalytics(app);

// Set up database and export it
export const db = getFirestore(app)

//  Set up and initialize Authentication for export it 
export const auth = getAuth(app)
