// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC76w-znXQDiiulx0Ic5-5tqOaNRIwvMM4",
  authDomain: "reactapps-62a87.firebaseapp.com",
  projectId: "reactapps-62a87",
  storageBucket: "reactapps-62a87.appspot.com",
  messagingSenderId: "154094791197",
  appId: "1:154094791197:web:51ff3365503e270cf1f4f4"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );