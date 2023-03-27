// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH_-R4LNSseGdif5MGFQiNH-KWKQZ9p40",
  authDomain: "untether-2fec4.firebaseapp.com",
  projectId: "untether-2fec4",
  storageBucket: "untether-2fec4.appspot.com",
  messagingSenderId: "954866625788",
  appId: "1:954866625788:web:38e7a5c2f4382be66b3b79",
  measurementId: "G-ENRH81YZPE"
};

// Initialize Firebase
// Initialize Firebase
export const fbapp = initializeApp(firebaseConfig);
export const storage = getStorage(fbapp);
export const database = getFirestore(fbapp);
