// pages/report.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { get, ref } from "firebase/database";
import { Database } from "../api/firebaseConfig";
import Link from "next/link";

interface Rule {
  score: number; // 0-100
  label: string;
  result: string; // Value with unit
  unit?: string; // e.g., "bytes", "ms"
  abnormal?: boolean;
}

interface Category {
  categoryScore: number; // 0-100
  category: string;
  rules: Rule[];
}

interface ReportData {
  url: string;
  totalImages: number;
  totalImagesWithIssues: number;
  issueTypes: Record<string, number>;
  imageBreakdownByHost: { host: string; count: number }[];
  timestamp: number;
  crawlId: string;
  globalScore: number; // Add this to your Firebase data
}

const getGrade = (score: number): string => {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  if (score >= 50) return "E";
  return "F";
};

const ReportPage = () => {
  const router = useRouter();
  const { crawlId } = router.query;
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!crawlId) return;

    const fetchReportData = async () => {
      try {
        const dbRef = ref(Database, `crawled_sites/${crawlId}`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setReportData(snapshot.val().overview);
        } else {
          setError("No report found for this ID.");
        }
      } catch (err) {
        setError("Failed to fetch report data.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [crawlId]);

  const handleShareReport = async () => {
    if (!crawlId) {
      setError("No report available to share.");
      return;
    }
    const shareUrl = `${window.location.origin}/report?crawlId=${crawlId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setError("");
      setShareFeedback("Copied!");
      setTimeout(() => setShareFeedback(null), 2000);
    } catch (err) {
      setError("Failed to copy URL.");
      console.error("Clipboard error:", err);
    }
  };

  if (loading)
    return <div className="text-white text-center">Loading report...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!reportData)
    return <div className="text-white text-center">No data available.</div>;

  // Simulate globalScore (add this to your Firebase data later)
  const globalScore =
    reportData.globalScore ||
    Math.round(
      ((reportData.totalImages - reportData.totalImagesWithIssues) /
        reportData.totalImages) *
        100
    ) ||
    0;

  // Define categories and rules based on your data
  const categories: Category[] = [
    {
      category: "Image Performance",
      categoryScore:
        Math.round(
          ((reportData.totalImages - reportData.totalImagesWithIssues) /
            reportData.totalImages) *
            100
        ) || 0,
      rules: [
        {
          label: "Total Images",
          score:
            reportData.totalImages <= 50
              ? 90
              : reportData.totalImages <= 100
              ? 70
              : 50,
          result: `${reportData.totalImages}`,
        },
        {
          label: "Images with Issues",
          score:
            reportData.totalImagesWithIssues === 0
              ? 100
              : reportData.totalImagesWithIssues <= 5
              ? 80
              : 60,
          result: `${reportData.totalImagesWithIssues}`,
          abnormal: reportData.totalImagesWithIssues > 5,
        },
        ...Object.entries(reportData.issueTypes).map(([type, count]) => ({
          label: type,
          score: count === 0 ? 100 : count <= 2 ? 80 : 60,
          result: `${count}`,
          abnormal: count > 2,
        })),
      ],
    },
    {
      category: "Host Distribution",
      categoryScore:
        reportData.imageBreakdownByHost.length <= 3
          ? 90
          : reportData.imageBreakdownByHost.length <= 5
          ? 70
          : 50,
      rules: reportData.imageBreakdownByHost.map(({ host, count }) => ({
        label: `Images from ${host}`,
        score: count <= 10 ? 90 : count <= 20 ? 70 : 50,
        result: `${count}`,
        abnormal: count > 20,
      })),
    },
  ];

  return (
    <section className="image-checker-report min-h-screen pt-[200px] pb-[150px] bg-purple">
      <div className="container">
        <div className="bg-white p-[40px] rounded-lg">
          {/* Global Score */}
          <div className="globalScore mb-8 flex items-center justify-center gap-6">
            <div className="w-[60%]">
              <h2 className="text-2xl font-bold text-gray-800">Global Score</h2>
              <div className="globalScoreDisplay flex items-center gap-4 mt-2">
                <div
                  className={`globalGrade text-4xl font-bold w-16 h-16 flex items-center justify-center rounded-full text-white ${
                    getGrade(globalScore) === "A"
                      ? "bg-green-500"
                      : getGrade(globalScore) === "B"
                      ? "bg-lime-500"
                      : getGrade(globalScore) === "C"
                      ? "bg-yellow-500"
                      : getGrade(globalScore) === "D"
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                >
                  {getGrade(globalScore)}
                </div>
                <div className="on100 text-xl text-gray-700">
                  {globalScore}/100
                </div>
              </div>
              <p className="mt-2 font-bold">
                Analyzed URL :{" "}
                <Link
                  href={reportData.url}
                  className="underline text-blue-600 font-normal hover:text-purple transition-colors"
                >
                  {" "}
                  {reportData.url}
                </Link>
              </p>
              {/* <button
                onClick={handleShareReport}
                className="mt-2 py-2 px-4 text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold disabled:bg-indigo-300 disabled:cursor-not-allowed"
                disabled={!crawlId}
                title="Share this report"
              >
                {shareFeedback || "Share Report"}
              </button> */}
            </div>
            {/* Optional: Add screenshot if available in Firebase */}
            <div className="screenshotWrapper w-[40%]">
              <img
                src="/placeholder-screenshot.jpg"
                alt="Screenshot"
                className="screenshotImage rounded-lg max-w-xs"
              />
            </div>
          </div>
          {/* Score Details */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Score Details
          </h2>
          <div className="notations space-y-6">
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4">
                <div
                  className={`categoryScore text-2xl font-bold w-12 h-12 flex items-center justify-center rounded-full ${
                    getGrade(category.categoryScore) === "A"
                      ? "bg-green-500 text-white"
                      : getGrade(category.categoryScore) === "B"
                      ? "bg-lime-500 text-white"
                      : getGrade(category.categoryScore) === "C"
                      ? "bg-yellow-500 text-white"
                      : getGrade(category.categoryScore) === "D"
                      ? "bg-orange text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {getGrade(category.categoryScore)}
                </div>
                <div className="flex-1">
                  <div className="category text-xl font-semibold text-gray-800 mb-2">
                    {category.category}
                  </div>
                  <div className="criteria">
                    <div className="table w-full border-collapse">
                      {category.rules.map((rule, ruleIndex) => (
                        <a
                          key={ruleIndex}
                          href={`#${rule.label
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`} // Placeholder link
                          className={`flex items-center justify-between py-2 px-4 border-b border-gray-200 hover:bg-gray-50 ${
                            rule.abnormal ? "warning bg-yellow-50" : ""
                          }`}
                        >
                          <div className="grade">
                            <div
                              className={`text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full ${
                                getGrade(rule.score) === "A"
                                  ? "bg-green-500 text-white"
                                  : getGrade(rule.score) === "B"
                                  ? "bg-lime-500 text-white"
                                  : getGrade(rule.score) === "C"
                                  ? "bg-yellow-500 text-white"
                                  : getGrade(rule.score) === "D"
                                  ? "bg-orange text-white"
                                  : "bg-red-500 text-white"
                              }`}
                            >
                              {getGrade(rule.score)}
                            </div>
                          </div>
                          <div className="label flex-1 ml-4 text-gray-700">
                            {rule.label}
                          </div>
                          <div className="result flex items-center gap-2 text-gray-700">
                            <span>
                              {rule.result}
                              {rule.unit ? ` ${rule.unit}` : ""}
                            </span>
                            {rule.abnormal && (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 512 512"
                                className="text-red-500"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill="red"
                                  d="M256 79L84 448h344L256 79zm0-79c11 0 22 7 30 22l219 436c17 30 2 54-32 54H39c-34 0-49-24-32-54L226 22c8-15 19-22 30-22zm0 192c18 0 32 14 32 32l-10 96h-44l-10-96c0-18 14-32 32-32z"
                                />
                                <circle
                                  cx="256"
                                  cy="384"
                                  r="31"
                                  stroke="#FF0000"
                                />
                              </svg>
                            )}
                          </div>
                          {/* <div className="info ml-4">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 512 512"
                              className="text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M224 352h64v64h-64zm128-224c18 0 32 14 32 32v96l-96 64h-64v-32l96-64v-32H160v-64h192zm-96-80A207 207 0 0048 256a207 207 0 00208 208 207 207 0 00208-208A207 207 0 00256 48zm0-48a256 256 0 110 512 256 256 0 010-512z" />
                            </svg>
                          </div> */}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Footer Info */}
          <div className="mt-8 text-gray-600 text-center">
            <p>
              Need help accelerating your website?{" "}
              <Link
                href={`/contact`}
                className="underline transition-colors hover:text-purple"
              >
                {" "}
                Contact us.
              </Link>
            </p>
            {/* <p>Crawl ID: {reportData.crawlId}</p>
            <p>Timestamp: {new Date(reportData.timestamp).toLocaleString()}</p> */}
          </div>
        </div>
        <div className="w-full text-center py-[40px]">
          <p className="!text-white underline">
            {" "}
            <Link href={`/`}>More about Bright Code Tools</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReportPage;
