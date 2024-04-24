// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlE8l_1HGan1DZwo-Lql2rHBFpJwuLwfA",
  authDomain: "health-journaling-app.firebaseapp.com",
  projectId: "health-journaling-app",
  storageBucket: "health-journaling-app.appspot.com",
  messagingSenderId: "410912398218",
  appId: "1=410912398218=web=e54a2e1153d6213d75c673",
  measurementId: "G-HFDYYR7V90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export default firebaseConfig;
export{storage};