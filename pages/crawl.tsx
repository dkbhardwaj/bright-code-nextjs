import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCrawl = async () => {
    if (!url) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/crawl?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      setPages(data.pages || []);
      console.log(data);
      
    } catch (error) {
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
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded submit-btn"
            disabled={loading}
          >
            {loading ? "Crawling..." : "Fetch Pages"}
          </button>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Crawled Pages:</h2>
            <ul className="list-disc pl-5">
              {pages.map((page, index) => (
                <li key={index} className="break-all">
                  {page}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
