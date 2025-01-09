import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter hook for query handling
import { Bar } from "react-chartjs-2";
import Image from "next/image";
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
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [scope, setScope] = useState<"page" | "site">("page");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [fetched, setFetched] = useState(false);
  const [report, setReport] = useState<{
    totalLinks: number;
    totalLinksWithIssues: number;
    hosts: string[];
    issueTypes: { [key: string]: number };
    linkTypes: { [key: string]: number };
    startUrl: string;
  } | null>(null);

  const router = useRouter(); // Access router for query parameter updates

  useEffect(() => {
    if (url) {
      router.push(`?url=${encodeURIComponent(url)}`, undefined, { shallow: true });
    }
  }, [url, router]);

  const fetchWebsiteData = async (): Promise<void> => {
    setLoading(true);
    setError("");
    setImages([]);
    setReport(null);

    try {
      const response = await fetch(
        scope == 'page'
          ? `/api/analyze-site?url=${encodeURIComponent(url)}&scope=${scope}`
          : `/api/crawl-site?url=${encodeURIComponent(url)}&scope=${scope}`
      );
      const data = await response.json();

      if (response.ok) {
        setImages(data.images || []);
        setReport({
          totalLinks: data.totalLinks || 0,
          totalLinksWithIssues: data.totalLinksWithIssues || 0,
          hosts: data.hosts || [],
          issueTypes: data.issueTypes || {},
          linkTypes: data.linkTypes || {},
          startUrl: data.startUrl || url,
        });
      } else {
        setError(data.error || "Failed to analyze the site.");
      }
    } catch (err: unknown) {
      setError("An error occurred while analyzing the site.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeClick = (): void => {
    if (!url) {
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

  return (
    <div className="section_bgImage bg-darkBlue">
      <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl p-8 shadow-2xl rounded-lg bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg">
          <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600 mb-8">
            Website Analyzer
          </h1>

          {!fetched && (
            <div className="space-y-6">
              {/* URL Input with Clear Icon */}
              <div className="relative">
                <input
                  className="w-full px-5 py-3 border rounded-lg shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter website URL"
                />
                {url && (
                  <button
                    type="button"
                    onClick={handleClearInput}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
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

              {/* Scope Selection */}
              <div className="flex justify-around items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="scope"
                    value="page"
                    checked={scope === "page"}
                    onChange={() => setScope("page")}
                    className="form-radio text-indigo-600"
                  />
                  <span className="text-gray-800 font-medium">Analyze Single Page</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="scope"
                    value="site"
                    checked={scope === "site"}
                    onChange={() => setScope("site")}
                    className="form-radio text-indigo-600"
                  />
                  <span className="text-gray-800 font-medium">Analyze Entire Site</span>
                </label>
              </div>

              {/* Analyze Button */}
              <button
                className={`w-full py-3 text-white font-bold rounded-lg shadow-md transition ${loading
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  }`}
                onClick={handleAnalyzeClick}
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>
          )}

          {fetched && loading && (
            <p className="mt-6 text-center text-gray-200 font-medium animate-pulse">
              Analyzing {scope === "page" ? "page" : "entire site"}, please wait...
            </p>
          )}

          {error && (
            <p className="mt-4 text-red-500 text-center font-semibold">{error}</p>
          )}

          {!loading && report && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-center text-gradient mb-6">
                Analysis Report ({scope === "page" ? "Page" : "Entire Site"})
              </h2>

              {/* General Report */}
              <ul className="space-y-2">
                <li className="text-gray-800">
                  <strong>Project:</strong> {report.startUrl}
                </li>
                <li className="text-gray-800">
                  <strong>Total Links:</strong> {report.totalLinks}
                </li>
                <li className="text-gray-800">
                  <strong>Total Links with Issues:</strong> {report.totalLinksWithIssues}
                </li>
              </ul>

              {/* Issue Types */}
              {Object.entries(report.issueTypes).length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gradient mb-2">Issue Types:</h3>
                  <ul className="list-disc list-inside text-gray-800">
                    {Object.entries(report.issueTypes).map(([type, count]) => (
                      <li key={type}>
                        <strong>{type}:</strong> {count}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Link Types */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gradient mb-2">Link Types:</h3>
                <ul className="list-disc list-inside text-gray-800">
                  {Object.entries(report.linkTypes).map(([type, count]) => (
                    <li key={type}>
                      <strong>{type}:</strong> {count}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Images Breakdown by Host */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gradient text-center mb-4">
                  Image Breakdown by Host
                </h3>
                <div className="relative h-[300px]">
                  <Bar
                    data={{
                      labels: report.hosts,
                      datasets: [
                        {
                          label: "Images by Host",
                          data: report.hosts.map((host) =>
                            images.filter((img) => {
                              try {
                                const imgUrl = new URL(img);
                                return imgUrl.hostname === host;
                              } catch (e) {
                                return false; // Ignore invalid URLs
                              }
                            }).length
                          ),
                          backgroundColor: "#6366F1",
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
