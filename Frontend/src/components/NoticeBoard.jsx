import React, { useEffect, useState } from "react";
import { getAllNotices } from "../services/noticeService";

const API_URL = "http://localhost:5000";

const tabs = [
  "All",
  "Administration",
  "Education",
  "Health",
  "Agriculture",
  "Engineering",
  "Finance",
  "IT",
  "General Knowledge",
];

function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getAllNotices();

      console.log("STUDENT NOTICE API:", result);
      console.log("NOTICE DATA:", result.data);
      
      setNotices(result.data || []);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
      setError(error.message || "Failed to fetch notices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const filteredNotices =
    activeTab === "All"
      ? notices
      : notices.filter(
        (notice) =>
          notice.sector?.toLowerCase() ===
          activeTab.toLowerCase()
      );

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getPdfUrl = (pdfPath) => {
    if (!pdfPath) return "#";

    return `${API_URL}${pdfPath}`;
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#182235]">
              Notice Board
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Latest official notices and announcements
            </p>
          </div>

          <button
            onClick={fetchNotices}
            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-[#182235] hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 border-b border-gray-200">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 px-1 pb-4 text-sm font-semibold transition ${isActive
                    ? "border-[#1769AA] text-[#182235]"
                    : "border-transparent text-gray-500 hover:text-[#1769AA]"
                  }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-12 text-center text-gray-500">
            Loading notices...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-5 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Notice Cards */}
        {!loading && !error && (
          <div className="mt-6 space-y-5">

            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                  {/* Notice Content */}
                  <div className="flex-1">

                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-[#B9D9F5] bg-[#EEF7FF] px-3 py-1 text-xs font-semibold text-[#0874BD]">
                        {notice.sector}
                      </span>

                      <span className="rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-semibold uppercase text-gray-500">
                        {notice.notice_type}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${notice.status?.toLowerCase() ===
                            "open"
                            ? "border border-green-300 bg-green-50 text-green-600"
                            : "border border-gray-300 bg-gray-50 text-gray-500"
                          }`}
                      >
                        {notice.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#303B4C]">
                      {notice.title}
                    </h3>

                    {notice.organization && (
                      <p className="mt-2 text-sm font-semibold text-gray-600">
                        {notice.organization}
                      </p>
                    )}

                    {notice.description && (
                      <p className="mt-3 text-sm leading-6 text-gray-500">
                        {notice.description}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-500">
                      <div>
                        <span className="font-semibold text-[#303B4C]">
                          Published:
                        </span>{" "}
                        {formatDate(
                          notice.published_date
                        )}
                      </div>

                      <div>
                        <span className="font-semibold text-[#303B4C]">
                          Deadline:
                        </span>{" "}
                        {formatDate(
                          notice.deadline
                        )}
                      </div>
                    </div>
                  </div>

                  {/* PDF Button */}
                  <div className="flex-shrink-0">
                    {notice.notice_pdf && (
                      <a
                        href={getPdfUrl(
                          notice.notice_pdf
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-lg bg-[#0874BD] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0767AA]"
                      >
                        View Notice PDF
                      </a>
                    )}
                  </div>

                </div>
              </div>
            ))}

            {/* No notices */}
            {filteredNotices.length === 0 && (
              <div className="rounded-lg border border-gray-200 py-12 text-center text-gray-500">
                No notices available for this sector.
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}

export default NoticeBoard;