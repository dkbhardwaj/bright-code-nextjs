// pages/report.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { get, ref } from "firebase/database";
import { Database } from "../api/firebaseConfig"; // Adjust path as needed
import Link from "next/link";

interface ReportData {
  url: string;
  totalImages: number;
  totalImagesWithIssues: number;
  issueTypes: Record<string, number>;
  imageBreakdownByHost: { host: string; count: number }[];
  timestamp: number;
  crawlId: string;
}

const ReportPage = () => {
  const router = useRouter();
  const { crawlId } = router.query; // Extract crawlId from URL
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!crawlId) return; // Wait until crawlId is available

    const fetchReportData = async () => {
      try {
        const dbRef = ref(Database, `crawled_sites/${crawlId}`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setReportData(snapshot.val().overview); // Data is stored under 'overview'
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

  if (loading) {
    return <div className="text-white text-center">Loading report...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!reportData) {
    return <div className="text-white text-center">No data available.</div>;
  }

  return (
    <div className="section_bgImage bg-darkBlue min-h-screen p-8">
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        Report for {reportData.url}
      </h1>
      <div className="max-w-4xl mx-auto bg-bgBluePurple p-6 rounded-lg">
        {/* Project URL */}
        <div className="text-white mb-4">
          <p className="font-bold">Project:</p>
          <Link
            className="underline hover:text-purple transition-colors"
            href={reportData.url}
          >
            {reportData.url}
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="w-full md:w-[calc(50%-1rem)] bg-indigo-500 p-4 rounded-lg">
            <p className="text-white">Total Images</p>
            <h3 className="text-center text-white mt-2">
              {reportData.totalImages}
            </h3>
          </div>
          <div className="w-full md:w-[calc(50%-1rem)] bg-indigo-500 p-4 rounded-lg">
            <p className="text-white">Total Images with Issues</p>
            <h3 className="text-center text-white mt-2">
              {reportData.totalImagesWithIssues}
            </h3>
          </div>
        </div>

        {/* Issue Types */}
        <div className="bg-indigo-500 p-4 rounded-lg mb-6">
          <p className="text-white mb-2">Image Issues</p>
          {Object.entries(reportData.issueTypes).map(([type, count]) => (
            <div
              key={type}
              className="flex justify-between text-white border-b border-white py-1"
            >
              <span>{type}:</span>
              <span>{count}</span>
            </div>
          ))}
        </div>

        {/* Image Breakdown by Host */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Image Breakdown by Host
          </h3>
          {reportData.imageBreakdownByHost.map(({ host, count }) => (
            <div key={host} className="flex justify-between text-white py-1">
              <span>{host}</span>
              <span>{count}</span>
            </div>
          ))}
        </div>

        {/* Crawl ID and Timestamp */}
        <div className="text-white mt-4">
          <p>Crawl ID: {reportData.crawlId}</p>
          <p>Timestamp: {new Date(reportData.timestamp).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
