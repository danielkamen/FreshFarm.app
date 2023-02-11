// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxh_mXa4iaNFTqn2_veRwi5LvgarFGTik",
  authDomain: "hackbeanpot23.firebaseapp.com",
  projectId: "hackbeanpot23",
  storageBucket: "hackbeanpot23.appspot.com",
  messagingSenderId: "708224347704",
  appId: "1:708224347704:web:d12166ea1f9885cc9a00cd",
  measurementId: "G-N0MPKZVGVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);