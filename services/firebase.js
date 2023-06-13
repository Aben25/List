import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


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




export { auth, db };