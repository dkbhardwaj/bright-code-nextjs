import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [fetched, setFetched] = useState(false); // Track if the fetch button was clicked
  const [fetchType, setFetchType] = useState<"site" | "page" | null>(null); // Track which fetch type (site/page)

  // Function to fetch images based on the type (site or page)
  const fetchImages = async (type: "site" | "page"): Promise<void> => {
    setError("");
    setImages([]);
    setLoading(true);
    setFetchType(type); // Set the fetch type (either site or page)

    try {
      const endpoint =
        type === "site" ? "/api/fetch-all-images" : "/api/fetch-page-images"; // Ensure these API routes exist
      const response = await fetch(
        `${endpoint}?url=${encodeURIComponent(url)}`
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

  // Handle the fetch action when the "Fetch Images" button is clicked
  const handleFetchClick = async (): Promise<void> => {
    if (!url) {
      setError("Please enter a valid URL.");
      return;
    }
    setFetched(true); // Set fetched to true when the user clicks fetch
    // await fetchImages("page"); // Default to fetching from the page URL when the button is first clicked
  };

  return (
    <section
      className={`min-h-[100vh] flex flex-col items-center justify-center bg-purple ${
        fetched ? "pt-[200px]" : ""
      }`}
    >
      <div className="container">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-[80px] text-purple-700">
            Image Fetcher Tool
          </h1>

          {/* Show input and button only when not fetched */}
          {!fetched && (
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
                onClick={handleFetchClick}
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
          )}

          {/* Show the fetch buttons (All Website / Page) once fetched */}
          {fetched && (
            <div className="mt-6">
              <div className="flex justify-center">
                <button
                  className="fetch-btn"
                  onClick={async () => {
                    setLoading(true); // Set the general loading state
                    await fetchImages("site"); // Fetch images for the entire site
                    setLoading(false); // Reset loading state after fetch
                  }}
                  disabled={loading} // Disable button while loading
                >
                  <div className="icon max-w-[72px] mx-auto mb-[30px]">
                    <Image
                      src={`/multiple_pages.svg`}
                      width={700}
                      height={500}
                      loading="lazy"
                      alt="right-img"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {loading && fetchType === "site" ? ( // Check if "site" is being fetched
                    <div className="flex items-center">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Fetching...
                    </div>
                  ) : (
                    <div>
                      <span>Fetch All Website Images</span>
                    </div>
                  )}
                </button>

                <button
                  className="fetch-btn ml-4"
                  onClick={async () => {
                    setLoading(true); // Set the general loading state
                    await fetchImages("page"); // Fetch images for the specific page
                    setLoading(false); // Reset loading state after fetch
                  }}
                  disabled={loading} // Disable button while loading
                >
                  <div className="icon max-w-[72px] mx-auto mb-[30px]">
                    <Image
                      src={`/page.svg`}
                      width={700}
                      height={500}
                      loading="lazy"
                      alt="right-img"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {loading && fetchType === "page" ? ( // Check if "page" is being fetched
                    <div className="flex items-center">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Fetching...
                    </div>
                  ) : (
                    <div>
                      <span>Fetch Images from Page URL</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Show error if any */}
          {error && <p className="text-red-600 mt-4 font-semibold">{error}</p>}
        </div>

        {/* Show "No images found" only if fetching has occurred */}
        {fetched &&
          images.length === 0 &&
          !loading &&
          !error &&
          fetchType != null && (
            <div className="text-center text-gray-500 mt-6">
              <p>No images found. Try a different URL.</p>
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
