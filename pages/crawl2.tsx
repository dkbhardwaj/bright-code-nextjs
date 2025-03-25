import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [links, setLinks] = useState<{
    internal: string[];
    external: string[];
  }>({ internal: [], external: [] });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLinks = async () => {
    try {
      setLinks({ internal: [], external: [] });
      setError("");
      setLoading(true);

      const targetUrl = url.startsWith("http") ? url : `https://${url}`;
      const res = await fetch(
        `/api/crawller-cheerio?url=${encodeURIComponent(targetUrl)}`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `API error: ${res.status}`);
      }

      if (
        data.links.internal.length === 0 &&
        data.links.external.length === 0
      ) {
        setError("No links found across the crawled pages.");
      } else {
        setLinks(data.links);
      }
    } catch (err) {
      setError(
        (err as Error).message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: "200px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Link Fetcher</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter a URL (e.g., https://example.com)"
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <button
        onClick={fetchLinks}
        disabled={loading}
        style={{
          padding: "8px 16px",
          background: loading ? "#ccc" : "#0070f3",
          color: "white",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {loading ? (
          <>
            <span
              style={{
                width: "16px",
                height: "16px",
                border: "2px solid white",
                borderTop: "2px solid transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            Fetching...
          </>
        ) : (
          "Fetch Links"
        )}
      </button>

      {error && !loading && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}

      {!loading && (links.internal.length > 0 || links.external.length > 0) && (
        <div style={{ marginTop: "20px" }}>
          {links.internal.length > 0 && (
            <>
              <h2>Internal Links ({links.internal.length}):</h2>
              <ul style={{ listStyleType: "none", padding: "0" }}>
                {links.internal.map((link, index) => (
                  <li key={index} style={{ marginBottom: "5px" }}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#0070f3" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
          {links.external.length > 0 && (
            <>
              <h2>External Links ({links.external.length}):</h2>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {links.external.map((link, index) => (
                  <li key={index} style={{ marginBottom: "5px" }}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#0070f3" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
