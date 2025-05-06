"use client";
import { useState, useEffect, useRef } from "react";
import LinkCheckerForm from "./components/LinkCheckerForm";
import ResultsTable from "./components/ResultsTable";
import styles from "./styles/Home.module.css";
import { ref, set } from "firebase/database";
import { Database } from "../api/firebaseConfig";

export default function DeadLinkChecker() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [checkedUrl, setCheckedUrl] = useState(null);
  const [shareableUrl, setShareableUrl] = useState(null);
  const controllerRef = useRef(null); // Store AbortController

  // Reset state on mount
  useEffect(() => {
    setResults([]);
    setProgress(0);
    setError(null);
    setCheckedUrl(null);
    setShareableUrl(null);
    setIsLoading(false);
  }, []);

  // Cleanup on unmount (e.g., refresh)
  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort(); // Abort ongoing fetch on unmount
      }
    };
  }, []);

  const handleCheckLinks = async (url, options) => {
    // Abort any existing request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    setIsLoading(true);
    setProgress(0);
    setResults([]);
    setError(null);
    setCheckedUrl(url);
    setShareableUrl(null);

    try {
      controllerRef.current = new AbortController();
      const timeout = setTimeout(() => controllerRef.current?.abort(), 30000); // Increase to 30s

      const response = await fetch("/api/check-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, options }),
        signal: controllerRef.current.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;

          try {
            const dataStr = line.substring(5).trim();
            if (!dataStr) continue;

            const data = JSON.parse(dataStr);

            if (data.error) {
              throw new Error(data.error);
            }

            if (data.progress !== undefined) {
              setProgress(data.progress);
            }

            if (data.result) {
              if (data?.result?.status == 404) {
                setResults((prev) => [...prev, data.result]);
              }
            }

            if (data.complete) {
              setProgress(100);
            }
          } catch (e) {
            console.error("Error parsing JSON chunk:", e, "Line:", line);
            setError("Error processing server response");
          }
        }
      }
    } catch (error) {
      console.error("Error checking links:", error);
      setError(
        error.name === "AbortError"
          ? "Request timed out. Try a smaller website or fewer pages."
          : error.message
      );
    } finally {
      setIsLoading(false);
      controllerRef.current = null; // Clear controller
    }
  };

  // Rest of the code (useEffect for Firebase, JSX) remains unchanged
  // ...
}
