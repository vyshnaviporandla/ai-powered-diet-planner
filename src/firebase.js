import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKmu5utyRJ-0RA4TjUw6Re9AHv1FvRhOg",
  authDomain: "ai-diet-planner-21090.firebaseapp.com",
  projectId: "ai-diet-planner-21090",
  storageBucket: "ai-diet-planner-21090.firebasestorage.app",
  messagingSenderId: "705944862901",
  appId: "1:705944862901:web:2bd3954897880d06e6befc"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
