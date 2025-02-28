import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDStmixa5iTZplY3tKvFC5cpG1GWhg9luE",
  authDomain: "bright-code-f0c2e.firebaseapp.com",
  databaseURL:
    "https://bright-code-f0c2e-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "bright-code-f0c2e",
  storageBucket: "bright-code-f0c2e.firebasestorage.app",
  messagingSenderId: "38371406371",
  appId: "1:38371406371:web:3ea037e8f64ea6c8007796",
  measurementId: "G-J91P2MK2R5",
};

const app = initializeApp(firebaseConfig);
const Database = getDatabase(app);
export { Database };
