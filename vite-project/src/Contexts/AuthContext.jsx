import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import {
  clearAuthSession,
  getStoredAuthSession,
  saveAuthSession
} from "../Firebase/firebaseAuth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [session, setSession] = useState(getStoredAuthSession());
  const [isLoading, setIsLoading] = useState(true);

  const syncAuthSession = (firebaseUser, nextSession) => {
    setAuthUser(firebaseUser);
    setSession(nextSession);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        clearAuthSession();
        setAuthUser(null);
        setSession(null);
        setIsLoading(false);
        return;
      }

      const storedSession = getStoredAuthSession();

      if (!storedSession || storedSession.uid !== firebaseUser.uid || !storedSession.role) {
        clearAuthSession();
        setAuthUser(firebaseUser);
        setSession(null);
        setIsLoading(false);
        return;
      }

      const updatedSession = await saveAuthSession(firebaseUser, storedSession.role);
      setAuthUser(firebaseUser);
      setSession(updatedSession);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, session, isLoading, syncAuthSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
