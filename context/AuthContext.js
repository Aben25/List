import React, { createContext, useState } from 'react';
import { auth } from '../services/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut, // Rename the imported function to avoid conflict with other names
} from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        // ...
        
      });
    } catch (error) {
      console.error(error.code, error.message);
      // Add your custom error handling logic here
      // For example, display an error message to the user
    }
  };

  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.code, error.message);
      // Add your custom error handling logic here
      // For example, display an error message to the user
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
