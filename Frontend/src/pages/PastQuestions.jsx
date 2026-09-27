function PastQuestions() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-12">
      
      {/* Page Header */}
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Past Questions
        </h1>

        <p className="mt-3 max-w-3xl leading-6 text-gray-600">
          Choose a subject, then a province, then a date. Open a date to
          attempt the questions or read them with answers.
        </p>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
          Every exam here is sample material written for practice. Dates and
          questions are placeholders, not copies of official papers.
          Official past papers are published by each Public Service Commission
          and at psc.gov.np.
        </p>

        {/* Subject */}
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            1. Subject
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <button className="rounded-lg border border-blue-600 bg-blue-50 px-4 py-3 text-left font-medium text-blue-700">
              Administration
            </button>

            <button className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left font-medium text-slate-700 hover:border-blue-400 hover:bg-blue-50">
              General Knowledge
            </button>

            <button className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left font-medium text-slate-700 hover:border-blue-400 hover:bg-blue-50">
              Education
            </button>

            <button className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left font-medium text-slate-700 hover:border-blue-400 hover:bg-blue-50">
              Health
            </button>

            <button className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left font-medium text-slate-700 hover:border-blue-400 hover:bg-blue-50">
              Agriculture
            </button>

            <button className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left font-medium text-slate-700 hover:border-blue-400 hover:bg-blue-50">
              Engineering
            </button>

            <button className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left font-medium text-slate-700 hover:border-blue-400 hover:bg-blue-50">
              Finance
            </button>

            <button className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left font-medium text-slate-700 hover:border-blue-400 hover:bg-blue-50">
              IT
            </button>
          </div>
        </section>

        {/* Province */}
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            2. Province
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <button className="rounded-lg border border-blue-600 bg-blue-50 px-4 py-3 text-left font-medium text-blue-700">
              Koshi Province
            </button>

            <button className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left font-medium text-slate-700 hover:border-blue-400 hover:bg-blue-50">
              Madhesh Province
            </button>

            <button className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left font-medium text-slate-700 hover:border-blue-400 hover:bg-blue-50">
              Karnali Province
            </button>

            <button className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left font-medium text-slate-700 hover:border-blue-400 hover:bg-blue-50">
              Bagmati Province
            </button>

            <button className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left font-medium text-slate-700 hover:border-blue-400 hover:bg-blue-50">
              Sudurpashchim Province
            </button>

            <button className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left font-medium text-slate-700 hover:border-blue-400 hover:bg-blue-50">
              Gandaki Province
            </button>

            <button className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-left font-medium text-slate-700 hover:border-blue-400 hover:bg-blue-50">
              Lumbini Province
            </button>
          </div>
        </section>

        {/* Exam Dates */}
        <section className="mt-10 pb-10">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            3. Exam date
          </h2>

          <div className="space-y-3">
            
            {/* Exam 1 */}
            <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">
                  2026-09-15
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  10 questions, 15 minutes
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  Sample
                </span>

                <button className="rounded-md bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Open
                </button>
              </div>
            </div>

            {/* Exam 2 */}
            <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">
                  2026-09-08
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  10 questions, 15 minutes
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  Sample
                </span>

                <button className="rounded-md bg-blue-500 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Open
                </button>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}

export default PastQuestions;