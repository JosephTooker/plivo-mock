// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
import { getAuth } from "firebase/auth"
import { getFunctions } from 'firebase/functions';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCWNnXZWspBsUh5gXigYqdhE6UKZWX_jdk",
  authDomain: "plivo-testing-a703f.firebaseapp.com",
  projectId: "plivo-testing-a703f",
  storageBucket: "plivo-testing-a703f.appspot.com",
  messagingSenderId: "967339940207",
  appId: "1:967339940207:web:3c281f76634bb1c55d709a",
  measurementId: "G-CME24BQTJ3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);




