// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCnrhpuVs723QlYMpKEGC4AflvOOrx1TsE",
    authDomain: "toy-story-cb4f4.firebaseapp.com",
    projectId: "toy-story-cb4f4",
    storageBucket: "toy-story-cb4f4.firebasestorage.app",
    messagingSenderId: "377177177736",
    appId: "1:377177177736:web:938af15a09d6a7acdee93d"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(firebase);

export { auth, googleProvider, db };