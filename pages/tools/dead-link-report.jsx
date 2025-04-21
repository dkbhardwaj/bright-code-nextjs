"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { get, ref } from "firebase/database";
import Link from "next/link";
import ResultsTable from "./components/ResultsTable";
import styles from "./styles/Home.module.css";
import { Database } from "../api/firebaseConfig";

const DeadLinkReport = () => {
  const router = useRouter();
  const { savedId } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null);

    console.log(savedId);
    
  useEffect(() => {
    if (!savedId) return;

    const fetchReportData = async () => {
      try {
        const dbRef = ref(
          Database,
          `dead_link_checker_crawled_sites/${savedId}`
        );
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Fetched report data:", data); // Debug
          setReportData(data);
        } else {
          setError("No results found for this ID.");
        }
      } catch (err) {
        setError("Failed to fetch results.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [savedId]);

  if (loading)
    return <div className="text-white text-center">Loading results...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!reportData)
    return <div className="text-white text-center">No data available.</div>;

  return (
    <section className="min-h-screen pt-[200px] pb-[150px] bg-purple">
      <div className="container">
        <div className="headerPart text-center">
          <div className="flex gap-5 justify-center items-baseline">
            <h3>404 Link Checker Results</h3>
            <span className="!text-white">by Bright Code Tools</span>
          </div>
          <div>
            <div className="resultsMenu gap-[50px] flex justify-center my-[50px]">
              <div className="relative border-solid border-4 border-white rounded-lg max-w-[30%] min-w-[160px] min-h-[160px] flex justify-center items-center hover:border-orange transition-[border] flex-col">
                <Link
                  className="menuItem back redirect"
                  href="/tools/dead-link-checker"
                >
                  .
                </Link>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#fff"
                    d="M256 0a256 256 0 110 512 256 256 0 010-512zm0 464a208 208 0 100-416 208 208 0 000 416zM105 233l128-128a32 32 0 1146 46l-74 73h179a32 32 0 010 64H205l74 73a32 32 0 01-46 46L105 279a32 32 0 010-46z"
                  ></path>
                </svg>
                <span className="!text-white mt-[30px]">New test</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-[40px] rounded-lg">
          <div className="mb-8 flex items-center justify-center gap-6">
            <div className="w-[60%]">
              <h2 className="text-2xl font-bold text-gray-800">Analyzed URL</h2>
              <p className="mt-2 font-bold">
                <Link
                  href={reportData?.url}
                  className="underline text-blue-600 font-normal hover:text-purple transition-colors"
                >
                  {reportData?.url}
                </Link>
              </p>
            </div>
            <div className="screenshotWrapper w-[40%] mx-[20px]">
              <ScreenshotPreview url={reportData?.url} />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Broken Links (404 Errors)
            </h2>
            {reportData.brokenLinks.length > 0 ? (
              <>
                <p className={styles.description}>
                  Found {reportData.brokenLinks.length} broken links
                </p>
                <ResultsTable
                  results={reportData.brokenLinks}
                  isLoading={false}
                />
              </>
            ) : (
              <h3 className="text-md text-gray-600 italic">
                No broken links found.
              </h3>
            )}
          </div>

          <div className="mt-8 text-gray-600 text-center">
            <p>
              Need help fixing broken links?{" "}
              <Link
                href="/contact"
                className="underline transition-colors hover:text-purple"
              >
                Contact us.
              </Link>
            </p>
          </div>
        </div>

        <div className="w-full text-center py-[40px]">
          <p className="!text-white underline">
            <Link href="/">More about Bright Code Tools</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DeadLinkReport;

const ScreenshotPreview = ({ url }) => {
  const [screenshot, setScreenshot] = useState("");

  useEffect(() => {
    if (!url) return;

    const fetchScreenshot = async () => {
      try {
        const response = await fetch(
          `/api/screenshot?url=${encodeURIComponent(url)}`
        );
        if (response.ok) {
          const blob = await response.blob();
          setScreenshot(URL.createObjectURL(blob));
        }
      } catch (error) {
        console.error("Error fetching screenshot:", error);
      }
    };

    fetchScreenshot();
  }, [url]);

  return (
    <div className="w-full">
      {screenshot ? (
        <div className="relative py-[10px] pl-[30px] pr-[50px] shadow-lg bg-black rounded-lg">
          <img
            src={screenshot}
            alt="Website Screenshot"
            className="w-full max-h-[200px] object-cover object-top"
          />
          <span className="text-[0] w-[30px] h-[30px] border-2 border-gray rounded-full inline-block absolute -translate-y-1/2 top-1/2 left-[90%] z-[1]">
            .
          </span>
          <span className="text-[0] w-[30px] h-[30px] border-l-2 border-l-gray rounded-sm inline-block absolute -translate-y-1/2 top-1/2 left-[3%] z-[1]">
            .
          </span>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-500">Loading preview...</p>
        </div>
      )}
    </div>
  );
};
