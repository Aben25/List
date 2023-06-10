import React, { createContext, useState } from "react";
import { auth } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut, // Rename the imported function to avoid conflict with other names
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getErrorMessage = (errorCode) => {
    switch(errorCode) {
      case 'auth/invalid-email':
        return 'The email address is badly formatted.';
      // Add more case statements for other Firebase error codes you want to handle
      default:
        return 'An unknown error occurred. Please try again.';
    }
  };
  

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      });
    } catch (error) {
      throw new Error(getErrorMessage(error.code));
    }
  };
  
  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(getErrorMessage(error.code));
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
