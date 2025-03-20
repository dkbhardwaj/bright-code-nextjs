import { log } from "console";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [internalLinks, setInternalLinks] = useState<string[]>([]);
  const [externalLinks, setExternalLinks] = useState<string[]>([]);
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
        setInternalLinks(data.internalLinks || []);
        setExternalLinks(data.externalLinks || []);
      }
      console.log(data);
      
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
          <h1 className="text-2xl font-bold mb-4">Site Crawler</h1>
          <input
            type="text"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleCrawl}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            disabled={loading}
          >
            {loading ? "Crawling..." : "Fetch Pages"}
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Internal Links:</h2>
            <ul className="list-disc pl-5">
              {internalLinks.map((link, index) => (
                <li key={index} className="break-all">
                  {link}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">External Links:</h2>
            <ul className="list-disc pl-5 text-blue-500">
              {externalLinks.map((link, index) => (
                <li key={index} className="break-all">
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
