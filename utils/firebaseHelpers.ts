import { firestore } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { WebsiteData } from './types'; // Import WebsiteData interface

// Save Data to Firestore
// Function to save data to Firestore
const saveToFirestore = async (url: string, data: WebsiteData) => {
  try {
    const docRef = doc(firestore, "websiteData", url);
    await setDoc(docRef, data);  // Save the data to Firestore
  } catch (error) {
    console.error("Error saving data to Firestore:", error);
  }
};

  
  // Function to fetch data from Firestore
  const fetchFromFirestore = async (url: string) => {
    try {
      const docRef = doc(firestore, "websiteData", url);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();  // Return the data if document exists
      } else {
        console.log("No data found for the URL.");
        return null;  // Return null if no data found
      }
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
      return null;
    }
  };
  
  
  export { saveToFirestore, fetchFromFirestore };
  
