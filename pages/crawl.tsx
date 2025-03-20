import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [workingLinks, setWorkingLinks] = useState<string[]>([]);
  const [brokenLinks, setBrokenLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCrawl = async () => {
    if (!url) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/crawl?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setWorkingLinks(data.workingLinks || []);
        setBrokenLinks(data.brokenLinks || []);
      }
    } catch (error) {
      setError("Crawling failed");
      console.error("Crawling failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-[200px] bg-purple min-h-screen">
      <div className="conatiner">
        <div className="p-8 max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-4">404 Link Checker</h1>
          <input
            type="text"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleCrawl}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded submit-btn"
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Links"}
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}

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
        </div>
      </div>
    </section>
  );
}
