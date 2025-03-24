import { useState } from "react";

export default function BrokenLinkChecker() {
  const [url, setUrl] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [brokenLinks, setBrokenLinks] = useState<string[]>([]);
  const [workingLinks, setWorkingLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const startCrawl = async () => {
    if (!url) return alert("Please enter a valid URL!");
    setLoading(true);
    setStatus("Starting crawl...");
    setBrokenLinks([]);
    setWorkingLinks([]);

    try {
      const response = await fetch(`/api/crawl?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      setJobId(data.jobId);
      setStatus("Crawling started...");
      pollStatus(data.jobId);
    } catch (error) {
      setStatus("Error starting crawl.");
    }
  };

  const pollStatus = async (jobId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/crawl?jobId=${jobId}`);
        const data = await response.json();

        setStatus(data.status);
        if (data.status === "done") {
          setBrokenLinks(data.brokenLinks);
          setWorkingLinks(data.workingLinks);
          clearInterval(interval);
          setLoading(false);
        }
      } catch (error) {
        setStatus("Error checking status.");
        clearInterval(interval);
        setLoading(false);
      }
    }, 5000);
  };

  return (
    <section className="py-[200px] bg-purple min-h-screen">
      <div className="container">
        <h1 className="text-xl font-bold">404 Link Checker</h1>
        <input
          type="text"
          placeholder="Enter site URL"
          className="border p-2 mr-2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={startCrawl} className="bg-blue-500 text-white p-2">
          {loading ? "Checking..." : "Start Crawl"}
        </button>
        {status && <p>Status: {status}</p>}
        {status === "done" && (
          <div>
            <h2>Broken Links:</h2>
            <ul>
              {brokenLinks.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
            <h2>Working Links:</h2>
            <ul>
              {workingLinks.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
