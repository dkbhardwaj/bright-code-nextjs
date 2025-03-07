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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [imageDetails, setImageDetails] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    if (!crawlId) return;

    const fetchReportData = async () => {
      try {
        const dbRef = ref(Database, `crawled_sites/${crawlId}`);
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Full fetched report data:", data); // Log full data

          setReportData({
            ...data.overview,
          });

          setImageDetails(data.imageDetails || []); // Store image details separately
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
        <div className="headerPart text-center">
          <div className="flex gap-5 justify-center items-baseline">
          <h3>Report</h3><span className="!text-white">by Bright Code Tools</span>
          </div>
          <div>
            <div className="resultsMenu gap-[50px] flex justify-center my-[50px]">
              <div className="relative border-solid border-4 border-white rounded-lg max-w-[30%] min-w-[160px] min-h-[160px] flex justify-center items-center hover:border-orange transition-[border] flex-col">
                <Link
                  className="menuItem back redirect"
                  href="/tools/image-checker"
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

              {/* <div className="relative border-solid border-4 border-white rounded-lg max-w-[30%] min-w-[160px] min-h-[160px] flex justify-center items-center hover:border-orange transition-[border] flex-col">
                <Link
                  className="menuItem restart redirect"
                  href=""
                  ng-click="testAgain()"
                >
                  .{" "}
                </Link>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#fff"
                    d="M437 75a255 255 0 00-421 91l60 23a192 192 0 01316-69l-72 72h192V0l-75 75zM256 448c-53 0-101-21-136-56l72-72H0v192l75-75a255 255 0 00421-91l-60-23c-27 73-98 125-180 125z"
                  ></path>
                </svg>
                <span className="!text-white mt-[30px]">Test again</span>
              </div> */}

              <div
                className={`relative border-solid border-4 border-white rounded-lg max-w-[30%] min-w-[160px] min-h-[160px] flex justify-center items-center flex-col cursor-pointer hover:border-orange transition-[border] ${
                  activeTab === "tab1" ? "border-orange" : ""
                }`}
                onClick={() => setActiveTab("tab1")}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#fff"
                    d="M0 0h128v128H0zm192 32h320v64H192zM0 192h128v128H0zm192 32h320v64H192zM0 384h128v128H0zm192 32h320v64H192z"
                  ></path>
                </svg>
                <span className="!text-white mt-[30px] inline-block">
                  Dashboard
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-[40px] rounded-lg">
          <div className="globalScore mb-8 flex items-center justify-center gap-6">
            <div className="w-[50%]">
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
            </div>
            {/* Optional: Add screenshot if available in Firebase */}
            <div className="screenshotWrapper w-[40%] mx-[20px]">
              <ScreenshotPreview url={reportData?.url} />
            </div>
          </div>
          {activeTab === "tab1" && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Score Details
              </h2>
              <div className="notations space-y-6">
                {categories.map((category, index) => {
                  // console.log("Category:", category); // Logs each category object

                  return (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row gap-4"
                    >
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
                              <div
                                key={ruleIndex}
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

                                {/* Add onClick handler if rule.label is "Total Images" */}
                                <div
                                  className={`label flex-1 ml-4 text-gray-700 ${
                                    rule.label === "Total Images"
                                      ? "cursor-pointer text-blue-500 hover:underline"
                                      : ""
                                  }`}
                                  onClick={
                                    rule.label === "Total Images"
                                      ? () => setActiveTab("tab2")
                                      : undefined
                                  }
                                >
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
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {activeTab === "tab2" && (
            <div className="max-w-[1600px] mx-auto">
              <h2 className="text-2xl !text-black font-bold text-gray-800 mb-6">
                Image Details
              </h2>
              {imageDetails.length > 0 && (
                <div className="mt-8 w-full ">
                  <h4 className="text-white mb-4">
                    Found {imageDetails.length} images:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[87vh] overflow-y-scroll overflow-visible bg-white">
                    <table className="table-auto w-full min-w-[1250px] border-collapse border border-gray-300 shadow-md">
                      <thead>
                        <tr className="bg-gray-200 text-left">
                          <th className="border border-gray-300 px-4 py-2">
                            Sr
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Image
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Size (px)
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            <div className="flex items-center justify-between">
                              <span className="text-base font-bold text-black">
                                File Size
                              </span>
                              <div className="relative inline-block group"></div>
                            </div>
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Alt Text
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            View
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {imageDetails.map((image, index) => {
                          // console.log("Image Details:", image); // Logs each image object

                          return (
                            <tr key={index} className="hover:bg-gray-100">
                              <td className="border border-gray-300 px-4 py-2">
                                {index + 1}
                              </td>
                              <td className="border border-gray-300 px-4 py-2 text-[14px] max-w-[500px] break-words">
                                <a
                                  href={image.src}
                                  target="__blank"
                                  className="hover:text-purple transition-colors"
                                >
                                  {image.src}
                                </a>
                              </td>
                              <td className="border border-gray-300 text-[14px] px-4 py-2">
                                {image.width === "N/A" || image.height === "N/A"
                                  ? "N/A"
                                  : `${image.width} x ${image.height}`}
                              </td>

                              <td className="border border-gray-300 text-[14px] px-4 py-2">
                                {image.fileSize
                                  ? `${image.fileSize} KB`
                                  : "N/A"}
                              </td>
                              <td className="border border-gray-300 text-[14px] px-4 py-2">
                                {image.alt || "No Alt Text"}
                              </td>
                              <td className="border border-gray-300 px-4 text-[14px] py-2">
                                <a
                                  href={image.src}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  View Image
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
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

const ScreenshotPreview = ({ url }: { url: string }) => {
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
          <img src={screenshot} alt="Website Screenshot" className="w-full" />
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
