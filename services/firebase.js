import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {  getStorage, ref, uploadString, getDownloadURL,uploadBytes  } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB6OfVYR51SPB4z-D6v1i6UonKaDnqlsM8",
  authDomain: "addislist-708e2.firebaseapp.com",
  projectId: "addislist-708e2",
  storageBucket: "addislist-708e2.appspot.com",
  messagingSenderId: "436140874213",
  appId: "1:436140874213:web:f0bdf0f6dc1be36feaf70c",
  measurementId: "G-V70QC17ELV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref(storage, 'some-child');

const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
uploadBytes(storageRef, bytes).then((snapshot) => {
  console.log('Uploaded an array!');
});



export { auth, db, app };
