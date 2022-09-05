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
  apiKey: "AIzaSyCWuPpTErML8WOLcEag_jxAgfcF8I3fboU",
  authDomain: "plivo-mock.firebaseapp.com",
  databaseURL: "https://plivo-mock-default-rtdb.firebaseio.com",
  projectId: "plivo-mock",
  storageBucket: "plivo-mock.appspot.com",
  messagingSenderId: "162974648414",
  appId: "1:162974648414:web:9386ecae6975dd255ecccf",
  measurementId: "G-ZSTH9D2S4P"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);




