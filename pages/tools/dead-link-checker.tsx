"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function DeadLinkChecker() {
  const [url, setUrl] = useState<string>("");
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [brokenLinks, setBrokenLinks] = useState<string[]>([]); // Store 404 links
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleAnalyzeClick = async (): Promise<void> => {
    if (!url.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    setFetched(true);
    setError(null);
    setBrokenLinks([]);
    const apiBase =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://bright-code-nextjs-git-application-bright-code.vercel.app";
    try {
      const response = await fetch(`${apiBase}/api/analyze-dead-links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (response.ok) {
        setBrokenLinks(data.brokenLinks);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to fetch links. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearInput = (): void => {
    setUrl("");
    setFetched(false);
    setBrokenLinks([]);
    setError(null);
    router.push("/", undefined, { shallow: true });
  };

  return (
    <section className="section_bgImage bg-darkBlue min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-[calc(100%-40px)] max-w-4xl p-8 bg-white shadow-lg rounded-lg m-[20px] z-[1]">
        <h1 className="text-2xl font-bold text-darkBlue text-center mb-6">
          Website Analyzer
        </h1>

        {!fetched && (
          <div className="space-y-4">
            <div className="relative">
              <input
                ref={inputRef}
                aria-label="Enter website URL"
                className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
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

            <button
              className={`w-full py-3 text-white rounded-lg font-semibold ${
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

        {fetched && (
          <div className="mt-6">
            {loading && (
              <p className="text-center text-gray-500 font-semibold">
                Analyzing, please wait...
              </p>
            )}
            {!loading && brokenLinks.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-darkBlue">
                  Broken Links Found ({brokenLinks.length})
                </h2>
                <ul className="mt-2 space-y-2">
                  {brokenLinks.map((link, index) => (
                    <li key={index} className="text-red-500 break-all">
                      <Link href={link} target="__blank"> {link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!loading && brokenLinks.length === 0 && !error && (
              <p className="text-center text-green-500 font-semibold">
                No broken links found!
              </p>
            )}
            {error && (
              <p className="mt-4 text-red-500 text-center font-medium">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
