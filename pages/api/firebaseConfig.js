import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCOW2aguqYaWiJ7D9qNp7kgsjJVrFYitGs",
  authDomain: "bright-code-tools.firebaseapp.com",
  databaseURL:
    "https://bright-code-tools-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "bright-code-tools",
  storageBucket: "bright-code-tools.firebasestorage.app",
  messagingSenderId: "458773473987",
  appId: "1:458773473987:web:5857262b9f39caceeb9076",
  measurementId: "G-LNRS9KCCBX",
};

const app = initializeApp(firebaseConfig);
const Database = getDatabase(app);
export { Database };
