// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0E9SZ1eFLKI7D1oef0ILnqcMm64ZR1Qg",
  authDomain: "react-final-project-e9cde.firebaseapp.com",
  projectId: "react-final-project-e9cde",
  storageBucket: "react-final-project-e9cde.firebasestorage.app",
  messagingSenderId: "663626646070",
  appId: "1:663626646070:web:79fff2b842a4ff08b5ce97"
};


const app = initializeApp(firebaseConfig); // מאתחל את פרויקט Firebase שלך בתוך האפליקציה, באמצעות ההגדרות (firebaseConfig) שקיבלת מהקונסול של Firebase.
const db = getFirestore(app) // יוצר חיבור ל־Firestore (בסיס הנתונים של Firebase) עבור האפליקציה שהרגע אתחלת.
export const auth = getAuth(app);
export default db
