// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZjNC5RjnLBTLeluBnB2lsDWeXUbaSW1g",
  authDomain: "stock-trading-analyser.firebaseapp.com",
  projectId: "stock-trading-analyser",
  storageBucket: "stock-trading-analyser.firebasestorage.app",
  messagingSenderId: "615861611205",
  appId: "1:615861611205:web:1b0472063c7c3665d31eac",
  measurementId: "G-R3JYRG94FH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Authentication functions
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
  return signOut(auth);
};

export { onAuthStateChanged };