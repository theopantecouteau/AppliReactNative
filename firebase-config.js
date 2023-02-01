import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBt7k7IcC8GiYfVPa8x1qJSIxfapqFL--0",
  authDomain: "influenceurapp-79d4f.firebaseapp.com",
  projectId: "influenceurapp-79d4f",
  storageBucket: "influenceurapp-79d4f.appspot.com",
  messagingSenderId: "437778349353",
  appId: "1:437778349353:web:c49f123099fbfde4574b38",
  measurementId: "G-CX7HQBJL8C"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
