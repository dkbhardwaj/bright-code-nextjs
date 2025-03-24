import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [workingLinks, setWorkingLinks] = useState<string[]>([]);
  const [brokenLinks, setBrokenLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "crawling" | "checking" | "done"
  >("idle");

  const handleCrawl = async () => {
    if (!url) return;
    setLoading(true);
    setError("");
    setWorkingLinks([]);
    setBrokenLinks([]);
    setStatus("crawling");

    try {
      // Step 1: Start the crawl
      const response = await fetch(`/api/crawl?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
        setStatus("idle");
        return;
      }

      const { jobId } = data;

      // Step 2: Poll for results
      let result;
      do {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Poll every 2 seconds
        const statusRes = await fetch(`/api/crawl?jobId=${jobId}`);
        result = await statusRes.json();

        if (result.error) {
          setError(result.error);
          break;
        }

        setStatus(result.status);

        if (result.status === "done") {
          setWorkingLinks(result.workingLinks || []);
          setBrokenLinks(result.brokenLinks || []);
        }
      } while (result.status !== "done" && !result.error);
    } catch (error) {
      setError("Crawling failed");
      console.error("Crawling failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-[200px] bg-purple min-h-screen">
      <div className="container">
        <div className="p-8 max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-4">404 Link Checker</h1>
          <input
            type="text"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={loading}
          />
          <button
            onClick={handleCrawl}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded submit-btn"
            disabled={loading}
          >
            {loading
              ? status === "crawling"
                ? "Crawling..."
                : "Checking..."
              : "Check Links"}
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {status !== "idle" && !error && (
            <p className="mt-4 text-gray-600">
              Status: {status.charAt(0).toUpperCase() + status.slice(1)}
            </p>
          )}

          {/* Uncomment if you want to show working links */}
          {/* <div className="mt-6">
            <h2 className="text-xl font-semibold">Working Links:</h2>
            <ul className="list-disc pl-5">
              {workingLinks.map((link, index) => (
                <li key={index} className="break-all">
                  {link}
                </li>
              ))}
            </ul>
          </div> */}

          {brokenLinks.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-red-500">
                Broken Links (404):
              </h2>
              <ul className="list-disc pl-5 text-red-500">
                {brokenLinks.map((link, index) => (
                  <li key={index} className="break-all">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
