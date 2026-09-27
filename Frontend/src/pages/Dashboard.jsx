import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {

  // ================================
  // Dashboard Statistics
  // ================================

  const stats = [
    {
      icon: "📖",
      number: "4",
      label: "Enrolled Sectors",
    },
    {
      icon: "✍️",
      number: "12",
      label: "Active Quizzes",
    },
    {
      icon: "🏆",
      number: "85%",
      label: "Avg. Accuracy",
    },
  ];

  // ================================
  // Recent Quiz Attempts
  // ================================

  const quizAttempts = [
    {
      title: "GK - History Mock Test",
      date: "Sep 24, 2026",
      score: "18 / 20",
      status: "Passed",
    },
    {
      title: "Section Officer Paper I",
      date: "Sep 22, 2026",
      score: "38 / 50",
      status: "Passed",
    },
    {
      title: "Kharidar Model Test",
      date: "Sep 18, 2026",
      score: "28 / 40",
      status: "Passed",
    },
  ];

  // ================================
  // Sidebar Menu
  // ================================

  const menuItems = [
    { icon: "▥", label: "Dashboard", path: "/dashboard" },
    { icon: "♙", label: "My Profile", path: "/profile" },
    { icon: "◇", label: "Target Sectors", path: "/sectors" },
    { icon: "▤", label: "Past Questions", path: "/past-questions" },
    { icon: "⚒", label: "My Quiz Attempts", path: "/quiz-attempts" },
    { icon: "☆", label: "Saved Questions", path: "/saved-questions" },
    { icon: "?", label: "Question & Answer", path: "/question-answer" },
    { icon: "⚙", label: "Settings", path: "/settings" },
  ];

  // ================================
  // Functions
  // ================================

  const handleViewDetails = (attempt) => {
    alert(
      `Quiz: ${attempt.title}\nScore: ${attempt.score}\nDate: ${attempt.date}`
    );
  };

  const handleLogout = () => {
    alert("Logout functionality will be added later.");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#182235]">

      {/* =====================================
          HEADER / NAVBAR
      ===================================== */}

        
    


      {/* =====================================
          DASHBOARD LAYOUT
      ===================================== */}

      <div className="flex min-h-[calc(100vh-64px)]">

        {/* =====================================
            SIDEBAR
        ===================================== */}

        <aside className="hidden w-[220px] shrink-0 border-r border-[#D7E3EC] bg-white md:block">

          <nav className="flex flex-col gap-1 p-4">

            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors ${
                  item.label === "Dashboard"
                    ? "bg-[#E6F0F7] text-[#0860A0]"
                    : "text-[#182235] hover:bg-[#F0F6FA] hover:text-[#0860A0]"
                }`}
              >
                <span className="w-5 text-center text-lg">
                  {item.icon}
                </span>

                <span>
                  {item.label}
                </span>
              </Link>
            ))}

            <button
              type="button"
              onClick={handleLogout}
              className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-medium text-[#182235] transition-colors hover:bg-[#F0F6FA] hover:text-[#0860A0]"
            >
              <span className="w-5 text-center text-lg">
                ↪
              </span>

              <span>
                Logout
              </span>
            </button>

          </nav>

        </aside>


        {/* =====================================
            MAIN DASHBOARD
        ===================================== */}

        <main className="min-w-0 flex-1 p-5 sm:p-8">

          {/* Dashboard Title */}

          <div className="mb-7 border-b border-[#D7E3EC] pb-4">

            <h1 className="text-2xl font-bold text-[#182235] sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Track your learning progress and quiz performance.
            </p>

          </div>


          {/* =====================================
              STATISTICS CARDS
          ===================================== */}

          <section className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[#E2EAF0] bg-white p-6 shadow-[0_3px_12px_rgba(8,96,160,0.06)]"
              >

                <div className="flex items-center justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#E6F0F7] text-xl">
                    {stat.icon}
                  </div>

                </div>

                <h2 className="mt-5 text-3xl font-bold text-[#182235]">
                  {stat.number}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {stat.label}
                </p>

              </div>
            ))}

          </section>


          {/* =====================================
              RECENT QUIZ ATTEMPTS
          ===================================== */}

          <section>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#D7E3EC] pb-3">

              <h2 className="text-xl font-bold text-[#182235]">
                Recent Quiz Attempts
              </h2>

              <Link
                to="/quiz"
                className="text-sm font-semibold text-[#0860A0] hover:text-[#07538E]"
              >
                Practice Quiz →
              </Link>

            </div>


            {/* Table */}

            <div className="overflow-x-auto rounded-xl border border-[#E2EAF0] bg-white shadow-[0_3px_12px_rgba(8,96,160,0.04)]">

              <table className="w-full min-w-[650px] border-collapse text-sm">

                <thead>
                  <tr className="bg-[#F4F8FB] text-[#182235]">

                    <th className="px-5 py-4 text-left font-semibold">
                      Quiz Title
                    </th>

                    <th className="px-5 py-4 text-left font-semibold">
                      Date
                    </th>

                    <th className="px-5 py-4 text-left font-semibold">
                      Score
                    </th>

                    <th className="px-5 py-4 text-left font-semibold">
                      Status
                    </th>

                    <th className="px-5 py-4 text-left font-semibold">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {quizAttempts.map((attempt) => (
                    <tr
                      key={attempt.title}
                      className="border-t border-[#E2EAF0] transition-colors hover:bg-[#F8FBFD]"
                    >

                      <td className="whitespace-nowrap px-5 py-4 font-medium text-[#182235]">
                        {attempt.title}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                        {attempt.date}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-gray-700">
                        {attempt.score}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">

                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                          {attempt.status}
                        </span>

                      </td>

                      <td className="whitespace-nowrap px-5 py-4">

                        <button
                          type="button"
                          onClick={() => handleViewDetails(attempt)}
                          className="rounded-md bg-[#FFAA0A] px-4 py-2 text-xs font-semibold text-[#182235] shadow-sm transition-colors hover:bg-[#F59E0B]"
                        >
                          View Details
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </section>

        </main>

      </div>


      

    

    </div>
  );
}

export default Dashboard;