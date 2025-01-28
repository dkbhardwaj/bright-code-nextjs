import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMmCYIYGdIHuL_oGQBTV8WNc-2L94HhE4",
  authDomain: "bright-code-dca4b.firebaseapp.com",
  projectId: "bright-code-dca4b",
  storageBucket: "bright-code-dca4b.appspot.com",
  messagingSenderId: "1000041511591",
  appId: "1:1000041511591:web:1f5b137afd8ec30ce13982",
  measurementId: "G-6711SJY44J",
};

// Ensure Firebase is initialized only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Analytics (only on client-side)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, firestore, analytics };
