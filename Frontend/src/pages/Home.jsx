
import { Link } from "react-router-dom";
import QuestionOfDay from "../components/QuestionOfDay";

import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-white">

  
      {/* Hero Section */}
      <section className="bg-[#0860A0] text-white">

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 md:grid-cols-2">

          {/* Left Content */}
          <div>

            <h1 className="max-w-xl font-serif text-3xl font-bold leading-[1.12] md:text-5xl">
              Loksewa Quiz and 
              <br />
              Past Question
              <br />
              preparation platform
            </h1>

            <p className="mt-6 text-lg">
              <span className="font-bold text-[#FFAB00]">
                100+ 

                           </span>{" "}
              MCQs across 5 sectors
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-wrap gap-3">

              <Link
                to="/quiz"
                className="rounded-md bg-[#FFAA0A] px-7 py-4 font-semibold text-[#182235] transition hover:bg-[#F59E0B]"
              >
                Start Quiz
              </Link>

              <Link
                to="/past-questions"
                className="rounded-md border border-[#74B2E1] px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Browse past questions
              </Link>

            </div>

            {/* Features */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-blue-100">

              <span className="flex items-center gap-2">
                <span className="text-[#FFAA0A]">●</span>
                Free
              </span>

              <span className="flex items-center gap-2">
                <span className="text-[#FFAA0A]">●</span>
                Answers shown after you submit
              </span>

            </div>

          </div>

          {/* Quiz Card */}
          <div className="flex justify-center md:justify-end">

            <div className="flex h-64 w-64 flex-col items-center justify-center rounded-3xl bg-[#347FB8] text-center shadow-sm">
{/* 
              <span className="rounded-full bg-[#F02E2E] px-4 py-2 text-xs font-bold text-white shadow">
                2 OPEN NOW
              </span> */}

              <h2 className="mt-4 font-serif text-4xl font-bold">
                QUIZ
              </h2>

              <p className="mt-5 text-sm text-blue-100">
                + Past Questions
              </p>

            </div>

          </div>

        </div>

        {/* Notice Strip */}
        <div className="bg-[#07538E]">

          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-6 py-5 md:flex-row md:items-center">

            <div>
              <h3 className="font-semibold">
                2 notices open for applications right now.
              </h3>

              <p className="mt-2 text-sm text-blue-100">
                Administration, Education, Health and IT, checked 21 Sep 2026.
              </p>
            </div>

            <Link
              to="/past-questions"
              className="rounded-md bg-[#FFAA0A] px-6 py-4 font-semibold text-[#182235] transition hover:bg-[#F59E0B]"
            >
              See the notice board
            </Link>

          </div>

        </div>

      </section>

      {/* Notice Board */}
      <section className="mx-auto max-w-6xl px-6 py-8">

        {/* Title */}
        <div className="flex flex-wrap items-center justify-between gap-3">

          <h2 className="font-serif text-3xl font-bold text-[#182235]">
            Notice board
          </h2>

          <span className="text-sm text-gray-500">
            Checked 21 Sep 2026
          </span>

        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-6 border-b border-gray-200">

          {["All", "Administration", "Education", "Health", "IT"].map(
            (sector, index) => (
              <button
                key={sector}
                className={`border-b-2 px-1 pb-4 text-sm font-semibold ${
                  index === 0
                    ? "border-[#1769AA] text-[#182235]"
                    : "border-transparent text-gray-500 hover:text-[#1769AA]"
                }`}
              >
                {sector}{" "}
                <span className="ml-1 rounded-full bg-gray-100 px-2 py-1 text-xs">
                  {[9, 4, 3, 3, 2][index]}
                </span>
              </button>
            )
          )}

        </div>

        {/* Notice Description */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6">

          <p className="text-sm text-gray-500">
            Newest deadlines first. Closed notices are kept below for reference.
          </p>

          <button className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-[#182235] hover:bg-gray-50">
            Open notices only
          </button>

        </div>

        {/* Notice Table */}
        <div className="overflow-x-auto rounded-md border border-gray-200">

          <table className="w-full min-w-[600px] text-left text-sm">

            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-5 py-4">Sector</th>
                <th className="px-5 py-4">Notice</th>
                <th className="px-5 py-4">Deadline</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Source</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td
                  colSpan="5"
                  className="px-5 py-8 text-center text-gray-400"
                >
                  Notice data will be added later.
                </td>
              </tr>
            </tbody>


          </table>

       

        </div>
         {/* Question of the day */}
          <QuestionOfDay />



      </section>

    </div>
  );
}

export default Home;