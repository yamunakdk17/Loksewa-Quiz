
import { useState } from "react";

const notices = [
  {
    sectors: ["Administration"],
    title: "9th Level Officer (non-technical and technical), Local Service. 36 vacancies.",
    organization: "Madhesh Pradesh Lok Sewa Aayog",
    notice: "Notice no. 107/2083-84. Various services, groups and sub-groups. Apply online at ppsconline.p2.gov.np.",
    deadline: "30 Sep 2026",
    status: "Closes in 8 days",
    detail: "Double fee until 7 Oct 2026",
    source: "EducateNepal",
    type: "VACANCY",
  },
  {
    sectors: ["Administration", "Education", "Health"],
    title: "9th, 8th and 7th level officer posts (non-technical and technical), Local Service. 19 vacancies.",
    organization: "Karnali Pradesh Lok Sewa Aayog",
    notice: "Notice no. 09/2083-084. Services: local engineering, health, education and administration. Exam centre: Birendranagar, Surkhet.",
    deadline: "5 Oct 2026",
    status: "Closes in 13 days",
    detail: "Double fee until 12 Oct 2026",
    source: "EducateNepal",
    type: "VACANCY",
  },
  {
    sectors: ["Administration", "Health"],
    title: "Annual vacancy calendar for fiscal year 2083/84, all provinces.",
    organization: "Public Service Commission (federal)",
    notice: "Effective 17 July 2026 to 16 July 2027. Covers the federal civil, health, parliament and human rights services, security agencies and organised institutions.",
    deadline: "No deadline",
    status: "Information",
    detail: "Effective 17 Jul 2026 to 16 Jul 2027",
    source: "CollegeNP",
    type: "CALENDAR",
  },
];

// const tabs = [
//   { name: "All", count: 9 },
//   { name: "Administration" },
//   { name: "Education", count: 3 },
//   { name: "Health", count: 3 },
//   { name: "IT", count: 2 },
// ];

function NoticeBoard() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredNotices =
    activeTab === "All"
      ? notices
      : notices.filter((notice) =>
          notice.sectors.includes(activeTab)
        );

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-3xl font-bold text-[#182235]">
            Notice board
          </h2>

          <span className="text-sm text-gray-500">
            Checked 21 Sep 2026
          </span>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-x-7 border-b border-gray-200">

          {tabs.map((tab) => {
            const isActive = activeTab === tab.name;

            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`border-b-2 px-1 pb-4 text-sm font-semibold transition ${
                  isActive
                    ? "border-[#1769AA] text-[#182235]"
                    : "border-transparent text-gray-500 hover:text-[#1769AA]"
                }`}
              >
                {tab.name}

                <span className="ml-2 rounded-full border border-gray-200 bg-gray-50 px-2 py-1 text-xs">
                  {tab.count}
                </span>
              </button>
            );
          })}

        </div>

        {/* Description and Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-5">

          <p className="text-sm text-gray-500">
            Newest deadlines first. Closed notices are kept below for reference.
          </p>

          <button className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-[#182235] hover:bg-gray-50">
            Open notices only
          </button>

        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200">

          <table className="w-full min-w-[950px] text-left text-sm">

            <thead className="bg-[#F6F8FA] text-gray-500">
              <tr>
                <th className="w-[14%] px-4 py-3">Sector</th>
                <th className="w-[39%] px-4 py-3">Notice</th>
                <th className="w-[14%] px-4 py-3">Deadline</th>
                <th className="w-[18%] px-4 py-3">Status</th>
                <th className="w-[15%] px-4 py-3">Source</th>
              </tr>
            </thead>

            <tbody>
              {filteredNotices.map((notice, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 align-top"
                >

                  {/* Sector */}
                  <td className="border-l-[3px] border-l-[#0874BD] px-3 py-4">
                    <div className="flex flex-wrap gap-2">
                      {notice.sectors.map((sector) => (
                        <span
                          key={sector}
                          className="rounded-full border border-[#B9D9F5] bg-[#EEF7FF] px-2 py-1 text-xs font-semibold text-[#0874BD]"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Notice */}
                  <td className="px-4 py-4">

                    <h3 className="text-base font-bold leading-6 text-[#303B4C]">
                      {notice.title}
                    </h3>

                    <div className="mt-2">
                      <span className="mr-2 border border-gray-300 px-2 py-1 text-[10px] font-semibold text-gray-500">
                        {notice.type}
                      </span>

                      <span className="text-sm text-gray-500">
                        {notice.organization}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {notice.notice}
                    </p>

                  </td>

                  {/* Deadline */}
                  <td className="px-4 py-4">
                    <span className="font-bold text-[#303B4C]">
                      {notice.deadline}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">

                    {notice.type === "CALENDAR" ? (
                      <span className="inline-block rounded-full border border-blue-500 px-2 py-1 text-xs font-semibold text-blue-600">
                        {notice.status}
                      </span>
                    ) : (
                      <>
                        <span className="inline-block rounded-full border border-red-400 px-2 py-1 text-xs font-semibold text-red-500">
                          {notice.status}
                        </span>

                        <p className="mt-2 text-sm text-gray-500">
                          {notice.detail}
                        </p>
                      </>
                    )}

                  </td>

                  {/* Source */}
                  <td className="px-4 py-4">
                    <a
                      href="#"
                      className="font-medium text-[#0874BD] underline"
                    >
                      {notice.source}
                    </a>
                  </td>

                </tr>
              ))}

              {filteredNotices.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No notices available for this sector.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>
    </section>
  );
}

export default NoticeBoard;