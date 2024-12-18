import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Use environment variables for Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCsKFj6XOed1JiRGC6Z_C9LW9U-eayKGrk",
  authDomain: "fir-4dbab.firebaseapp.com",
  projectId: "fir-4dbab",
  storageBucket: "fir-4dbab.appspot.com",
  messagingSenderId: "428329879965",
  appId: "1:428329879965:web:d32f5c9b3568372a3d8774",
  measurementId: "G-581MD3W3C6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { app };
