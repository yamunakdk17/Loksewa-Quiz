function Quiz() {
    return (
        <div className="min-h-screen bg-white text-slate-900">

            {/* Main container */}
            <div className="mx-auto max-w-[940px] px-0 py-0">

                {/* Title */}
                <h1 className="mb-7 text-4xl font-bold tracking-tight">
                    Quiz
                </h1>

                {/* Tabs */}
                <div className="mb-6 flex border-b border-gray-200">

                    <button
                        className="
                            border-b-2 border-blue-600
                            px-4 pb-4
                            text-sm font-semibold
                            text-slate-800
                        "
                    >
                        Sector quizzes
                    </button>

                    <button
                        className="
                            px-4 pb-4
                            text-sm font-semibold
                            text-gray-500
                            hover:text-gray-700
                        "
                    >
                        My mistakes and saved
                    </button>

                </div>

                {/* Description */}
                <p className="mb-5 max-w-[650px] text-base leading-7 text-gray-500">
                    15 questions per quiz. Choose every answer first.
                    The result and explanations come after you submit.
                </p>

                {/* Quiz List */}
                <div className="w-full border border-gray-200">

                    {/* Administration */}
                    <div className="grid min-h-[77px] grid-cols-[1fr_340px_120px] items-center border-b border-gray-200 px-4">

                        <div>
                            <h3 className="text-base font-semibold text-slate-800">
                                Administration
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                प्रशासन
                            </p>
                        </div>

                        <p className="text-sm text-gray-500">
                            15 questions per quiz. 16 of 22 practised. Best 0%
                        </p>

                        <button className="justify-self-end rounded-md bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                            Start quiz
                        </button>

                    </div>

                    {/* Education */}
                    <div className="grid min-h-[77px] grid-cols-[1fr_340px_120px] items-center border-b border-gray-200 px-4">

                        <div>
                            <h3 className="text-base font-semibold text-slate-800">
                                Education
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                शिक्षा
                            </p>
                        </div>

                        <p className="text-sm text-gray-500">
                            15 questions per quiz. 0 of 16 practised
                        </p>

                        <button className="justify-self-end rounded-md bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                            Start quiz
                        </button>

                    </div>

                    {/* Health */}
                    <div className="grid min-h-[77px] grid-cols-[1fr_340px_120px] items-center border-b border-gray-200 px-4">

                        <div>
                            <h3 className="text-base font-semibold text-slate-800">
                                Health
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                स्वास्थ्य
                            </p>
                        </div>

                        <p className="text-sm text-gray-500">
                            15 questions per quiz. 0 of 16 practised
                        </p>

                        <button className="justify-self-end rounded-md bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                            Start quiz
                        </button>

                    </div>

                    {/* IT */}
                    <div className="grid min-h-[77px] grid-cols-[1fr_340px_120px] items-center border-b border-gray-200 px-4">

                        <div>
                            <h3 className="text-base font-semibold text-slate-800">
                                IT
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                सूचना प्रविधि
                            </p>
                        </div>

                        <p className="text-sm text-gray-500">
                            15 questions per quiz. 0 of 16 practised
                        </p>

                        <button className="justify-self-end rounded-md bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                            Start quiz
                        </button>

                    </div>

                    {/* Finance */}
                    <div className="grid min-h-[77px] grid-cols-[1fr_340px_120px] items-center px-4">

                        <div>
                            <h3 className="text-base font-semibold text-slate-800">
                                Finance
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                वित्त
                            </p>
                        </div>

                        <p className="text-sm text-gray-500">
                            15 questions per quiz. 0 of 18 practised
                        </p>

                        <button className="justify-self-end rounded-md bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                            Start quiz
                        </button>

                    </div>

                </div>

                {/* Top Students */}
                <div className="mt-8">

                    <h2 className="mb-3 text-3xl font-bold">
                        Top students
                    </h2>

                    <p className="max-w-[650px] text-base leading-7 text-gray-500">
                        Students ranked by score. Your best attempt in each
                        quiz and past exam counts once, so repeating one quiz
                        does not push you up.
                    </p>

                    <div className="mt-5 border border-gray-200 bg-white p-6">

                        <p className="mb-4 text-sm text-gray-500">
                            Nobody is ranked yet. Finish any quiz while
                            logged in and you will appear here.
                        </p>

                        <button className="rounded-md bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                            Start a quiz
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Quiz;