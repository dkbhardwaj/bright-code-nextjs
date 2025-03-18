"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router"; // Import useRouter hook for query handling
import { Bar } from "react-chartjs-2";
import Image from "next/image";
import Link from "next/link";
import { getDatabase, push, ref, set } from "firebase/database";
import { Database } from "../api/firebaseConfig";
export default function DeadLinkChecker() {
  const [url, setUrl] = useState<string>("");
  const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); // Access router for query parameter updates

  const handleAnalyzeClick = (): void => {
    // if (!url.trim()) {
    //   setError("Please enter a valid URL.");
    //   return;
    // }
    // setFetched(true);
    // fetchWebsiteData();
  };

  const handleClearInput = (): void => {
    setUrl(""); // Clear the URL input
    router.push("/", undefined, { shallow: true }); // Remove URL from query
  };
  const fetchWebsiteData = (): void => {
    setUrl(""); // Clear the URL input
    router.push("/", undefined, { shallow: true }); // Remove URL from query
  };
  return (
    <>
      {!loading &&  (
        <section className=" section_bgImage bg-darkBlue min-h-screen bg-gray-100 flex flex-col items-center justify-center ">
          <div className="w-[calc(100%-40px)] max-w-4xl p-8 bg-white shadow-lg rounded-lg m-[20px] z-[1]">
            <h1 className="text-2xl font-bold text-darkBlue text-center mb-6">
              Website Analyzer
            </h1>

            {!fetched && (
              <div className="space-y-4">
                {/* URL Input with Clear Icon */}
                <div className="relative">
                  <input
                    ref={inputRef}
                    aria-label="Enter website URL"
                    className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleAnalyzeClick();
                      }
                    }}
                    placeholder="Enter website URL"
                  />
                  {url && (
                    <button
                      type="button"
                      onClick={handleClearInput}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      title="Clear input"
                      aria-label="Clear input field"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Analyze Button */}
                <button
                  className={`relative w-full py-3 text-white rounded-lg font-semibold ${
                    loading
                      ? "bg-indigo-300 cursor-not-allowed"
                      : "bg-indigo-500 hover:bg-indigo-600"
                  }`}
                  onClick={handleAnalyzeClick}
                  disabled={loading}
                >
                  {loading ? "Analyzing..." : "Analyze"}
                </button>
              </div>
            )}

            {fetched && loading && (
              <p className="mt-6 text-center text-gray-500 font-semibold">
                Analyzing, please
                wait...
              </p>
            )}

            {/* {error && (
              <p className="mt-4 text-red-500 text-center font-medium">
                {error}
              </p>
            )} */}
          </div>
        </section>
      )}
    </>
  );
}
