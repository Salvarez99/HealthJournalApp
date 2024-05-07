// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "Put API Key here",
  authDomain: "Put domain here", 
  projectId: "Put project Id Here", 
  storageBucket: "Put Storage Bucket here", 
  messagingSenderId: "Put sender ID here", 
  appId: "Put AppId here", 
  measurementId: "Put MeasurementId here" 
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
//const analytics = getAnalytics(app);
//const storage = getStorage(app);

//export default firebaseConfig;
//export{storage};
//Initializing Firebase Authentification
