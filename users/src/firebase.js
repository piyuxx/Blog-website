// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const apikey = process.env.REACT_APP_FIREBASE_API_KEY
console.log(process.env.FIREBASE_API_KEY, "key")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: apikey,
    authDomain: "ecommerce-estate.firebaseapp.com",
    projectId: "ecommerce-estate",
    storageBucket: "ecommerce-estate.appspot.com",
    messagingSenderId: "95932342627",
    appId: "1:95932342627:web:08e9c9d233f8c4f81a3356"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);