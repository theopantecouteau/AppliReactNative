import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {uploadBytes} from "firebase/storage"; 

export const firebaseConfig = {
  apiKey: "AIzaSyBt7k7IcC8GiYfVPa8x1qJSIxfapqFL--0",
  authDomain: "influenceurapp-79d4f.firebaseapp.com",
  projectId: "influenceurapp-79d4f",
  storageBucket: "influenceurapp-79d4f.appspot.com",
  messagingSenderId: "437778349353",
  appId: "1:437778349353:web:c49f123099fbfde4574b38",
  measurementId: "G-CX7HQBJL8C"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage()
