import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut, // Rename the imported function to avoid conflict with other names
  GoogleAuthProvider,
  signInWithCredential,
  sendPasswordResetEmail,
  updatePassword,
  updateEmail,
  
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc, setDoc, updateDoc, doc, getDoc } from "firebase/firestore";

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
        const { uid, email, displayName } = userCredential.user; // Destructure the properties you need
        setUser({ uid, email, displayName }); // Set those properties to state
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
        // create user profile information in firebase firestore database by using uid as document id
        try {
          const docRef = await setDoc(doc(db, "users", uid), {
            uid: uid,
            email: email,
            userName: userName,
            fullName: fullName,
            profilePicture: "",
            bio: "",
            website: "",
            phoneNumber: "",

            createdAt: new Date(),
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

  //forgot password
  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error(getErrorMessage(error.code));
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

  const updateFirebaseProfile = async (user, profile) => {
    try {
      await updateProfile(user, profile);
    } catch (error) {
      console.error(error);
    }
  };


  const updateProfile = async (email, userName, fullName, phoneNumber, address, preference) => {
    try {
      const user = auth.currentUser;
      // if(email != null){
      //   await updateEmail(user, email);
      // }
      // if(userName != null){
      //   await updateFirebaseProfile(user, { displayName: userName });
      // }
      // update user profile information in firebase firestore database by using uid
      const uid = user.uid;
      const docRef = doc(db, "users_list", uid);
      const userData = {
        email,
        userName,
        fullName,
        phoneNumber,
        address,
        preference,
      };

      const validUserData = Object.fromEntries(
        Object.entries(userData).filter(([_, v]) => v !== undefined)
      );

      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        // The document exists, proceed with the update
        await updateDoc(docRef, validUserData);
      } else {
        // The document doesn't exist
        console.error(`No document found with id: ${uid}`);
      }

      // save user information in local storage
      AsyncStorage.setItem("@user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };






  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signUp, signOut, signInWithGoogle, forgotPassword, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
