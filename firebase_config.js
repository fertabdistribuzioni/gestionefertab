// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXY7RU2nNKwNZ5qf8PzNIT4S_PNQ_nA1Q",
  authDomain: "fertabdistribuzioni-28efb.firebaseapp.com",
  projectId: "fertabdistribuzioni-28efb",
  storageBucket: "fertabdistribuzioni-28efb.firebasestorage.app",
  messagingSenderId: "359426280235",
  appId: "1:359426280235:web:4ab3fe8895a2c0b078d36e",
  measurementId: "G-QPQYYC1DXS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { auth, signInWithEmailAndPassword, db };
