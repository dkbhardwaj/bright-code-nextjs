import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [fetched, setFetched] = useState(false); // Tracks if a fetch has occurred

  const fetchImages = async (): Promise<void> => {
    setError("");
    setImages([]);
    setLoading(true);
    setFetched(true); // Set to true when fetch is initiated

    if (!url || !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(url)) {
      setError("Please enter a valid website URL (starting with http or https).");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/fetch-all-images?url=${encodeURIComponent(url)}`
      );
      const data: { images?: string[]; error?: string } = await response.json();

      if (response.ok && data.images) {
        setImages(data.images);
      } else {
        setError(data.error || "Failed to fetch images.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred while scanning the URL.");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`min-h-[100vh] flex flex-col items-center justify-center bg-purple ${fetched&&images.length != 0 ? "pt-[200px]" : ""}`}>
      <div className="container">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-6 text-purple-700">
            Image Fetcher Tool
          </h1>
          <div className="flex flex-wrap justify-center mb-6">
            <input
              className="h-[50px] w-[300px] py-[10px] px-[15px] rounded-lg border border-gray-400 focus:outline-purple-500"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL"
              aria-label="Website URL Input"
            />
            <button
              className={`ml-[20px] submit-btn ${
                loading
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
              onClick={fetchImages}
              disabled={loading}
              aria-label="Fetch Images Button"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Fetching...
                </div>
              ) : (
                "Fetch Images"
              )}
            </button>
          </div>
          {error && (
            <p className="text-red-600 mt-4 font-semibold">{error}</p>
          )}
        </div>

        {/* Show "No images found" only if fetching has occurred */}
        {fetched && images.length === 0 && !loading && !error && (
          <div className="text-center text-gray-500 mt-6">
            <p>No images found. Enter a website URL to get started.</p>
          </div>
        )}

        {/* Show images if found */}
        {images.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-purple-700 text-center">
              Found {images.length} images:
            </h2>
            <div className="w-mainRow flex flex-wrap">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="w-colFour mx-[10px] mb-[20px] border rounded-lg overflow-hidden shadow-lg bg-white"
                >
                  <img
                    src={image}
                    alt={`Fetched Image ${index + 1}`}
                    className="w-full h-[150px] object-cover"
                  />
                  <a
                    href={image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-blue-600 hover:underline py-2"
                  >
                    View Image
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
