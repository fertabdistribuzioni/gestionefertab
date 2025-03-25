<<<<<<< HEAD
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB87ErUyUGARKyWwBFuVNJEU1R2ZrHoIuY",
  authDomain: "fertabdistribuzioni-259b5.firebaseapp.com",
  projectId: "fertabdistribuzioni-259b5",
  storageBucket: "fertabdistribuzioni-259b5.firebasestorage.app",
  messagingSenderId: "190560040474",
  appId: "1:190560040474:web:b0063c7ae3f9873a23c3a3",
  measurementId: "G-813EK68Y9M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { auth, googleProvider, db };
=======
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB87ErUyUGARKyWwBFuVNJEU1R2ZrHoIuY",
  authDomain: "fertabdistribuzioni-259b5.firebaseapp.com",
  projectId: "fertabdistribuzioni-259b5",
  storageBucket: "fertabdistribuzioni-259b5.firebasestorage.app",
  messagingSenderId: "190560040474",
  appId: "1:190560040474:web:b0063c7ae3f9873a23c3a3",
  measurementId: "G-813EK68Y9M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { db };
>>>>>>> 7db0200bf0e2d283e2d1d8e37987df224a693fa4
