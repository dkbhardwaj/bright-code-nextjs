"use client";
import { get, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { Database } from "../api/firebaseConfig"; // ✅ Ensure correct import

// Define user type
interface UserType {
  id: string;
  title?: string;
  subtitle?: string;
}

export default function Home() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");

  console.log(users);

  // Function to add data to Firebase
  const handleAddData = async () => {
    if (!title.trim() || !subtitle.trim())
      return alert("Both fields are required!"); // ✅ Prevent empty inputs

    try {
      const usersRef = ref(Database, "users");
      const newDataRef = push(usersRef);
      await set(newDataRef, { title, subtitle }); // ✅ Now storing subtitle too

      setTitle(""); // Reset input field
      setSubtitle(""); // Reset subtitle field
      alert("Data Added Successfully!!");
    } catch (error) {
      console.error("Firebase Error: ", error);
    }
  };

  // Fetch users from Firebase
  useEffect(() => {
    const usersRef = ref(Database, "users");

    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersArray: UserType[] = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...(data as Omit<UserType, "id">),
            })
          );
          setUsers(usersArray);
        } else {
          console.log("No data found");
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
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

      <div className="container mx-auto max-w-[1600px]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1>Add Data</h1>
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-4 mb-2"
            />
            <input
              type="text"
              placeholder="Subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full border p-4 mb-4"
            />
            <button onClick={handleAddData} className="submit-btn">
              Add Data
            </button>
          </div>
        </main>
      </div>
    </section>
  );
}
