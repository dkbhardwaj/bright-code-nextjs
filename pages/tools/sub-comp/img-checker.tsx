"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router"; // Import useRouter hook for query handling
import { Bar } from "react-chartjs-2";
import Image from "next/image";
import Link from "next/link";
import { getDatabase, push, ref, set } from "firebase/database";
import { Database } from "../../api/firebaseConfig.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Image {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  fileSize?: number;
}
interface Link {
  url: string;
  status: number;
}

export default function ImgChecker() {
  console.log("object")
  const [url, setUrl] = useState<string>("");
  const [scope, setScope] = useState<"page" | "site">("page");
  const [images, setImages] = useState<Image[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [fetched, setFetched] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [report, setReport] = useState<{
    totalLinks: number;
    totalLinksWithIssues: number;
    hosts: string[];
    issueTypes: { [key: string]: number };
    linkTypes: { [key: string]: number };
    startUrl: string;
  } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter(); // Access router for query parameter updates

  useEffect(() => {
    if (!router.isReady) return;
    
    // Focus logic (only runs once)
    if (inputRef.current) {
        inputRef.current.focus();
    }

    // Skip if URL matches query param already
    const currentQueryUrl = router.query.url as string | undefined;
    if (url) {
        if (currentQueryUrl !== url) {
        router.push(`?url=${encodeURIComponent(url)}`, undefined, {
            shallow: true,
        });
        }
    } else if (currentQueryUrl) {
        // Only clear if there was a URL in query params
        router.push(router.pathname, undefined, { shallow: true });
    }
   }, [url, router.isReady]); // Remove router from dependencies

  const fetchWithTimeout = async (
    url: string,
    options: RequestInit,
    timeout: number
  ): Promise<Response> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timer);
      return response;
    } catch (err) {
      clearTimeout(timer);
      if (err instanceof DOMException && err.name === "AbortError") {
        throw new Error("Request timed out");
      }
      throw err;
    }
  };

  const fetchWebsiteData = async (): Promise<void> => {
    setLoading(true);
    setError("");
    setImages([]);
    setLinks([]);
    setReport(null);
    setHasSaved(false);
    setCrawlId(null);

    // Ensure URL starts with http:// or https://
    const formattedUrl = formatUrl(url);

    const retryFetch = async (retries: number): Promise<Response> => {
      try {
        // console.log(`Fetching data... Attempts left: ${retries}`);
        const response = await fetchWithTimeout(
          `/api/analyze-images?url=${encodeURIComponent(
            formatUrl(url)
          )}&scope=page`,
          { method: "GET" },
          30000 // Timeout after 30 seconds
        );

        if (!response.ok) {
          if (retries > 0) {
            console.warn(`Retrying due to error: ${response.statusText}`);
            throw new Error(response.statusText);
          }
        }

        return response;
      } catch (err) {
        if (retries > 0) {
          return await retryFetch(retries - 1);
        }
        console.error("Final error after retries:", err);
        throw err;
      }
    };

    try {
      const response = await retryFetch(3); // Retry up to 3 times
      const data = await response.json();

      if (response.ok) {
        setImages(data.images || []);
        setLinks(data.links || []);
        setReport({
          totalLinks: data.totalLinks || 0,
          totalLinksWithIssues: data.totalLinksWithIssues || 0,
          hosts: data.hosts || [],
          issueTypes: data.issueTypes || {},
          linkTypes: data.linkTypes || {},
          startUrl: data.startUrl || formattedUrl,
        });
      } else {
        setError(data.error || "Failed to analyze the site.");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error && err.message === "Request timed out"
          ? "The request timed out. Please try again later."
          : "An error occurred while analyzing the site."
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to ensure the URL starts with http:// or https://
  const formatUrl = (url: string): string => {
    try {
      const formattedUrl = new URL(url);
      return formattedUrl.href; // Return the properly formatted URL
    } catch {
      return `http://${url.trim()}`; // If invalid, prepend http://
    }
  };

  const handleAnalyzeClick = (): void => {
    if (!url.trim()) {
      setError("Please enter a valid URL.");
      return;
    }
    setFetched(true);
    fetchWebsiteData();
  };

  const handleClearInput = (): void => {
    setUrl(""); // Clear the URL input
    router.push("/", undefined, { shallow: true }); // Remove URL from query
  };
  const liBefore = `before:content['] before:absolute before:top-0 before:-left-1/2 before:w-full before:h-full before:bg-black before:z-[-1]`;

  const uniqueImages = images.filter(
    (image, index, self) => index === self.findIndex((t) => t.src === image.src) // Remove duplicates by src
  );

  // Default sorted data
  const DescSortedUniqueImages = [...uniqueImages].sort(
    (a, b) => (b.fileSize || 0) - (a.fileSize || 0)
  );

  const AscSortedUniqueImages = [...uniqueImages].sort(
    (a, b) => (a.fileSize || 0) - (b.fileSize || 0)
  );

  // Filter images with fileSize greater than 100 KB
  const largeImages = uniqueImages.filter(
    (image) => (image.fileSize || 0) > 100 * 1024
  );

  const DescSortedLargeImages = [...largeImages].sort(
    (a, b) => (b.fileSize || 0) - (a.fileSize || 0)
  );
  const AscSortedLargeImages = [...largeImages].sort(
    (a, b) => (a.fileSize || 0) - (b.fileSize || 0)
  );

  // Centralized state for sort direction and table data
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [tableData, setTableData] = useState(DescSortedUniqueImages);
  const [largeImageTableData, setLargeImageTableData] = useState(
    DescSortedLargeImages
  );

  // Filter images with null or undefined fileSize
  const nullFileSizeImages = DescSortedUniqueImages.filter(
    (image) => image.fileSize == null
  );

  // Sorted data for null file size images
  const DescSortedNullFileSizeImages = [...nullFileSizeImages].sort(
    (a, b) => (b.width || 0) - (a.width || 0) // Example: Sorting by width (you can change this criteria)
  );
  const AscSortedNullFileSizeImages = [...nullFileSizeImages].sort(
    (a, b) => (a.width || 0) - (b.width || 0)
  );

  // State for null file size images table data
  const [nullFileSizeImagesTableData, setNullFileSizeImagesTableData] =
    useState(DescSortedNullFileSizeImages);

  // Update sorting for null file size images
  const toggleSort = () => {
    const newDirection = sortDirection === "desc" ? "asc" : "desc";
    setSortDirection(newDirection);

    // Update all tables
    if (newDirection === "asc") {
      setTableData([...AscSortedUniqueImages]);
      setLargeImageTableData([...AscSortedLargeImages]);
      setNullFileSizeImagesTableData([...AscSortedNullFileSizeImages]); // Null file size table
    } else {
      setTableData([...DescSortedUniqueImages]);
      setLargeImageTableData([...DescSortedLargeImages]);
      setNullFileSizeImagesTableData([...DescSortedNullFileSizeImages]); // Null file size table
    }
  };

  // Automatically update null file size table on tab change
  useEffect(() => {
    if (sortDirection === "asc") {
      setTableData([...AscSortedUniqueImages]);
      setLargeImageTableData([...AscSortedLargeImages]);
      setNullFileSizeImagesTableData([...AscSortedNullFileSizeImages]); // Null file size table
    } else {
      setTableData([...DescSortedUniqueImages]);
      setLargeImageTableData([...DescSortedLargeImages]);
      setNullFileSizeImagesTableData([...DescSortedNullFileSizeImages]); // Null file size table
    }
  }, [activeTab, sortDirection]);

  // firestore variables
  const saveCrawlOverview = async (
    report: any,
    uniqueImages: any[],
    images: any[]
  ): Promise<string | null> => {
    // console.log("saveCrawlOverview started");
    try {
      const sanitizedUrl = report.startUrl.replace(/[^a-zA-Z0-9]/g, "_");
      const crawlId = `${sanitizedUrl}-${Date.now()}`;

      // Filtering images with large file size and null file size
      const largeImages = uniqueImages.filter(
        (image) => (image.fileSize || 0) > 100 * 1024
      );
      const nullFileSizeImages = uniqueImages.filter(
        (image) => image.fileSize === null
      );

      const imageDetailsFormatted = uniqueImages.map((image) => ({
        src: image.src,
        width: image.width || "N/A",
        height: image.height || "N/A",
        fileSize: image.fileSize
          ? `${(image.fileSize / 1024).toFixed(2)} KB`
          : "N/A",
        alt: image.alt || "No Alt Text",
      }));

      const largeImagesFormatted = largeImages.map((image) => ({
        src: image.src,
        width: image.width || "N/A",
        height: image.height || "N/A",
        fileSize: image.fileSize
          ? `${(image.fileSize / 1024).toFixed(2)} KB`
          : "N/A",
        alt: image.alt || "No Alt Text",
      }));

      const nullFileSizeImagesFormatted = nullFileSizeImages.map((image) => ({
        src: image.src,
        width: image.width || "N/A",
        height: image.height || "N/A",
        fileSize: "N/A", // Since these images have null file size
        alt: image.alt || "No Alt Text",
      }));

      const dataToSave = {
        overview: {
          url: report.startUrl,
          totalImages: uniqueImages.length,
          totalImagesWithIssues:
            largeImages.length +
            nullFileSizeImages.length +
            uniqueImages.filter((image) => !image.alt).length,
          issueTypes: {
            "Missing Alt Attribute": uniqueImages.filter((image) => !image.alt)
              .length,
            "Null File Size": nullFileSizeImages.length,
            "Large Images": largeImages.length,
          },
          imageBreakdownByHost: report.hosts.map((host: string) => ({
            host,
            count: images.reduce((count, img) => {
              try {
                const imgUrl = new URL(img.src);
                if (imgUrl.hostname === host) count++;
              } catch (e) {}
              return count;
            }, 0),
          })),
          timestamp: Date.now(),
          crawlId,
        },
        imageDetails: imageDetailsFormatted,
        largeImages: largeImagesFormatted,
        nullFileSizeImages: nullFileSizeImagesFormatted,
      };

      // console.log("Data being stored in Firebase:", dataToSave);

      const dbRef = ref(Database, `image_checker_crawled_sites/${crawlId}`);
      // console.log(
      //   "Saving to Firebase at:",
      //   `image_checker_crawled_sites/${crawlId}`
      // );
      await set(dbRef, dataToSave);

      // console.log("Data saved successfully:", dataToSave);
      return crawlId;
    } catch (error) {
      console.error("Error saving data:", error);
      return null;
    }
  };

  // Existing useEffect (unchanged)
  const [crawlId, setCrawlId] = useState<string | null>(null);
  const [hasSaved, setHasSaved] = useState(false); // New flag

  useEffect(() => {
    // console.log("useEffect triggered:", {
    //   loading,
    //   report: !!report,
    //   uniqueImagesLength: uniqueImages.length,
    //   imagesLength: images.length,
    // });

    if (
      !loading &&
      report &&
      uniqueImages.length > 0 &&
      images.length > 0 &&
      !hasSaved
    ) {
      // console.log("Saving to Firebase...");
      saveCrawlOverview(report, uniqueImages, images)
        .then((id) => {
          setCrawlId(id);
          if (id) {
            // alert("Crawl data saved successfully!");
            // console.log("Crawl data saved successfully");

            setHasSaved(true); // Mark as saved
          }
        })
        .catch((error) => console.error("Error saving crawl data:", error));
    } else {
      // console.log("Conditions not met:", {
      //   loading,
      //   report: !!report,
      //   uniqueImagesLength: uniqueImages.length,
      //   imagesLength: images.length,
      // });
    }
  }, [loading, report, uniqueImages, images, hasSaved]);

  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const handleShareReport = async () => {
    if (!crawlId) {
      setError("No report available to share.");
      return;
    }

    const shareUrl = `${window.location.origin}/tools/report?crawlId=${crawlId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setError("");
      setShareFeedback("Copied!");
      setTimeout(() => setShareFeedback(null), 2000); // Reset after 2 seconds
    } catch (err) {
      setError("Failed to copy URL.");
      console.error("Clipboard error:", err);
    }
  };

  return (
    <>
      {!loading && !report && (
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
                Analyzing {scope === "page" ? "page" : "entire site"}, please
                wait...
              </p>
            )}

            {error && (
              <p className="mt-4 text-red-500 text-center font-medium">
                {error}
              </p>
            )}
          </div>
        </section>
      )}

      {loading && (
        <div className="section_bgImage bg-darkBlue min-h-[100vh] flex items-center justify-center">
          <div>
            <svg
              className="hourglass"
              viewBox="0 0 56 56"
              width="56px"
              height="56px"
              role="img"
              aria-label="Hourglass being flipped clockwise and circled by three white curves fading in and out"
            >
              <clipPath id="sand-mound-top">
                <path
                  className="hourglass__sand-mound-top"
                  d="M 14.613 13.087 C 15.814 12.059 19.3 8.039 20.3 6.539 C 21.5 4.789 21.5 2.039 21.5 2.039 L 3 2.039 C 3 2.039 3 4.789 4.2 6.539 C 5.2 8.039 8.686 12.059 9.887 13.087 C 11 14.039 12.25 14.039 12.25 14.039 C 12.25 14.039 13.5 14.039 14.613 13.087 Z"
                />
              </clipPath>
              <clipPath id="sand-mound-bottom">
                <path
                  className="hourglass__sand-mound-bottom"
                  d="M 14.613 20.452 C 15.814 21.48 19.3 25.5 20.3 27 C 21.5 28.75 21.5 31.5 21.5 31.5 L 3 31.5 C 3 31.5 3 28.75 4.2 27 C 5.2 25.5 8.686 21.48 9.887 20.452 C 11 19.5 12.25 19.5 12.25 19.5 C 12.25 19.5 13.5 19.5 14.613 20.452 Z"
                />
              </clipPath>
              <g transform="translate(2,2)">
                <g
                  fill="none"
                  stroke="hsl(0,0%,100%)"
                  strokeDasharray="153.94 153.94"
                  strokeDashoffset="153.94"
                  strokeLinecap="round"
                  transform="rotate(-90,26,26)"
                >
                  <circle
                    className="hourglass__motion-thick"
                    strokeWidth="2.5"
                    cx="26"
                    cy="26"
                    r="24.5"
                    transform="rotate(0,26,26)"
                  />
                  <circle
                    className="hourglass__motion-medium"
                    strokeWidth="1.75"
                    cx="26"
                    cy="26"
                    r="24.5"
                    transform="rotate(90,26,26)"
                  />
                  <circle
                    className="hourglass__motion-thin"
                    strokeWidth="1"
                    cx="26"
                    cy="26"
                    r="24.5"
                    transform="rotate(180,26,26)"
                  />
                </g>
                <g
                  className="hourglass__model"
                  transform="translate(13.75,9.25)"
                >
                  {/* <!-- glass --> */}
                  <path
                    fill="hsl(var(--hue),90%,85%)"
                    d="M 1.5 2 L 23 2 C 23 2 22.5 8.5 19 12 C 16 15.5 13.5 13.5 13.5 16.75 C 13.5 20 16 18 19 21.5 C 22.5 25 23 31.5 23 31.5 L 1.5 31.5 C 1.5 31.5 2 25 5.5 21.5 C 8.5 18 11 20 11 16.75 C 11 13.5 8.5 15.5 5.5 12 C 2 8.5 1.5 2 1.5 2 Z"
                  />
                  {/* <!-- sand --> */}
                  <g stroke="hsl(35,90%,90%)" strokeLinecap="round">
                    <line
                      className="hourglass__sand-grain-left"
                      strokeWidth="1"
                      strokeDasharray="0.25 33.75"
                      x1="12"
                      y1="15.75"
                      x2="12"
                      y2="20.75"
                    />
                    <line
                      className="hourglass__sand-grain-right"
                      strokeWidth="1"
                      strokeDasharray="0.25 33.75"
                      x1="12.5"
                      y1="16.75"
                      x2="12.5"
                      y2="21.75"
                    />
                    <line
                      className="hourglass__sand-drop"
                      strokeWidth="1"
                      strokeDasharray="0.5 107.5"
                      x1="12.25"
                      y1="18"
                      x2="12.25"
                      y2="31.5"
                    />
                    <line
                      className="hourglass__sand-fill"
                      strokeWidth="1.5"
                      strokeDasharray="54 54"
                      x1="12.25"
                      y1="14.75"
                      x2="12.25"
                      y2="31.5"
                    />
                    <line
                      className="hourglass__sand-line-left"
                      stroke="hsl(35,90%,83%)"
                      strokeWidth="1"
                      strokeDasharray="1 107"
                      x1="12"
                      y1="16"
                      x2="12"
                      y2="31.5"
                    />
                    <line
                      className="hourglass__sand-line-right"
                      stroke="hsl(35,90%,83%)"
                      strokeWidth="1"
                      strokeDasharray="12 96"
                      x1="12.5"
                      y1="16"
                      x2="12.5"
                      y2="31.5"
                    />
                    {/* <!-- mounds --> */}
                    <g fill="hsl(35,90%,90%)" strokeWidth="0">
                      <path
                        clipPath="url(#sand-mound-top)"
                        d="M 12.25 15 L 15.392 13.486 C 21.737 11.168 22.5 2 22.5 2 L 2 2.013 C 2 2.013 2.753 11.046 9.009 13.438 L 12.25 15 Z"
                      />
                      <path
                        clipPath="url(#sand-mound-bottom)"
                        d="M 12.25 18.5 L 15.392 20.014 C 21.737 22.332 22.5 31.5 22.5 31.5 L 2 31.487 C 2 31.487 2.753 22.454 9.009 20.062 Z"
                      />
                    </g>
                  </g>
                  {/* <!-- glass glare --> */}
                  <g
                    fill="none"
                    opacity="0.7"
                    strokeLinecap="round"
                    strokeWidth="2"
                  >
                    <path
                      className="hourglass__glare-top"
                      stroke="hsl(0,0%,100%)"
                      d="M 19.437 3.421 C 19.437 3.421 19.671 6.454 17.914 8.846 C 16.157 11.238 14.5 11.5 14.5 11.5"
                    />
                    <path
                      className="hourglass__glare-bottom"
                      stroke="hsla(0,0%,100%,0)"
                      d="M 19.437 3.421 C 19.437 3.421 19.671 6.454 17.914 8.846 C 16.157 11.238 14.5 11.5 14.5 11.5"
                      transform="rotate(180,12.25,16.75)"
                    />
                  </g>
                  {/* <!-- caps --> */}
                  <rect
                    fill="hsl(var(--hue),90%,50%)"
                    width="24.5"
                    height="2"
                  />
                  <rect
                    fill="hsl(var(--hue),90%,57.5%)"
                    rx="0.5"
                    ry="0.5"
                    x="2.5"
                    y="0.5"
                    width="19.5"
                    height="1"
                  />
                  <rect
                    fill="hsl(var(--hue),90%,50%)"
                    y="31.5"
                    width="24.5"
                    height="2"
                  />
                  <rect
                    fill="hsl(var(--hue),90%,57.5%)"
                    rx="0.5"
                    ry="0.5"
                    x="2.5"
                    y="32"
                    width="19.5"
                    height="1"
                  />
                </g>
              </g>
            </svg>
            <h3 className="text-center text-white">Loading...</h3>
          </div>
        </div>
      )}

      <section className="section_bgImage  bg-darkBlue pt-[170px] pb-[100px]">
        <div className="relative">
          {!loading && report && (
            <div className="flex border-r h-screen">
              {/* Vertical Tab Menu */}
              <div
                className={`sidebarWrap max-w-[230px] w-full p-[20px] bg-bgBluePurple rounded-r-[20px] transition-all ease-in-out duration-700 relative md:max-w-full md:absolute md:z-[99]`}
              >
                <div className="sidebarMain">
                  <ul>
                    <li
                      className={`relative mb-[10px] z-0 p-[10px] text-white w-full cursor-pointer ${
                        activeTab === "tab1"
                          ? `bg-black rounded-tr-lg rounded-br-lg ${liBefore}`
                          : ""
                      }`}
                      onClick={() => setActiveTab("tab1")}
                    >
                      Overview
                    </li>
                    <li
                      className={`relative mb-[10px] z-0 p-[10px] text-white w-full cursor-pointer ${
                        activeTab === "tab2"
                          ? `bg-black rounded-tr-lg rounded-br-lg ${liBefore}`
                          : ""
                      }`}
                      onClick={() => setActiveTab("tab2")}
                    >
                      Images detail
                    </li>
                    <li
                      className={`relative mb-[10px] z-0 p-[10px] text-white w-full cursor-pointer ${
                        activeTab === "tab3"
                          ? `bg-black rounded-tr-lg rounded-br-lg ${liBefore}`
                          : ""
                      }`}
                      onClick={() => setActiveTab("tab3")}
                    >
                      Image issues
                    </li>
                  </ul>
                </div>
              </div>

              {/* Main Content */}
              <div className="w-[calc(100%-360px)] ml-[50px] desktop:w-[calc(100%-300px)] tablet:w-[calc(100%-300px)] md:w-full md:px-[10px] md:mx-0">
                {activeTab === "tab1" && (
                  <div>
                    <div className="">
                      {/* General Report */}
                      <div className="text-white mb-[20px]">
                        <p className="font-bold text-white">Project:- </p>{" "}
                        <Link
                          className="underline hover:text-purple transition-colors"
                          href={report.startUrl}
                        >
                          {report.startUrl}
                        </Link>
                        {/* Share Report Button */}
                        <button
                          onClick={handleShareReport}
                          className="ml-4 relative py-2 px-4 text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold disabled:bg-indigo-300 disabled:cursor-not-allowed"
                          disabled={!crawlId}
                          title="Share this report"
                        >
                          {shareFeedback || "Share Report"}
                        </button>
                      </div>
                      <div
                        className={`cardWrap flex w-[calc(100%+20px)] md:w-full md:ml-0 ml-[-10px] flex-wrap`}
                      >
                        {/* Total Links */}
                        <div className="card w-[calc(50%-20px)] mx-[10px] desktop:w-[calc(50%-20px)] tablet:w-[calc(50%-20px)] md:w-[calc(100%-20px)] bg-bgBluePurple rounded-[8px] relative mb-[20px] p-[10px]">
                          <div className="content">
                            <p className="text-white">Total Images</p>
                            <h3 className="text-center text-white mt-[10px]">
                              {uniqueImages.length}
                            </h3>
                          </div>
                        </div>
                        {/* Total Links with Issues */}
                        <div className="card w-[calc(50%-20px)] mx-[10px] desktop:w-[calc(50%-20px)] tablet:w-[calc(50%-20px)] md:w-[calc(100%-20px)] bg-bgBluePurple rounded-[8px] relative mb-[20px] p-[10px]">
                          <div className="content">
                            <p className="text-white">
                              Total images with issues
                            </p>
                            <h3 className="text-center text-white mt-[10px]">
                              {(() => {
                                // Filter images with issues (e.g., missing alt or null file size)
                                const imagesWithIssues = uniqueImages.filter(
                                  (image) =>
                                    !image.alt ||
                                    image.fileSize === null ||
                                    (image.fileSize || 0) > 100 * 1024
                                );
                                return imagesWithIssues.length;
                              })()}
                            </h3>
                          </div>
                        </div>

                        {/* Issue Types */}
                        {uniqueImages.length > 0 && (
                          <div className="card w-[calc(50%-20px)] mx-[10px] desktop:w-[calc(50%-20px)] lg:w-[calc(100%-20px)] bg-bgBluePurple rounded-[8px] relative mb-[20px] p-[10px]">
                            <div className="mb-6">
                              <p className="text-white mb-[10px]">
                                Image Issues
                              </p>
                              {(() => {
                                // Filter uniqueImages with specific issues
                                const imagesWithIssues = uniqueImages.filter(
                                  (image) =>
                                    !image.alt ||
                                    image.fileSize === null ||
                                    (image.fileSize || 0) > 100 * 1024
                                );

                                // Define a type for the issueTypes object
                                type ImageIssueTypes = Record<string, number>;

                                // Group image issues into types
                                const issueTypes =
                                  imagesWithIssues.reduce<ImageIssueTypes>(
                                    (acc, image) => {
                                      if (!image.alt) {
                                        acc["Missing Alt Attribute"] =
                                          (acc["Missing Alt Attribute"] || 0) +
                                          1;
                                      }
                                      if (image.fileSize === null) {
                                        acc["Null File Size"] =
                                          (acc["Null File Size"] || 0) + 1;
                                      }
                                      if ((image.fileSize || 0) > 100 * 1024) {
                                        acc["Large Images"] =
                                          (acc["Large Images"] || 0) + 1;
                                      }
                                      return acc;
                                    },
                                    {} as ImageIssueTypes
                                  );

                                return Object.entries(issueTypes).map(
                                  ([type, count]) => (
                                    <div
                                      key={type}
                                      className="w-full flex justify-between border-b-[1px] pb-[5px] border-black mt-[10px]"
                                    >
                                      <p
                                        className="text-white cursor-pointer hover:underline transition-all ease-in-out delay-300"
                                        onClick={() => setActiveTab("tab3")}
                                      >
                                        {type}:
                                      </p>
                                      <p className="text-white">{count}</p>
                                    </div>
                                  )
                                );
                              })()}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Images Breakdown by Host */}
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold text-white mb-4 text-center">
                          Image Breakdown by Host
                        </h3>
                        <div className="relative h-[300px] bg-white rounded-lg overflow-hidden">
                          <Bar
                            data={{
                              labels: report.hosts,
                              datasets: [
                                {
                                  label: "Images by Host",
                                  data: report.hosts.map((host) => {
                                    let count = 0;
                                    images.forEach((img) => {
                                      try {
                                        const imgUrl = new URL(img.src);
                                        if (imgUrl.hostname === host) count++;
                                      } catch (e) {
                                        // Ignore invalid URLs
                                      }
                                    });
                                    return count;
                                  }),
                                  backgroundColor: "#6366F1",
                                },
                              ],
                            }}
                            options={{
                              responsive: true,
                              plugins: {
                                legend: {
                                  display: true,
                                  position: "top",
                                },
                                tooltip: {
                                  enabled: true,
                                },
                              },
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Images Table */}
                {activeTab === "tab2" && (
                  <div className="max-w-[1600px] mx-auto">
                    <h1 className="text-white text-center">Image Details</h1>
                    {images.length > 0 && (
                      <div className="mt-8 w-full ">
                        <h4 className="text-white mb-4">
                          Found {uniqueImages.length} images:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[87vh] overflow-y-scroll overflow-visible bg-white">
                          <table className="table-auto w-full min-w-[1250px] border-collapse border border-gray-300 shadow-md">
                            <thead>
                              <tr className="bg-gray-200 text-left">
                                <th className="border border-gray-300 px-4 py-2">
                                  Sr
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                  Image
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                  Size (px)
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-base font-bold text-black">
                                      File Size
                                    </span>
                                    <div className="relative inline-block group">
                                      <img
                                        onClick={toggleSort}
                                        className={`relative max-w-[20px] max-h-[20px] ml-[10px] cursor-pointer ${
                                          sortDirection === "asc"
                                            ? "rotate-180"
                                            : ""
                                        }`}
                                        src={"/sort-descending.png"}
                                        alt={
                                          sortDirection === "desc"
                                            ? "Sort Descending"
                                            : "Sort Ascending"
                                        }
                                      />
                                      <div className="absolute top-1/2 -translate-y-1/2 left-[50px] w-max h-max bottom-[120%] opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="inline-block relative bg-black text-white text-sm font-medium px-2 py-1 rounded-lg before:content-[''] before:absolute before:w-[20px] before:h-[20px] before:top-1/2 before:left-[-8px] before:-translate-y-1/2 before:rotate-45 before:z-[-1] before:bg-black">
                                          {sortDirection === "asc"
                                            ? "Change to Descending Order"
                                            : "Change to Ascending Order"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                  Alt Text
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                  View
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {tableData.map((image, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                  <td className="border border-gray-300 px-4 py-2">
                                    {index + 1}
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2 text-[14px] max-w-[500px] break-words">
                                    {image.src}
                                  </td>
                                  <td className="border border-gray-300 text-[14px] px-4 py-2">
                                    {image.width && image.height
                                      ? `${image.width} x ${image.height}`
                                      : "N/A"}
                                  </td>
                                  <td className="border border-gray-300 text-[14px] px-4 py-2">
                                    {image.fileSize
                                      ? `${(image.fileSize / 1024).toFixed(
                                          2
                                        )} KB`
                                      : "N/A"}
                                  </td>
                                  <td className="border border-gray-300 text-[14px] px-4 py-2">
                                    {image.alt || "No Alt Text"}
                                  </td>
                                  <td className="border border-gray-300 px-4 text-[14px] py-2">
                                    <a
                                      href={image.src}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      View Image
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Table for Large Images */}
                {activeTab === "tab3" && (
                  <div className="max-w-[1600px] mx-auto">
                    {largeImages.length > 0 ? (
                      <>
                        <h2 className="text-lg text-white font-bold my-4">
                          Large Images (File Size{" "}
                          <span className="text-lg text-white">&#62;</span> 100
                          KB)
                        </h2>
                        <div className="mb-[50px] pb-[50px] border-white border-b">
                          <table className="table-auto w-full min-w-[1250px] border-collapse border border-gray-300 shadow-md bg-white">
                            <thead>
                              <tr className="bg-gray-200 text-left">
                                <th className="border border-gray-300 px-4 py-2">
                                  Sr
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                  Image
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                  Size (px)
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-base font-bold text-black">
                                      File Size
                                    </span>
                                    <div className="relative inline-block group">
                                      <img
                                        onClick={toggleSort}
                                        className={`relative max-w-[20px] max-h-[20px] ml-[10px] cursor-pointer ${
                                          sortDirection === "asc"
                                            ? "rotate-180"
                                            : ""
                                        }`}
                                        src={"/sort-descending.png"}
                                        alt={
                                          sortDirection === "desc"
                                            ? "Sort Descending"
                                            : "Sort Ascending"
                                        }
                                      />
                                      <div className="absolute top-1/2 -translate-y-1/2 left-[50px] w-max h-max bottom-[120%] opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="inline-block relative bg-black text-white text-sm font-medium px-2 py-1 rounded-lg before:content-[''] before:absolute before:w-[20px] before:h-[20px] before:top-1/2 before:left-[-8px] before:-translate-y-1/2 before:rotate-45 before:z-[-1] before:bg-black">
                                          {sortDirection === "asc"
                                            ? "Change to Descending Order"
                                            : "Change to Ascending Order"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                  Alt Text
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                  View
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {largeImageTableData.map((image, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                  <td className="border border-gray-300 px-4 py-2">
                                    {index + 1}
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2 text-[14px] max-w-[500px] break-words">
                                    {image.src}
                                  </td>
                                  <td className="border border-gray-300 text-[14px] px-4 py-2">
                                    {image.width && image.height
                                      ? `${image.width} x ${image.height}`
                                      : "N/A"}
                                  </td>
                                  <td className="border border-gray-300 text-[14px] px-4 py-2">
                                    {image.fileSize
                                      ? `${(image.fileSize / 1024).toFixed(
                                          2
                                        )} KB`
                                      : "N/A"}
                                  </td>
                                  <td className="border border-gray-300 text-[14px] px-4 py-2">
                                    {image.alt || "No Alt Text"}
                                  </td>
                                  <td className="border border-gray-300 px-4 text-[14px] py-2">
                                    <a
                                      href={image.src}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      View Image
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    ) : (
                      <h3 className="text-md text-gray-600 italic">
                        No large images found.
                      </h3>
                    )}

                    {/* Null File Size Images Table */}
                    {nullFileSizeImages.length > 0 ? (
                      <>
                        <h2 className="text-lg text-white font-bold my-4">
                          Images with Null or Undefined File Size
                        </h2>
                        <div className="mb-[50px] pb-[50px] border-white border-b">
                          <table className="table-auto w-full min-w-[1250px] border-collapse border border-gray-300 shadow-md rounded-md bg-white">
                            <thead>
                              <tr className="bg-gray-200 text-left">
                                <th className="border border-gray-300 px-4 py-2">
                                  Sr
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                  Image
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                  Size (px)
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-base font-bold text-black">
                                      File Size
                                    </span>
                                    <div className="relative inline-block group">
                                      <img
                                        onClick={toggleSort} // Toggle sort on click
                                        className={`relative max-w-[20px] max-h-[20px] ml-[10px] cursor-pointer ${
                                          sortDirection === "asc"
                                            ? "rotate-180"
                                            : ""
                                        }`}
                                        src={"/sort-descending.png"}
                                        alt={
                                          sortDirection === "desc"
                                            ? "Sort Descending"
                                            : "Sort Ascending"
                                        }
                                      />
                                      <div className="absolute top-1/2 -translate-y-1/2 left-[50px] w-max h-max bottom-[120%] opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="inline-block relative bg-black text-white text-sm font-medium px-2 py-1 rounded-lg before:content-[''] before:absolute before:w-[20px] before:h-[20px] before:top-1/2 before:left-[-8px] before:-translate-y-1/2 before:rotate-45 before:z-[-1] before:bg-black">
                                          {sortDirection === "asc"
                                            ? "Change to Descending Order"
                                            : "Change to Ascending Order"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                  Alt Text
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                  View
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {nullFileSizeImagesTableData.map(
                                (image, index) => (
                                  <tr key={index} className="hover:bg-gray-100">
                                    {/* Sr */}
                                    <td className="border border-gray-300 px-4 py-2">
                                      {index + 1}
                                    </td>

                                    {/* Image */}
                                    <td className="border border-gray-300 px-4 py-2 text-[14px] max-w-[500px] break-words">
                                      {image.src}
                                    </td>

                                    {/* Size (px) */}
                                    <td className="border border-gray-300 text-[14px] px-4 py-2">
                                      {image.width && image.height
                                        ? `${image.width} x ${image.height}`
                                        : "N/A"}
                                    </td>

                                    {/* File Size */}
                                    <td className="border border-gray-300 text-[14px] px-4 py-2">
                                      {image.fileSize
                                        ? `${(image.fileSize / 1024).toFixed(
                                            2
                                          )} KB`
                                        : "N/A"}
                                    </td>

                                    {/* Alt Text */}
                                    <td className="border border-gray-300 text-[14px] px-4 py-2">
                                      {image.alt || "No Alt Text"}
                                    </td>

                                    {/* View */}
                                    <td className="border border-gray-300 px-4 text-[14px] py-2">
                                      <a
                                        href={image.src}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                      >
                                        View Image
                                      </a>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

