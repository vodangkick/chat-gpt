import {getApp, getApps, initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyBBjoCAhGrMpK9k98lmIbP6GXW1vFEl6PM",
  authDomain: "chatgpt-f594d.firebaseapp.com",
  projectId: "chatgpt-f594d",
  storageBucket: "chatgpt-f594d.appspot.com",
  messagingSenderId: "1075704231214",
  appId: "1:1075704231214:web:57560bf45bff653ac336bf",
  measurementId: "G-1V3V3TDB0P"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}
