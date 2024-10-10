// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2gPPksr6orLMCMJc3cutL5uiVyY_3vDo",
  authDomain: "mohammad-ullah-cvoe.firebaseapp.com",
  databaseURL: "https://mohammad-ullah-cvoe.firebaseio.com",
  projectId: "mohammad-ullah-cvoe",
  storageBucket: "mohammad-ullah-cvoe.appspot.com",
  messagingSenderId: "450353574665",
  appId: "1:450353574665:web:b2143ab99e12c6f09d99d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;