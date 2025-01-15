import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter hook for query handling
import { Bar } from "react-chartjs-2";
import Image from "next/image";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Image {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  fileSize?: number;
}
interface Link {
  url: string;
  status: number;
}

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [scope, setScope] = useState<"page" | "site">("page");
  const [images, setImages] = useState<Image[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [fetched, setFetched] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [report, setReport] = useState<{
    totalLinks: number;
    totalLinksWithIssues: number;
    hosts: string[];
    issueTypes: { [key: string]: number };
    linkTypes: { [key: string]: number };
    startUrl: string;
  } | null>(null);

  const router = useRouter(); // Access router for query parameter updates
  // console.log(router.query.url);

  useEffect(() => {
    if (url) {
      if (router.query.url !== url) {
        // console.log('Updating URL in the query');
        router.push(`?url=${encodeURIComponent(url)}`, undefined, {
          shallow: true,
        });
      }
    } else {
      // console.log('Clearing URL from query');
      router.push(router.pathname, undefined, { shallow: true });
    }
  }, [url, router]);

  const fetchWebsiteData = async (): Promise<void> => {
    setLoading(true);
    setError("");
    setImages([]);
    setLinks([]);
    setReport(null);

    try {
      const response = await fetch(
        `/api/analyze-site?url=${encodeURIComponent(url)}&scope=page`
      );
      const data = await response.json();

      if (response.ok) {
        setImages(data.images || []);
        setLinks(data.links || []);
        setReport({
          totalLinks: data.totalLinks || 0,
          totalLinksWithIssues: data.totalLinksWithIssues || 0,
          hosts: data.hosts || [],
          issueTypes: data.issueTypes || {},
          linkTypes: data.linkTypes || {},
          startUrl: data.startUrl || url,
        });
      } else {
        setError(data.error || "Failed to analyze the site.");
      }
    } catch (err: unknown) {
      setError("An error occurred while analyzing the site.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeClick = (): void => {
    if (!url) {
      setError("Please enter a valid URL.");
      return;
    }
    setFetched(true);
    fetchWebsiteData();
  };

  const handleClearInput = (): void => {
    setUrl(""); // Clear the URL input
    router.push("/", undefined, { shallow: true }); // Remove URL from query
  };
  const liBefore = `before:content['] before:absolute before:top-0 before:-left-1/2 before:w-full before:h-full before:bg-black before:z-[-1]`;

  // console.log(links);

  type LinksTableProps = {
    links: Link[];
  };

  console.log(report?.issueTypes);

  const LinksTable: React.FC<LinksTableProps> = ({ links }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[87vh] overflow-y-scroll bg-white">
      <table className="table-auto w-full min-w-[1250px] border-collapse border border-gray-300 shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border border-gray-300 px-4 py-2">Sr</th>
            <th className="border border-gray-300 px-4 py-2">Links</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link, index) => {
            const is404 = link.status === 404;
            return (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${is404 ? "bg-red-100" : ""}`}
              >
                {/* Sr */}
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>

                {/* Link */}
                <td className="border border-gray-300 px-4 py-2 text-[14px] max-w-[500px] break-words">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {link.url}
                  </a>
                </td>

                {/* Status */}
                <td className="border border-gray-300 px-4 py-2">
                  {link.status || "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      {!loading && !report && (
        <section className=" section_bgImage bg-darkBlue min-h-screen bg-gray-100 flex flex-col items-center justify-center ">
          <div className="w-[calc(100%-40px)] max-w-4xl p-8 bg-white shadow-lg rounded-lg m-[20px]">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Website Analyzer
            </h1>

            {!fetched && (
              <div className="space-y-4">
                {/* URL Input with Clear Icon */}
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter website URL"
                  />
                  {url && (
                    <button
                      type="button"
                      onClick={handleClearInput}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      title="Clear input"
                      aria-label="Clear input field"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {/* Scope Selection */}
                {/* <div className="flex justify-around items-center">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="scope"
                      value="page"
                      checked={scope === "page"}
                      onChange={() => setScope("page")}
                      className="form-radio text-indigo-600"
                    />
                    <span>Analyze Single Page</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="scope"
                      value="site"
                      checked={scope === "site"}
                      onChange={() => setScope("site")}
                      className="form-radio text-indigo-600"
                    />
                    <span>Analyze Entire Site</span>
                  </label>
                </div> */}

                {/* Analyze Button */}
                <button
                  className={`relative w-full py-3 text-white rounded-lg font-semibold ${
                    loading
                      ? "bg-indigo-300 cursor-not-allowed"
                      : "bg-indigo-500 hover:bg-indigo-600"
                  }`}
                  onClick={handleAnalyzeClick}
                  disabled={loading}
                >
                  {loading ? "Analyzing..." : "Analyze"}
                </button>
              </div>
            )}

            {fetched && loading && (
              <p className="mt-6 text-center text-gray-500 font-semibold">
                Analyzing {scope === "page" ? "page" : "entire site"}, please
                wait...
              </p>
            )}

            {error && (
              <p className="mt-4 text-red-500 text-center font-medium">
                {error}
              </p>
            )}
          </div>
        </section>
      )}

      {loading && (
        <div className="section_bgImage bg-darkBlue min-h-[100vh] flex items-center justify-center">
          <div>
            <svg
              className="hourglass"
              viewBox="0 0 56 56"
              width="56px"
              height="56px"
              role="img"
              aria-label="Hourglass being flipped clockwise and circled by three white curves fading in and out"
            >
              <clipPath id="sand-mound-top">
                <path
                  className="hourglass__sand-mound-top"
                  d="M 14.613 13.087 C 15.814 12.059 19.3 8.039 20.3 6.539 C 21.5 4.789 21.5 2.039 21.5 2.039 L 3 2.039 C 3 2.039 3 4.789 4.2 6.539 C 5.2 8.039 8.686 12.059 9.887 13.087 C 11 14.039 12.25 14.039 12.25 14.039 C 12.25 14.039 13.5 14.039 14.613 13.087 Z"
                />
              </clipPath>
              <clipPath id="sand-mound-bottom">
                <path
                  className="hourglass__sand-mound-bottom"
                  d="M 14.613 20.452 C 15.814 21.48 19.3 25.5 20.3 27 C 21.5 28.75 21.5 31.5 21.5 31.5 L 3 31.5 C 3 31.5 3 28.75 4.2 27 C 5.2 25.5 8.686 21.48 9.887 20.452 C 11 19.5 12.25 19.5 12.25 19.5 C 12.25 19.5 13.5 19.5 14.613 20.452 Z"
                />
              </clipPath>
              <g transform="translate(2,2)">
                <g
                  fill="none"
                  stroke="hsl(0,0%,100%)"
                  strokeDasharray="153.94 153.94"
                  strokeDashoffset="153.94"
                  strokeLinecap="round"
                  transform="rotate(-90,26,26)"
                >
                  <circle
                    className="hourglass__motion-thick"
                    strokeWidth="2.5"
                    cx="26"
                    cy="26"
                    r="24.5"
                    transform="rotate(0,26,26)"
                  />
                  <circle
                    className="hourglass__motion-medium"
                    strokeWidth="1.75"
                    cx="26"
                    cy="26"
                    r="24.5"
                    transform="rotate(90,26,26)"
                  />
                  <circle
                    className="hourglass__motion-thin"
                    strokeWidth="1"
                    cx="26"
                    cy="26"
                    r="24.5"
                    transform="rotate(180,26,26)"
                  />
                </g>
                <g
                  className="hourglass__model"
                  transform="translate(13.75,9.25)"
                >
                  {/* <!-- glass --> */}
                  <path
                    fill="hsl(var(--hue),90%,85%)"
                    d="M 1.5 2 L 23 2 C 23 2 22.5 8.5 19 12 C 16 15.5 13.5 13.5 13.5 16.75 C 13.5 20 16 18 19 21.5 C 22.5 25 23 31.5 23 31.5 L 1.5 31.5 C 1.5 31.5 2 25 5.5 21.5 C 8.5 18 11 20 11 16.75 C 11 13.5 8.5 15.5 5.5 12 C 2 8.5 1.5 2 1.5 2 Z"
                  />
                  {/* <!-- sand --> */}
                  <g stroke="hsl(35,90%,90%)" strokeLinecap="round">
                    <line
                      className="hourglass__sand-grain-left"
                      strokeWidth="1"
                      strokeDasharray="0.25 33.75"
                      x1="12"
                      y1="15.75"
                      x2="12"
                      y2="20.75"
                    />
                    <line
                      className="hourglass__sand-grain-right"
                      strokeWidth="1"
                      strokeDasharray="0.25 33.75"
                      x1="12.5"
                      y1="16.75"
                      x2="12.5"
                      y2="21.75"
                    />
                    <line
                      className="hourglass__sand-drop"
                      strokeWidth="1"
                      strokeDasharray="0.5 107.5"
                      x1="12.25"
                      y1="18"
                      x2="12.25"
                      y2="31.5"
                    />
                    <line
                      className="hourglass__sand-fill"
                      strokeWidth="1.5"
                      strokeDasharray="54 54"
                      x1="12.25"
                      y1="14.75"
                      x2="12.25"
                      y2="31.5"
                    />
                    <line
                      className="hourglass__sand-line-left"
                      stroke="hsl(35,90%,83%)"
                      strokeWidth="1"
                      strokeDasharray="1 107"
                      x1="12"
                      y1="16"
                      x2="12"
                      y2="31.5"
                    />
                    <line
                      className="hourglass__sand-line-right"
                      stroke="hsl(35,90%,83%)"
                      strokeWidth="1"
                      strokeDasharray="12 96"
                      x1="12.5"
                      y1="16"
                      x2="12.5"
                      y2="31.5"
                    />
                    {/* <!-- mounds --> */}
                    <g fill="hsl(35,90%,90%)" strokeWidth="0">
                      <path
                        clipPath="url(#sand-mound-top)"
                        d="M 12.25 15 L 15.392 13.486 C 21.737 11.168 22.5 2 22.5 2 L 2 2.013 C 2 2.013 2.753 11.046 9.009 13.438 L 12.25 15 Z"
                      />
                      <path
                        clipPath="url(#sand-mound-bottom)"
                        d="M 12.25 18.5 L 15.392 20.014 C 21.737 22.332 22.5 31.5 22.5 31.5 L 2 31.487 C 2 31.487 2.753 22.454 9.009 20.062 Z"
                      />
                    </g>
                  </g>
                  {/* <!-- glass glare --> */}
                  <g
                    fill="none"
                    opacity="0.7"
                    strokeLinecap="round"
                    strokeWidth="2"
                  >
                    <path
                      className="hourglass__glare-top"
                      stroke="hsl(0,0%,100%)"
                      d="M 19.437 3.421 C 19.437 3.421 19.671 6.454 17.914 8.846 C 16.157 11.238 14.5 11.5 14.5 11.5"
                    />
                    <path
                      className="hourglass__glare-bottom"
                      stroke="hsla(0,0%,100%,0)"
                      d="M 19.437 3.421 C 19.437 3.421 19.671 6.454 17.914 8.846 C 16.157 11.238 14.5 11.5 14.5 11.5"
                      transform="rotate(180,12.25,16.75)"
                    />
                  </g>
                  {/* <!-- caps --> */}
                  <rect
                    fill="hsl(var(--hue),90%,50%)"
                    width="24.5"
                    height="2"
                  />
                  <rect
                    fill="hsl(var(--hue),90%,57.5%)"
                    rx="0.5"
                    ry="0.5"
                    x="2.5"
                    y="0.5"
                    width="19.5"
                    height="1"
                  />
                  <rect
                    fill="hsl(var(--hue),90%,50%)"
                    y="31.5"
                    width="24.5"
                    height="2"
                  />
                  <rect
                    fill="hsl(var(--hue),90%,57.5%)"
                    rx="0.5"
                    ry="0.5"
                    x="2.5"
                    y="32"
                    width="19.5"
                    height="1"
                  />
                </g>
              </g>
            </svg>
            <h3 className="text-center text-white">Loading...</h3>
          </div>
        </div>
      )}

      <section className="section_bgImage  bg-darkBlue pt-[170px] pb-[100px]">
        <div className="relative border-t">
          {!loading && report && (
            <div className="flex border-r h-screen">
              {/* Vertical Tab Menu */}
              <div
                className={`sidebarWrap max-w-[230px] w-full p-[20px] bg-bgBluePurple rounded-r-[20px] transition-all ease-in-out duration-700 relative md:max-w-full md:absolute md:z-[99]`}
              >
                <div className="sidebarMain">
                  <ul>
                    <li
                      className={`relative mb-[10px] z-0 p-[10px] text-white w-full cursor-pointer ${
                        activeTab === "tab1"
                          ? `bg-black rounded-tr-lg rounded-br-lg ${liBefore}`
                          : ""
                      }`}
                      onClick={() => setActiveTab("tab1")}
                    >
                      Overview
                    </li>
                    <li
                      className={`relative mb-[10px] z-0 p-[10px] text-white w-full cursor-pointer ${
                        activeTab === "tab2"
                          ? `bg-black rounded-tr-lg rounded-br-lg ${liBefore}`
                          : ""
                      }`}
                      onClick={() => setActiveTab("tab2")}
                    >
                      Images detail
                    </li>

                    <li
                      className={`relative mb-[10px] z-0 p-[10px] text-white w-full cursor-pointer ${
                        activeTab === "tab3"
                          ? `bg-black rounded-tr-lg rounded-br-lg ${liBefore}`
                          : ""
                      }`}
                      onClick={() => setActiveTab("tab3")}
                    >
                      Links detail
                    </li>
                    <li
                      className={`relative mb-[10px] z-0 p-[10px] text-white w-full cursor-pointer ${
                        activeTab === "tab4"
                          ? `bg-black rounded-tr-lg rounded-br-lg ${liBefore}`
                          : ""
                      }`}
                      onClick={() => setActiveTab("tab4")}
                    >
                      Bad Requests
                    </li>
                    <li
                      className={`relative mb-[10px] z-0 p-[10px] text-white w-full cursor-pointer ${
                        activeTab === "tab5"
                          ? `bg-black rounded-tr-lg rounded-br-lg ${liBefore}`
                          : ""
                      }`}
                      onClick={() => setActiveTab("tab5")}
                    >
                      404 Links
                    </li>
                    {/* <li className='p-[10px]' >
                      <p className='text-white border-b-[2px] border-black'>Issues</p>
                      <ul className='pl-[10px] mt-[10px]'>
                        <li className={`p-[10px]  w-full ${activeTab === "tab3" ? 'bg-black' : ''}`} onClick={() => setActiveTab("tab3")}>
                          <p className='text-white '>All Issues</p>
                        </li>
                        <li className={`p-[10px]  w-full ${activeTab === "tab4" ? 'bg-black' : ''}`} onClick={() => setActiveTab("tab4")}>
                          <p className='text-white '>Broken</p>
                        </li>
                        <li className={`p-[10px]  w-full ${activeTab === "tab5" ? 'bg-black' : ''}`} onClick={() => setActiveTab("tab5")}>
                          <p className='text-white '>Blacklisted</p>
                        </li>
                        <li className={`p-[10px]  w-full ${activeTab === "tab6" ? 'bg-black' : ''}`} onClick={() => setActiveTab("tab6")}>
                          <p className='text-white '>Soft errors</p>
                        </li>
                      </ul>
                    </li> */}
                  </ul>
                </div>
                {/* <div className="w-1/4 border-l">
                  <button
                
                    className={`w-full mb-[10px] ${activeTab === "tab1"? "active": ""}`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setActiveTab("tab2")}
                    className={`w-full mb-[10px] ${activeTab === "tab2"
                      ? "active"
                      : ""
                      }`}
                  >
                    Analytics
                  </button>
                  <button
                    onClick={() => setActiveTab("tab3")}
                    className={`w-full mb-[10px]  ${activeTab === "tab3"
                      ? "active"
                      : ""
                      }`}
                  >
                    Settings
                  </button>
                </div> */}
              </div>

              {/* Main Content */}
              <div className="w-[calc(100%-360px)] ml-[50px] desktop:w-[calc(100%-300px)] tablet:w-[calc(100%-300px)] md:w-full md:px-[10px] md:mx-0">
                {activeTab === "tab1" && (
                  <div>
                    <div className="">
                      {/* General Report */}
                      <div className="text-white mb-[20px]">
                        <p className="font-bold text-white">Project:- </p>{" "}
                        <Link
                          className="underline hover:text-purple transition-colors"
                          href={report.startUrl}
                        >
                          {report.startUrl}
                        </Link>
                      </div>
                      <div
                        className={`cardWrap flex w-[calc(100%+20px)] md:w-full md:ml-0 ml-[-10px] flex-wrap`}
                      >
                        {/* Total Links */}
                        <div className="card w-[calc(50%-20px)] mx-[10px] desktop:w-[calc(50%-20px)] tablet:w-[calc(50%-20px)] md:w-[calc(100%-20px)] bg-bgBluePurple rounded-[8px] relative mb-[20px] p-[10px]">
                          <div className="content">
                            <p className="text-white">Total Links</p>
                            <h3 className="text-center text-white mt-[10px]">
                              {(() => {
                                // Filter unique links by URL
                                const uniqueLinks = links.filter(
                                  (link, index, self) =>
                                    index ===
                                    self.findIndex((t) => t.url === link.url) // Compare URLs to filter duplicates
                                );
                                return uniqueLinks.length;
                              })()}
                            </h3>
                          </div>
                        </div>

                        {/* Total Links with Issues */}
                        <div className="card w-[calc(50%-20px)] mx-[10px] desktop:w-[calc(50%-20px)] tablet:w-[calc(50%-20px)] md:w-[calc(100%-20px)] bg-bgBluePurple rounded-[8px] relative mb-[20px] p-[10px] ">
                          <div className="content">
                            <p className="text-white">
                              Total Links with Issues
                            </p>
                            <h3 className="text-center text-white mt-[10px]">
                              {report.totalLinksWithIssues}
                            </h3>
                          </div>
                        </div>
                        {/* New Links */}
                        {/* <div className="card w-[calc(50%-20px)] mx-[10px] desktop:w-[calc(50%-20px)] tablet:w-[calc(50%-20px)] md:w-[calc(100%-20px)] bg-bgBluePurple rounded-[8px] relative mb-[20px] p-[10px] ">
                          <div className="content">
                            <p className='text-white'>New Links</p>
                            <h3 className='text-center text-white mt-[10px]'>N/A</h3>
                          </div>
                        </div> */}
                        {/* Issue Types */}
                        <div className="card w-[calc(50%-20px)] mx-[10px] desktop:w-[calc(50%-20px)] lg:w-[calc(100%-20px)] bg-bgBluePurple rounded-[8px] relative mb-[20px] p-[10px]">
                          {Object.entries(report.issueTypes).length > 0 && (
                            <div className="mb-6">
                              <p className="text-white mb-[10px]">
                                Issue Types
                              </p>
                              {(() => {
                                // Filter unique links
                                const uniqueLinks = links.filter(
                                  (link, index, self) =>
                                    index ===
                                    self.findIndex((t) => t.url === link.url) // Compare URLs to filter duplicates
                                );

                                // Define a type for the issueTypes object
                                type IssueTypes = Record<string, number>;

                                // Recalculate issue types based on unique links
                                const uniqueIssueTypes =
                                  uniqueLinks.reduce<IssueTypes>(
                                    (acc, link) => {
                                      if (link.status === 404) {
                                        acc["404 Not Found"] =
                                          (acc["404 Not Found"] || 0) + 1;
                                      } else if (link.status === 400) {
                                        acc["400 Bad Request"] =
                                          (acc["400 Bad Request"] || 0) + 1;
                                      }
                                      return acc;
                                    },
                                    {} as IssueTypes
                                  );

                                return Object.entries(uniqueIssueTypes).map(
                                  ([type, count]) => (
                                    <div
                                      key={type}
                                      className="w-full flex justify-between border-b-[1px] pb-[5px] border-black mt-[10px]"
                                      onClick={() => {
                                        if (type === "400 Bad Request") {
                                          setActiveTab("tab4");
                                        } else {
                                          setActiveTab("tab5");
                                        }
                                      }}
                                    >
                                      <p className="text-white cursor-pointer hover:underline transition-all ease-in-out delay-300">
                                        {type}:
                                      </p>
                                      <p className="text-white">{count}</p>
                                    </div>
                                  )
                                );
                              })()}
                            </div>
                          )}
                        </div>
                        {/* Link Types */}
                        <div className="card w-[calc(50%-20px)] mx-[10px] desktop:w-[calc(50%-20px)] lg:w-[calc(100%-20px)] bg-bgBluePurple rounded-[8px] relative mb-[20px] p-[10px]">
                          {Object.entries(report.issueTypes).length > 0 && (
                            <div className="mb-6">
                              <p className="text-white mb-[10px]">Link Types</p>

                              {Object.entries(report.linkTypes).map(
                                ([type, count]) => (
                                  <div
                                    key={type}
                                    className="w-full flex justify-between border-b-[1px] pb-[5px] border-black mt-[10px]"
                                    onClick={() => {
                                      if (type === "<a href>") {
                                        setActiveTab("tab3");
                                      } else {
                                        setActiveTab("tab2");
                                      }
                                    }}
                                  >
                                    <p
                                      className={`
                                      text-white
                                      ${
                                        type === "<a href>" &&
                                        "cursor-pointer hover:underline transition-all ease-in-out delay-300"
                                      }
                                      ${
                                        type === "<img src>" &&
                                        "cursor-pointer hover:underline transition-all ease-in-out delay-300"
                                      }
                                    `}
                                    >
                                      {type}:
                                    </p>

                                    <p className="text-white">{count}</p>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Images Breakdown by Host */}
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                          Image Breakdown by Host
                        </h3>
                        <div className="relative h-[300px] bg-white rounded-lg overflow-hidden">
                          <Bar
                            data={{
                              labels: report.hosts,
                              datasets: [
                                {
                                  label: "Images by Host",
                                  data: report.hosts.map(
                                    (host) =>
                                      images.filter((img) => {
                                        try {
                                          // Use img.src instead of img
                                          const imgUrl = new URL(img.src);
                                          return imgUrl.hostname === host;
                                        } catch (e) {
                                          return false; // Ignore invalid URLs
                                        }
                                      }).length
                                  ),
                                  backgroundColor: "#6366F1",
                                },
                              ],
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "tab2" && (
                  <div className="max-w-[1600px] mx-auto">
                    <h1 className="text-white text-center">Image Details</h1>
                    {images.length > 0 && (
                      <div className="mt-8 w-full ">
                        <h4 className="text-white mb-4">
                          Found {images.length} images:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[87vh] overflow-y-scroll  bg-white">
                          {/* {images.map((image, index) => (
                            <div
                              key={index}
                              className="border rounded-md overflow-hidden shadow-md"
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
                          ))} */}

                          <table className="table-auto w-full min-w-[1250px] border-collapse border border-gray-300 shadow-md rounded-md">
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
                                  File Size
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
                              {images.map((image, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                  {/* Sr */}
                                  <td className="border border-gray-300 px-4 py-2">
                                    {index + 1}
                                  </td>

                                  {/* Image */}
                                  <td className="border border-gray-300 px-4 py-2 text-[14px] max-w-[500px] break-words ">
                                    {image.src}
                                    {/* <img
                                      src={image.src}
                                      alt={image.alt || `Image ${index + 1}`}
                                      className="w-20 h-20 object-contain"
                                    /> */}
                                  </td>

                                  {/* Size (px) */}
                                  <td className="border border-gray-300 text-[14px] px-4 py-2">
                                    {image.width && image.height
                                      ? `${image.width} x ${image.height}`
                                      : "N/A"}
                                  </td>

                                  {/* File Size */}
                                  <td className="border border-gray-300 text-[14px] px-4 py-2">
                                    {image.fileSize
                                      ? `${(image.fileSize / 1024).toFixed(
                                          2
                                        )} KB`
                                      : "N/A"}
                                  </td>

                                  {/* Alt Text */}
                                  <td className="border border-gray-300 text-[14px] px-4 py-2">
                                    {image.alt || "No Alt Text"}
                                  </td>

                                  {/* View */}
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
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "tab3" && (
                  <div className="max-w-[1600px] mx-auto">
                    <h1 className="text-white text-center">Links Detail</h1>
                    {links.length > 0 ? (
                      (() => {
                        // Remove duplicate links based on their URL
                        const uniqueLinks = links.filter(
                          (link, index, self) =>
                            index === self.findIndex((t) => t.url === link.url) // Compare URLs to filter duplicates
                        );

                        return uniqueLinks.length > 0 ? (
                          <div className="mt-8 w-full">
                            <h4 className="text-white mb-4">
                              Found {uniqueLinks.length} Unique Links:
                            </h4>
                            <LinksTable links={uniqueLinks} />
                          </div>
                        ) : (
                          <h4 className="text-white mb-4">
                            No Unique Links Found
                          </h4>
                        );
                      })()
                    ) : (
                      <h4 className="text-white mb-4">No Links Available</h4>
                    )}
                  </div>
                )}

                {activeTab === "tab4" && (
                  <div className="max-w-[1600px] mx-auto">
                    <h1 className="text-white text-center">Bad Requests</h1>
                    {links.length > 0 ? (
                      (() => {
                        // Filter links with status 400
                        const badRequests = links.filter(
                          (link) => String(link.status) === "400"
                        );

                        // Remove duplicate links based on their URL
                        const uniqueBadRequests = badRequests.filter(
                          (link, index, self) =>
                            index === self.findIndex((t) => t.url === link.url) // Compare URLs to filter duplicates
                        );

                        return uniqueBadRequests.length > 0 ? (
                          <div className="mt-8 w-full">
                            <h4 className="text-white mb-4">
                              Found {uniqueBadRequests.length} Bad Requests:
                            </h4>
                            <LinksTable links={uniqueBadRequests} />
                          </div>
                        ) : (
                          <h4 className="text-white mb-4">
                            No Bad Requests Found
                          </h4>
                        );
                      })()
                    ) : (
                      <h4 className="text-white mb-4">No Links Available</h4>
                    )}
                  </div>
                )}

                {activeTab === "tab5" && (
                  <div className="max-w-[1600px] mx-auto">
                    <h1 className="text-white text-center">404 Links</h1>
                    {links.length > 0 ? (
                      (() => {
                        // Filter links with status 404
                        const badRequests = links.filter(
                          (link) => String(link.status) === "404"
                        );

                        // Remove duplicate links based on their URL
                        const uniqueBadRequests = badRequests.filter(
                          (link, index, self) =>
                            index === self.findIndex((t) => t.url === link.url) // Compare URLs to filter duplicates
                        );

                        return uniqueBadRequests.length > 0 ? (
                          <div className="mt-8 w-full">
                            <h4 className="text-white mb-4">
                              Found {uniqueBadRequests.length} 404 Links:
                            </h4>
                            <LinksTable links={uniqueBadRequests} />
                          </div>
                        ) : (
                          <h4 className="text-white mb-4">
                            No 404 Links Found
                          </h4>
                        );
                      })()
                    ) : (
                      <h4 className="text-white mb-4">No Links Available</h4>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
