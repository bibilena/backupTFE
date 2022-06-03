// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_3mS4EYXQb9i5v_QlXStFd9_GmaNLqpE",
  authDomain: "sandwicherie-tfe.firebaseapp.com",
  databaseURL:
    "https://sandwicherie-tfe-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sandwicherie-tfe",
  storageBucket: "sandwicherie-tfe.appspot.com",
  messagingSenderId: "164120897087",
  appId: "1:164120897087:web:4c3ef6c20c9c757a287a8a",
  measurementId: "G-J82J7ZTRFJ",
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export default fireDB;
