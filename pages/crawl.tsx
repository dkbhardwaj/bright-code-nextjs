import { useState } from "react";

export default function BrokenLinkChecker() {
  const [url, setUrl] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [brokenLinks, setBrokenLinks] = useState<string[]>([]);
  const [workingLinks, setWorkingLinks] = useState<string[]>([]);

  const startCrawl = async () => {
    setStatus("Starting...");
    const response = await fetch("/api/crawl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    setJobId(data.jobId);
    setStatus("Crawling started...");
    pollStatus(data.jobId);
  };

  const pollStatus = async (jobId: string) => {
    const interval = setInterval(async () => {
      const response = await fetch(`/api/crawl?jobId=${jobId}`);
      const data = await response.json();

      setStatus(data.status);
      if (data.status === "done") {
        setBrokenLinks(data.brokenLinks);
        setWorkingLinks(data.workingLinks);
        clearInterval(interval);
      }
    }, 5000); // Poll every 5 seconds
  };

  return (
    <section>
      <div className="container">
    <div className="pt-[200px]">
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
      {status === "done" && (
        <div>
          <h2>Broken Links:</h2>
          <ul>
            {brokenLinks.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
      </div>
    </section>
  );
}
