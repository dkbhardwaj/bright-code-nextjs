
import { getFirestore, doc, getDoc } from "firebase/firestore"; 


import { db } from "@/src/lib/firebase/clientApp";

export async function getDocument() {
  try {
    const docRef = doc(db, 'domain', 'surescripts.com');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}