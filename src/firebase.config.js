// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import getFireStore from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDE1h3nV8KIfkmslMAg_jAriQVWgB-l_6E",
  authDomain: "house-marketplace-app-dfd26.firebaseapp.com",
  projectId: "house-marketplace-app-dfd26",
  storageBucket: "house-marketplace-app-dfd26.appspot.com",
  messagingSenderId: "512493118904",
  appId: "1:512493118904:web:59d0604b626f7381d11b4d",
  measurementId: "G-ZPWWPVVPRL",
};

// Initialize Firebase
// const app = 
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFireStore()
