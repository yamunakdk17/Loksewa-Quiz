import React, { useMemo, useState } from "react";

const subjects = [
    "Administration",
    "Education",
    "Health",
    "Agriculture",
    "Engineering",
    "Finance",
    "IT",
    "General Knowledge",
];

const provinces = [
    "Koshi Province",
    "Madhesh Province",
    "Karnali Province",
    "Bagmati Province",
    "Sudurpashchim Province",
    "Gandaki Province",
    "Lumbini Province",
];

const initialQuizForm = {
    category: "General Knowledge",
    difficulty: "Medium",
    subject: "General Knowledge",
    province: "Bagmati Province",
    examDate: "",
    text: "",
    A: "",
    B: "",
    C: "",
    D: "",
    correct: "A",
    explanation: "",
};

const initialMCQForm = {
    subject: "General Knowledge",
    province: "Bagmati Province",
    examDate: "",
};

const initialPdfForm = {
    title: "",
    subject: "General Knowledge",
    province: "Bagmati Province",
    examDate: "",
    level: "Section Officer",
    year: "",
    description: "",
    explanation: "",
};

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("past");

    // UI state only.
    // Actual data will come from the backend later.
    const [questions] = useState([]);
    const [uploadedFiles] = useState([]);

    const [quizForm, setQuizForm] = useState(initialQuizForm);
    const [mcqForm, setMcqForm] = useState(initialMCQForm);
    const [pdfForm, setPdfForm] = useState(initialPdfForm);

    const [mcqFile, setMcqFile] = useState(null);
    const [pastPdfFile, setPastPdfFile] = useState(null);

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [subjectFilter, setSubjectFilter] = useState("ALL");

    const [toast, setToast] = useState("");

    function showToast(message) {
        setToast(message);

        setTimeout(() => {
            setToast("");
        }, 3000);
    }

    function updateForm(setter, field, value) {
        setter((previous) => ({
            ...previous,
            [field]: value,
        }));
    }

    function handleMCQFile(event) {
        const file = event.target.files?.[0];

        if (!file) return;

        const fileName = file.name.toLowerCase();

        const validType =
            fileName.endsWith(".pdf") ||
            fileName.endsWith(".docx");

        if (!validType) {
            showToast("Please select a PDF or DOCX file.");
            event.target.value = "";
            return;
        }

        setMcqFile(file);
    }

    function handlePastDocument(event) {
        const file = event.target.files?.[0];

        if (!file) return;

        const fileName = file.name.toLowerCase();

        const validType =
            fileName.endsWith(".pdf") ||
            fileName.endsWith(".docx");

        if (!validType) {
            showToast("Please select a PDF or DOCX file.");
            event.target.value = "";
            return;
        }

        setPastPdfFile(file);

        if (!pdfForm.title) {
            setPdfForm((previous) => ({
                ...previous,
                title: file.name.replace(/\.[^/.]+$/, ""),
            }));
        }
    }

    function handleQuizSubmit(event) {
        event.preventDefault();

        showToast(
            "Quiz form is ready. Connect the backend API to save the question."
        );
    }

    function handlePastSubmit(event) {
        event.preventDefault();

        if (!pastPdfFile) {
            showToast("Please select a PDF or DOCX file.");
            return;
        }

        showToast(
            "Document form is ready. Connect the backend API to upload the file."
        );
    }

    function handleImportSubmit(event) {
        event.preventDefault();

        if (!mcqFile) {
            showToast("Please select a PDF or DOCX file.");
            return;
        }

        showToast(
            "MCQ import form is ready. Connect the backend API to import the document."
        );
    }

    const filteredQuestions = useMemo(() => {
        return questions.filter((question) => {
            const searchText = search.toLowerCase();

            const matchesSearch =
                question.text?.toLowerCase().includes(searchText) ||
                question.subject?.toLowerCase().includes(searchText) ||
                question.category?.toLowerCase().includes(searchText);

            const matchesType =
                typeFilter === "ALL" ||
                question.type === typeFilter;

            const matchesSubject =
                subjectFilter === "ALL" ||
                question.subject === subjectFilter;

            return (
                matchesSearch &&
                matchesType &&
                matchesSubject
            );
        });
    }, [questions, search, typeFilter, subjectFilter]);

    const quizPreview = {
        ...quizForm,
        options: {
            A: quizForm.A || "Option A",
            B: quizForm.B || "Option B",
            C: quizForm.C || "Option C",
            D: quizForm.D || "Option D",
        },
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px]">

                {/* ===================== TABS ===================== */}

                <nav className="mb-6 flex gap-2 overflow-x-auto border-b border-slate-200 pb-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab("past")}
                        className={`whitespace-nowrap rounded-lg px-4 py-3 text-sm font-semibold transition ${activeTab === "past"
                                ? "bg-slate-800 text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-200"
                            }`}
                    >
                        📝 Add Past Question
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("quiz")}
                        className={`whitespace-nowrap rounded-lg px-4 py-3 text-sm font-semibold transition ${activeTab === "quiz"
                                ? "bg-slate-800 text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-200"
                            }`}
                    >
                        ❓ Add Practice Quiz
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("manage")}
                        className={`whitespace-nowrap rounded-lg px-4 py-3 text-sm font-semibold transition ${activeTab === "manage"
                                ? "bg-slate-800 text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-200"
                            }`}
                    >
                        📚 Question Bank
                    </button>
                </nav>

                {/* ================================================= */}
                {/*                   PAST QUESTIONS                   */}
                {/* ================================================= */}

                {activeTab === "past" && (
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                        {/* Upload Document */}

                        <section>
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-slate-900">
                                    Upload Past Question Document
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Upload a PDF or DOCX past-question document.
                                </p>
                            </div>

                            <form onSubmit={handlePastSubmit}>

                                {/* File Upload */}

                                <div className="mb-6 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-slate-400">

                                    <div className="mb-3 text-3xl">
                                        📄
                                    </div>

                                    <p className="mb-2 text-sm font-semibold text-slate-700">
                                        Select Past Question Document
                                    </p>

                                    <p className="mb-4 text-xs text-slate-500">
                                        Supported formats: PDF and DOCX
                                    </p>

                                    <input
                                        type="file"
                                        accept=".pdf,.docx"
                                        onChange={handlePastDocument}
                                        className="mx-auto block w-full max-w-md cursor-pointer rounded-lg border border-slate-300 bg-white text-sm text-slate-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-slate-800 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-700"
                                    />

                                    {pastPdfFile && (
                                        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
                                            Selected: {pastPdfFile.name}
                                        </div>
                                    )}
                                </div>

                                {/* Title */}

                                <div className="mb-5">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Document Title *
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter document title"
                                        value={pdfForm.title}
                                        onChange={(event) =>
                                            updateForm(
                                                setPdfForm,
                                                "title",
                                                event.target.value
                                            )
                                        }
                                        required
                                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Subject / Province / Date / Level */}

                                <div className="grid gap-5 md:grid-cols-2">

                                    <FormField label="Subject *">
                                        <select
                                            value={pdfForm.subject}
                                            onChange={(event) =>
                                                updateForm(
                                                    setPdfForm,
                                                    "subject",
                                                    event.target.value
                                                )
                                            }
                                            required
                                            className={inputClass}
                                        >
                                            {subjects.map((subject) => (
                                                <option
                                                    key={subject}
                                                    value={subject}
                                                >
                                                    {subject}
                                                </option>
                                            ))}
                                        </select>
                                    </FormField>

                                    <FormField label="Province *">
                                        <select
                                            value={pdfForm.province}
                                            onChange={(event) =>
                                                updateForm(
                                                    setPdfForm,
                                                    "province",
                                                    event.target.value
                                                )
                                            }
                                            required
                                            className={inputClass}
                                        >
                                            {provinces.map((province) => (
                                                <option
                                                    key={province}
                                                    value={province}
                                                >
                                                    {province}
                                                </option>
                                            ))}
                                        </select>
                                    </FormField>

                                    <FormField label="Exam Date *">
                                        <input
                                            type="date"
                                            value={pdfForm.examDate}
                                            onChange={(event) =>
                                                updateForm(
                                                    setPdfForm,
                                                    "examDate",
                                                    event.target.value
                                                )
                                            }
                                            required
                                            className={inputClass}
                                        />
                                    </FormField>

                                    <FormField label="Exam Level *">
                                        <select
                                            value={pdfForm.level}
                                            onChange={(event) =>
                                                updateForm(
                                                    setPdfForm,
                                                    "level",
                                                    event.target.value
                                                )
                                            }
                                            required
                                            className={inputClass}
                                        >
                                            <option value="Section Officer">
                                                Section Officer
                                            </option>

                                            <option value="Nayab Subba">
                                                Nayab Subba
                                            </option>

                                            <option value="Kharidar">
                                                Kharidar
                                            </option>

                                            <option value="Officer">
                                                Officer
                                            </option>

                                            <option value="Assistant">
                                                Assistant
                                            </option>

                                            <option value="Other">
                                                Other
                                            </option>
                                        </select>
                                    </FormField>
                                </div>

                                {/* Paper Year */}

                                <div className="mb-5 mt-5">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Paper Year *
                                    </label>

                                    <input
                                        type="number"
                                        placeholder="Example: 2081"
                                        value={pdfForm.year}
                                        onChange={(event) =>
                                            updateForm(
                                                setPdfForm,
                                                "year",
                                                event.target.value
                                            )
                                        }
                                        required
                                        className={inputClass}
                                    />
                                </div>

                                {/* Description */}

                                <div className="mb-5">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Description
                                    </label>

                                    <textarea
                                        rows="4"
                                        placeholder="Enter document description..."
                                        value={pdfForm.description}
                                        onChange={(event) =>
                                            updateForm(
                                                setPdfForm,
                                                "description",
                                                event.target.value
                                            )
                                        }
                                        className={textareaClass}
                                    />
                                </div>

                                {/* Explanation */}

                                <div className="mb-6">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Explanation
                                    </label>

                                    <textarea
                                        rows="4"
                                        placeholder="Enter explanation..."
                                        value={pdfForm.explanation}
                                        onChange={(event) =>
                                            updateForm(
                                                setPdfForm,
                                                "explanation",
                                                event.target.value
                                            )
                                        }
                                        className={textareaClass}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                >
                                    Upload Past Question Document
                                </button>
                            </form>
                        </section>

                        {/* Divider */}

                        <div className="my-8 border-t border-slate-200" />

                        {/* Document Records */}

                        <section>
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-slate-900">
                                    Document Records
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Uploaded past-question document records.
                                </p>
                            </div>

                            {uploadedFiles.filter(
                                (file) =>
                                    file.type === "Past Question Document"
                            ).length === 0 ? (
                                <div className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-10 text-center text-sm text-slate-500">
                                    No past-question documents uploaded yet.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {uploadedFiles
                                        .filter(
                                            (file) =>
                                                file.type ===
                                                "Past Question Document"
                                        )
                                        .map((file) => (
                                            <div
                                                key={file.id}
                                                className="flex flex-col gap-4 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                                            >
                                                <div>
                                                    <h3 className="font-bold text-slate-900">
                                                        {file.title}
                                                    </h3>

                                                    <p className="mt-1 text-sm text-slate-500">
                                                        File: {file.fileName}
                                                    </p>

                                                    <p className="mt-1 text-sm text-slate-500">
                                                        Subject:{" "}
                                                        {file.subject}{" "}
                                                        <span className="mx-1">
                                                            |
                                                        </span>
                                                        Province:{" "}
                                                        {file.province}
                                                    </p>

                                                    <p className="mt-1 text-sm text-slate-500">
                                                        Exam Date:{" "}
                                                        {file.examDate}{" "}
                                                        <span className="mx-1">
                                                            |
                                                        </span>
                                                        Level: {file.level}
                                                    </p>

                                                    <p className="mt-1 text-sm text-slate-500">
                                                        Paper Year:{" "}
                                                        {file.year ||
                                                            "Not specified"}
                                                    </p>

                                                    <p className="mt-1 text-sm text-slate-500">
                                                        Added: {file.date}
                                                    </p>

                                                    <span className="mt-3 inline-block rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">
                                                        {file.status}
                                                    </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                                                    onClick={() =>
                                                        showToast(
                                                            "Delete will be connected to the backend."
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </section>
                    </div>
                )}

                {/* ================================================= */}
                {/*                    PRACTICE QUIZ                  */}
                {/* ================================================= */}

                {activeTab === "quiz" && (
                    <div className="space-y-6">

                        <div className="grid gap-6 lg:grid-cols-2">

                            {/* Quiz Form */}

                            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-slate-900">
                                        Add Practice Quiz
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Create a new practice MCQ.
                                    </p>
                                </div>

                                <form onSubmit={handleQuizSubmit}>

                                    <div className="grid gap-5 md:grid-cols-2">

                                        <FormField label="Category *">
                                            <select
                                                value={quizForm.category}
                                                onChange={(event) =>
                                                    updateForm(
                                                        setQuizForm,
                                                        "category",
                                                        event.target.value
                                                    )
                                                }
                                                required
                                                className={inputClass}
                                            >
                                                {subjects.map((subject) => (
                                                    <option
                                                        key={subject}
                                                        value={subject}
                                                    >
                                                        {subject}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormField>

                                        <FormField label="Difficulty *">
                                            <select
                                                value={quizForm.difficulty}
                                                onChange={(event) =>
                                                    updateForm(
                                                        setQuizForm,
                                                        "difficulty",
                                                        event.target.value
                                                    )
                                                }
                                                required
                                                className={inputClass}
                                            >
                                                <option value="Easy">
                                                    Easy
                                                </option>

                                                <option value="Medium">
                                                    Medium
                                                </option>

                                                <option value="Hard">
                                                    Hard
                                                </option>
                                            </select>
                                        </FormField>

                                        <FormField label="Subject *">
                                            <select
                                                value={quizForm.subject}
                                                onChange={(event) =>
                                                    updateForm(
                                                        setQuizForm,
                                                        "subject",
                                                        event.target.value
                                                    )
                                                }
                                                required
                                                className={inputClass}
                                            >
                                                {subjects.map((subject) => (
                                                    <option
                                                        key={subject}
                                                        value={subject}
                                                    >
                                                        {subject}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormField>

                                        <FormField label="Province *">
                                            <select
                                                value={quizForm.province}
                                                onChange={(event) =>
                                                    updateForm(
                                                        setQuizForm,
                                                        "province",
                                                        event.target.value
                                                    )
                                                }
                                                required
                                                className={inputClass}
                                            >
                                                {provinces.map((province) => (
                                                    <option
                                                        key={province}
                                                        value={province}
                                                    >
                                                        {province}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormField>
                                    </div>

                                    {/* Exam Date */}

                                    <div className="mb-5 mt-1">
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Exam Date
                                        </label>

                                        <input
                                            type="date"
                                            value={quizForm.examDate}
                                            onChange={(event) =>
                                                updateForm(
                                                    setQuizForm,
                                                    "examDate",
                                                    event.target.value
                                                )
                                            }
                                            className={inputClass}
                                        />
                                    </div>

                                    {/* Question */}

                                    <div className="mb-5">
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Question *
                                        </label>

                                        <textarea
                                            rows="4"
                                            placeholder="Enter the practice question..."
                                            value={quizForm.text}
                                            onChange={(event) =>
                                                updateForm(
                                                    setQuizForm,
                                                    "text",
                                                    event.target.value
                                                )
                                            }
                                            required
                                            className={textareaClass}
                                        />
                                    </div>

                                    {/* Options */}

                                    <div className="mb-5">
                                        <label className="mb-3 block text-sm font-semibold text-slate-700">
                                            Options *
                                        </label>

                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {["A", "B", "C", "D"].map(
                                                (letter) => (
                                                    <div
                                                        key={letter}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-sm font-bold text-slate-700">
                                                            {letter}
                                                        </div>

                                                        <input
                                                            type="text"
                                                            placeholder={`Option ${letter}`}
                                                            value={
                                                                quizForm[
                                                                letter
                                                                ]
                                                            }
                                                            onChange={(
                                                                event
                                                            ) =>
                                                                updateForm(
                                                                    setQuizForm,
                                                                    letter,
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                            className={inputClass}
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Correct Answer */}

                                    <div className="mb-5">
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Correct Answer *
                                        </label>

                                        <select
                                            value={quizForm.correct}
                                            onChange={(event) =>
                                                updateForm(
                                                    setQuizForm,
                                                    "correct",
                                                    event.target.value
                                                )
                                            }
                                            required
                                            className={inputClass}
                                        >
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                        </select>
                                    </div>

                                    {/* Explanation */}

                                    <div className="mb-6">
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Explanation
                                        </label>

                                        <textarea
                                            rows="4"
                                            placeholder="Enter explanation..."
                                            value={quizForm.explanation}
                                            onChange={(event) =>
                                                updateForm(
                                                    setQuizForm,
                                                    "explanation",
                                                    event.target.value
                                                )
                                            }
                                            className={textareaClass}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    >
                                        + Save Practice Quiz
                                    </button>
                                </form>
                            </div>

                            {/* Preview */}

                            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                <Preview
                                    title="Practice Quiz Preview"
                                    category={`${quizPreview.category} • ${quizPreview.difficulty}`}
                                    question={quizPreview.text}
                                    options={quizPreview.options}
                                    correct={quizPreview.correct}
                                    explanation={quizPreview.explanation}
                                />
                            </div>
                        </div>

                        {/* Import MCQ */}

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-slate-900">
                                    Import MCQ Word / PDF
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Upload a PDF or DOCX document containing
                                    practice MCQs.
                                </p>
                            </div>

                            <form onSubmit={handleImportSubmit}>

                                {/* Upload */}

                                <div className="mb-6 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center">

                                    <div className="mb-3 text-3xl">
                                        📄
                                    </div>

                                    <p className="mb-2 text-sm font-semibold text-slate-700">
                                        Select MCQ Document
                                    </p>

                                    <p className="mb-4 text-xs text-slate-500">
                                        Supported formats: PDF and DOCX
                                    </p>

                                    <input
                                        type="file"
                                        accept=".pdf,.docx"
                                        onChange={handleMCQFile}
                                        className="mx-auto block w-full max-w-md cursor-pointer rounded-lg border border-slate-300 bg-white text-sm text-slate-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-slate-800 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-700"
                                    />

                                    {mcqFile && (
                                        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
                                            Selected: {mcqFile.name}
                                        </div>
                                    )}
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">

                                    <FormField label="Subject *">
                                        <select
                                            value={mcqForm.subject}
                                            onChange={(event) =>
                                                updateForm(
                                                    setMcqForm,
                                                    "subject",
                                                    event.target.value
                                                )
                                            }
                                            required
                                            className={inputClass}
                                        >
                                            {subjects.map((subject) => (
                                                <option
                                                    key={subject}
                                                    value={subject}
                                                >
                                                    {subject}
                                                </option>
                                            ))}
                                        </select>
                                    </FormField>

                                    <FormField label="Province *">
                                        <select
                                            value={mcqForm.province}
                                            onChange={(event) =>
                                                updateForm(
                                                    setMcqForm,
                                                    "province",
                                                    event.target.value
                                                )
                                            }
                                            required
                                            className={inputClass}
                                        >
                                            {provinces.map((province) => (
                                                <option
                                                    key={province}
                                                    value={province}
                                                >
                                                    {province}
                                                </option>
                                            ))}
                                        </select>
                                    </FormField>
                                </div>

                                <div className="mb-6">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Exam Date
                                    </label>

                                    <input
                                        type="date"
                                        value={mcqForm.examDate}
                                        onChange={(event) =>
                                            updateForm(
                                                setMcqForm,
                                                "examDate",
                                                event.target.value
                                            )
                                        }
                                        className={inputClass}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200"
                                >
                                    Import MCQ Document
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* ================================================= */}
                {/*                    QUESTION BANK                  */}
                {/* ================================================= */}

                {activeTab === "manage" && (
                    <div>

                        {/* Toolbar */}

                        <div className="mb-5 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">

                            <div className="flex flex-col gap-3 md:flex-row">

                                <input
                                    type="text"
                                    placeholder="Search questions..."
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    className="w-full min-w-0 rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:w-64"
                                />

                                <select
                                    value={typeFilter}
                                    onChange={(event) =>
                                        setTypeFilter(event.target.value)
                                    }
                                    className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="ALL">
                                        All Types
                                    </option>

                                    <option value="Quiz Question">
                                        Quiz Question
                                    </option>

                                    <option value="Past Question">
                                        Past Question
                                    </option>
                                </select>

                                <select
                                    value={subjectFilter}
                                    onChange={(event) =>
                                        setSubjectFilter(event.target.value)
                                    }
                                    className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="ALL">
                                        All Subjects
                                    </option>

                                    {subjects.map((subject) => (
                                        <option
                                            key={subject}
                                            value={subject}
                                        >
                                            {subject}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    showToast(
                                        "Export will be connected to the backend."
                                    )
                                }
                                className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                            >
                                Export Data
                            </button>
                        </div>

                        {/* Question Table */}

                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                            {filteredQuestions.length === 0 ? (
                                <div className="px-5 py-12 text-center">
                                    <div className="mb-3 text-4xl">
                                        📚
                                    </div>

                                    <h3 className="font-semibold text-slate-800">
                                        No questions found
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Questions added from the backend will
                                        appear here.
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-[900px] w-full border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-200 bg-slate-50">
                                                <th className={tableHeaderClass}>
                                                    Type
                                                </th>

                                                <th className={tableHeaderClass}>
                                                    Question
                                                </th>

                                                <th className={tableHeaderClass}>
                                                    Subject
                                                </th>

                                                <th className={tableHeaderClass}>
                                                    Province
                                                </th>

                                                <th className={tableHeaderClass}>
                                                    Correct
                                                </th>

                                                <th className={tableHeaderClass}>
                                                    Date
                                                </th>

                                                <th className={tableHeaderClass}>
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {filteredQuestions.map(
                                                (question) => (
                                                    <tr
                                                        key={question.id}
                                                        className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50"
                                                    >
                                                        <td className={tableCellClass}>
                                                            <span
                                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${question.type ===
                                                                        "Quiz Question"
                                                                        ? "bg-blue-100 text-blue-700"
                                                                        : "bg-amber-100 text-amber-700"
                                                                    }`}
                                                            >
                                                                {question.type}
                                                            </span>
                                                        </td>

                                                        <td
                                                            className={`${tableCellClass} max-w-md`}
                                                        >
                                                            {
                                                                question.text
                                                            }
                                                        </td>

                                                        <td className={tableCellClass}>
                                                            {question.subject ||
                                                                question.category ||
                                                                "-"}
                                                        </td>

                                                        <td className={tableCellClass}>
                                                            {question.province ||
                                                                "-"}
                                                        </td>

                                                        <td className={tableCellClass}>
                                                            {question.correct ||
                                                                "-"}
                                                        </td>

                                                        <td className={tableCellClass}>
                                                            {question.date ||
                                                                "-"}
                                                        </td>

                                                        <td className={tableCellClass}>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    showToast(
                                                                        "Delete will be connected to the backend."
                                                                    )
                                                                }
                                                                className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Toast */}

            {toast && (
                <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-lg bg-slate-800 px-4 py-3 text-sm font-medium text-white shadow-xl">
                    {toast}
                </div>
            )}
        </div>
    );
}

/* ============================================================= */
/*                         FORM FIELD                             */
/* ============================================================= */

function FormField({ label, children }) {
    return (
        <div className="mb-0">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </label>

            {children}
        </div>
    );
}

/* ============================================================= */
/*                         PREVIEW                                */
/* ============================================================= */

function Preview({
    title,
    category,
    question,
    options,
    correct,
    explanation,
}) {
    return (
        <div>
            <div className="mb-4 text-base font-bold text-slate-900">
                {title}
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

                {/* Category */}

                <span className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700">
                    {category || "Question Preview"}
                </span>

                {/* Question */}

                <div className="mb-5 text-base font-semibold leading-7 text-slate-800">
                    {question || "Your question will appear here..."}
                </div>

                {/* Options */}

                <div className="space-y-2">
                    {["A", "B", "C", "D"].map((letter) => (
                        <div
                            key={letter}
                            className={`flex items-center justify-between rounded-lg border px-3 py-3 text-sm ${correct === letter
                                    ? "border-green-400 bg-green-50 text-green-800"
                                    : "border-slate-300 bg-white text-slate-700"
                                }`}
                        >
                            <span>
                                <strong>{letter}.</strong>{" "}
                                {options?.[letter] ||
                                    `Option ${letter}`}
                            </span>

                            {correct === letter && (
                                <span className="font-bold text-green-600">
                                    ✓
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Explanation */}

                <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-slate-700">
                    <strong className="text-slate-900">
                        Explanation:
                    </strong>

                    <br />

                    {explanation ||
                        "Explanation will appear here."}
                </div>
            </div>
        </div>
    );
}

/*                         TAILWIND CLASSES                      */


const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const textareaClass =
    "w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const tableHeaderClass =
    "px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-600";

const tableCellClass =
    "px-4 py-3 text-left align-top text-sm text-slate-600";

export default AdminDashboard;