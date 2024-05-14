import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyC0ew3wu3GR6_5MeR4PYqrz58yLONWz8s0",
    authDomain: "irrp-1e823.firebaseapp.com",
    projectId: "irrp-1e823",
    storageBucket: "irrp-1e823.appspot.com",
    messagingSenderId: "458856537917",
    appId: "1:458856537917:web:4c319e58d6696718ec6f54",
    measurementId: "G-7S1Q2WYBK0"
  };

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestore=getFirestore(app)
export {auth,firestore}

