// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpgaJ78DZUl7R5FVKYPPCnQJo_Cpgp15c",
  authDomain: "justbaked-7f4b6.firebaseapp.com",
  projectId: "justbaked-7f4b6",
  storageBucket: "justbaked-7f4b6.appspot.com",
  messagingSenderId: "437394347205",
  appId: "1:437394347205:web:94fda957fef95065520cac",
  measurementId: "G-4059VS52JB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");
// const analytics = getAnalytics(app);

export { auth, googleProvider, appleProvider };