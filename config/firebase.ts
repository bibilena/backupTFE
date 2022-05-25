// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 
import { Text, View } from "react-native";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_3mS4EYXQb9i5v_QlXStFd9_GmaNLqpE",
  authDomain: "sandwicherie-tfe.firebaseapp.com",
  databaseURL: "https://sandwicherie-tfe-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sandwicherie-tfe",
  storageBucket: "sandwicherie-tfe.appspot.com",
  messagingSenderId: "164120897087",
  appId: "1:164120897087:web:4c3ef6c20c9c757a287a8a",
  measurementId: "G-J82J7ZTRFJ"
};

// Initialize Firebase


    const app = initializeApp(firebaseConfig);

    export default app;

