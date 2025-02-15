"use client";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Database } from "../api/firebaseConfig"; // ✅ Ensure this is correctly imported

// Define a type for users
interface UserType {
  id: string;
  title?: string; // Optional if it might be missing
  subtitle?: string; // Optional if it might be missing
}

export default function Home() {
  const [users, setUsers] = useState<UserType[]>([]); // ✅ Typed state

  useEffect(() => {
    const usersRef = ref(Database, "users"); // ✅ Renamed for clarity

    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersArray: UserType[] = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...(data as Omit<UserType, "id">), // ✅ Ensures correct data shape
            })
          );
          setUsers(usersArray);
        } else {
          console.log("No data");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <section className="pt-[120px] bg-purple min-h-screen">
      <div className="container mx-auto max-w-[1600px]">
        <h1 className="text-center">Fetch Data</h1>
        {users.map((user) => (
          <div key={user.id} className="">
            <h2 className="mb-[20px]">{user.title}</h2>
            <p className="text-cosmos">{user.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
