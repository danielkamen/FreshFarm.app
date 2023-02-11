// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMuJn_o-0si2VLM3ZOPStRiU5TcbQJGV0",
  authDomain: "fresh-farm-app.firebaseapp.com",
  projectId: "fresh-farm-app",
  storageBucket: "fresh-farm-app.appspot.com",
  messagingSenderId: "343657294972",
  appId: "1:343657294972:web:a2961b026e157f9c22edf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);