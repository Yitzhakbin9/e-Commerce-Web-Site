import "dotenv/config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const getRequiredEnv = (primaryKey, fallbackKey) => {
  const value = process.env[primaryKey] ?? process.env[fallbackKey];

  if (!value) {
    throw new Error(
      `Missing Firebase env var. Expected ${primaryKey}` +
        (fallbackKey ? ` or ${fallbackKey}` : "")
    );
  }

  return value;
};

const firebaseConfig = {
  apiKey: getRequiredEnv("VITE_FIREBASE_API_KEY", "FIREBASE_API_KEY"),
  authDomain: getRequiredEnv("VITE_FIREBASE_AUTH_DOMAIN", "FIREBASE_AUTH_DOMAIN"),
  projectId: getRequiredEnv("VITE_FIREBASE_PROJECT_ID", "FIREBASE_PROJECT_ID"),
  storageBucket: getRequiredEnv(
    "VITE_FIREBASE_STORAGE_BUCKET",
    "FIREBASE_STORAGE_BUCKET"
  ),
  messagingSenderId: getRequiredEnv(
    "VITE_FIREBASE_MESSAGING_SENDER_ID",
    "FIREBASE_MESSAGING_SENDER_ID"
  ),
  appId: getRequiredEnv("VITE_FIREBASE_APP_ID", "FIREBASE_APP_ID"),
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
