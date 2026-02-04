import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
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

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user logged in");
    }

    // Re-authenticate for security
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // Update the password
    await updatePassword(user, newPassword);
    return true;
  } catch (error) {
    throw error;
  }
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