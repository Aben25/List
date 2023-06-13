import React, { createContext, useState,useEffect } from "react";
import { auth, db } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut, // Rename the imported function to avoid conflict with other names
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { collection, addDoc, setDoc } from "firebase/firestore"; 

import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "The email address is badly formatted.";
      // Add more case statements for other Firebase error codes you want to handle
      default:
        return errorCode;
    }
  };

  const { promptAsync } = Google.useAuthRequest({
    clientId: "664096704221-of2gctqemnjcn6d597rcihpc11toapkj.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  const signInWithGoogle = async () => {
    try {
      const { authentication } = await promptAsync();
      const credential = GoogleAuthProvider.credentialFromResult(authentication);
      if (credential) {
        const { user: firebaseUser } = await signInWithCredential(auth, credential);
        await AsyncStorage.setItem("@user", JSON.stringify(firebaseUser));
        setUser(firebaseUser);
      }
    } catch (error) {
      console.error(error);
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

  const signUp = async (email, password, userName, fullName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => { // Add async here
        const user = userCredential.user;
        console.log(user);
        // get use id
        const uid = user.uid;
        console.log(uid);
        // create user profile information in firebase firestore database by using uid
        try {
          const docRef = await addDoc(collection(db, "users_list"), {
            uid: uid,
            email: email,
            userName: userName,
            fullName: fullName,

          });
          console.log("Document written with ID: ", docRef.id);
        } catch (error) {
          console.error(error);
        }
        
        // save user information in local storage
        AsyncStorage.setItem("@user", JSON.stringify(user));
  
        setUser(user);
      });
    } catch (error) {
      throw new Error(getErrorMessage(error.code));
      console.error(error);
    }
  };
  
  
  

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      await AsyncStorage.removeItem("@user");
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signUp, signOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
