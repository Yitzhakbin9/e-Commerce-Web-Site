import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth } from "./firebase"


export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};



export const errorMsgFromFirebaseAuth = (msg) => {
  switch (msg) {
    case "auth/missing-email":
      return 'Insert mail';
    case "auth/invalid-email":
      return 'Invalid email';
    case "auth/missing-password":
      return 'Enter password';
    case "auth/weak-password":
      return 'come-on, you need a better password';
    case "auth/email-already-in-use":
      return "This mail is already exist";
    case "auth/wrong-password":
    case "auth/user-not-found":
    case "auth/invalid-credential":
      return 'Invalid Email / password';
    case "auth/network-request-failed":
      return 'Connection error, try again';
    default:
      return 'error';
  }
}