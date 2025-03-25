import { useState } from "react";

export default function BrokenLinkChecker() {
  const [url, setUrl] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [brokenLinks, setBrokenLinks] = useState<string[]>([]);
  const [workingLinks, setWorkingLinks] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const startCrawl = async () => {
    setStatus("Starting...");
    setError(null);
    setBrokenLinks([]);
    setWorkingLinks([]);

    try {
      const response = await fetch("/api/crawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to start crawl.");
      }

      const data = await response.json();
      setJobId(data.jobId);
      setStatus("Crawling started...");
      pollStatus(data.jobId);
    } catch (err) {
      setStatus("Error");
      setError("Failed to start crawl.");
    }
  };

  const pollStatus = async (jobId: string) => {
    console.log("Checking status for Job ID:", jobId); // Debug log
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/crawl?jobId=${jobId}`);
        if (!response.ok) throw new Error(`Status check failed: ${response.status}`);
  
        const data = await response.json();
        console.log("Received status:", data); // Debug log
  
        setStatus(data.status);
        if (data.status === "done") {
          setBrokenLinks(data.brokenLinks);
          setWorkingLinks(data.workingLinks);
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Error checking status:", err); // Debug log
        setStatus("Error");
        setError("Failed to check status.");
        clearInterval(interval);
      }
    }, 3000);
  };
  

  return (
    <section className="bg-purple pt-[200px]">
      <div className="container">
        <div className="p-6">
          <h1 className="text-xl font-bold">404 Link Checker</h1>
          <input
            type="text"
            placeholder="Enter site URL"
            className="border p-2 mr-2"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={startCrawl} className="bg-blue-500 text-white p-2">
            Start Crawl
          </button>
          {status && <p>Status: {status}</p>}
          {error && <p className="text-red-500">{error}</p>}
          {status === "done" && (
            <div>
              <h2>Broken Links:</h2>
              <ul>
                {brokenLinks.length > 0 ? (
                  brokenLinks.map((link) => <li key={link}>{link}</li>)
                ) : (
                  <p>No broken links found.</p>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
