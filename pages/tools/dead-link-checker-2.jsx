"use client";
import { useState, useEffect } from "react";
import LinkCheckerForm from "./components/LinkCheckerForm";
import ResultsTable from "./components/ResultsTable";
import styles from "./styles/Home.module.css";
import { ref, set } from "firebase/database";
import { Database } from "../api/firebaseConfig";

export default function DeadLinkChecker() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [pagesCrawled, setPagesCrawled] = useState(0);
  const [error, setError] = useState(null);
  const [checkedUrl, setCheckedUrl] = useState(null);
  const [shareableUrl, setShareableUrl] = useState(null);
  const [firebaseKey, setFirebaseKey] = useState(null);

  const handleCheckLinks = async (url, options) => {
    setIsLoading(true);
    setOverallProgress(0);
    setCurrentPage(null);
    setTotalPages(1);
    setPagesCrawled(0);
    setResults([]);
    setError(null);
    setCheckedUrl(url);
    setShareableUrl(null);
  
    const sanitizedUrl = url.replace(/[:/]/g, "_").replace(/\./g, "_");
    const timestamp = Date.now();
    const newKey = `${sanitizedUrl}_${timestamp}`;
    setFirebaseKey(newKey);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 9000);

      const response = await fetch("/api/check-links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ url, options }),
        signal: controller.signal,
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

            if (data.totalPages !== undefined) {
              setTotalPages(data.totalPages);
            }

            if (data.pagesCrawled !== undefined) {
              setPagesCrawled(data.pagesCrawled);
            }

            if (data.overallProgress !== undefined) {
              setOverallProgress(data.overallProgress);
            }

            if (data.currentPage) {
              setCurrentPage(data.currentPage);
            }

            if (data.result && data.result.status === 404 && checkedUrl) {
              setResults((prev) => [...prev, data.result]);
            }
            

            if (data.complete) {
              setOverallProgress(100);
              setCurrentPage(null);
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
    }
  };

  useEffect(() => {
    if (overallProgress === 100 && results.length > 0) {
      const saveToFirebase = async () => {
        setError(null);
        try {
          const db = Database;
          const sanitizedUrl = (checkedUrl || "unknown")
          .replace(/[:/]/g, "_")
          .replace(/\./g, "_");
          const timestamp = Date.now();
          const firebaseKey = `${sanitizedUrl}_${timestamp}`;

          const resultsRef = ref(
            db,
            `dead_link_checker_crawled_sites/${firebaseKey}`
          );          
          await set(resultsRef, {
            url: checkedUrl || "unknown",
            brokenLinks: results,
            timestamp: new Date().toISOString(),
          });

          console.log("Results saved to Firebase successfully");
          setError("Results saved successfully!");
          setTimeout(() => setError(null), 3000);

          const baseUrl =
            typeof window !== "undefined" ? window.location.origin : "";
          setShareableUrl(
            `${baseUrl}/tools/dead-link-report?crawlId=${encodeURIComponent(
              firebaseKey
            )}`
          );
        } catch (error) {
          console.error("Error saving results to Firebase:", error);
          setError("Failed to save results to Firebase: " + error.message);
        }
      };

      saveToFirebase();
    }
  }, [overallProgress, results, checkedUrl]);

  return (
    <section className="section_bgImage bg-darkBlue min-h-screen bg-gray-100 flex flex-col items-center justify-center py-[200px]">
      <div className="container">
        <div className="relative w-[calc(100%-40px)] max-w-4xl p-8 bg-white shadow-lg rounded-lg m-[20px] z-[1]">
          <h1 className="text-2xl font-bold text-darkBlue text-center mb-6">
            404 Link Checker
          </h1>

          {error && (
            <p
              className={`text-center mb-4 ${
                error.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {error}
            </p>
          )}

          {shareableUrl && (
            <div className="text-center mb-4">
              <p className="text-blue-500">
                Shareable URL:{" "}
                <a
                  href={shareableUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {shareableUrl}
                </a>
              </p>
            </div>
          )}

          <p className={styles.description}>
            {overallProgress !== 100
              ? `Crawling ${pagesCrawled} out of ${totalPages} pages...`
              : `Found ${results.length} broken links`}
          </p>

          {isLoading && (
            <div className="mb-4">
              <p>Overall Progress: {Math.round(overallProgress)}%</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          )}

          {currentPage && (
            <div className="mb-4">
              <p className="truncate">
                Current Page: {currentPage.pageUrl} - {currentPage.pageStatus} (
                {Math.round(currentPage.pageProgress)}%)
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    currentPage.pageStatus === "Completed"
                      ? "bg-green-500"
                      : currentPage.pageStatus === "Failed"
                      ? "bg-red-500"
                      : "bg-blue-500"
                  }`}
                  style={{ width: `${currentPage.pageProgress}%` }}
                />
              </div>
            </div>
          )}

          {overallProgress !== 100 && (
           <LinkCheckerForm
              key={checkedUrl} 
              onSubmit={handleCheckLinks}
              isLoading={isLoading}
              progress={overallProgress}
            />
         
          )}

          {results.length === 0 && overallProgress === 100 ? (
            <h3>No broken links found</h3>
          ) : (
            results.length > 0 && (
              <ResultsTable results={results} isLoading={isLoading} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
