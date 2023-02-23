// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMj_d8TKKGDogRdr5GwBFCrw2V0EZ7tk0",
    authDomain: "vuedo-5afde.firebaseapp.com",
    projectId: "vuedo-5afde",
    storageBucket: "vuedo-5afde.appspot.com",
    messagingSenderId: "370647155206",
    appId: "1:370647155206:web:63b577e64742ee803fb987"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firebase auth
const auth = getAuth(app)

//initialize firestore
const db = getFirestore(app)


export { app, auth, db }
