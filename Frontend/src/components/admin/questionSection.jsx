
import { useCallback, useEffect, useState } from "react";
const API_URL = "http://localhost:5000/api/questions";

const CATEGORIES = [
  "Administration",
  "General Knowledge",
  "Education",
];

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const INITIAL_FORM = {
  question_type: "MCQ",
  category: "General Knowledge",
  difficulty: "Easy",
  question_text: "",
  option_a: "",
  option_b: "",
  option_c: "",
  option_d: "",
  correct_answer: "A",
  explanation: "",
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0874BD] focus:ring-4 focus:ring-blue-100";

const labelClass =
  "mb-2 block text-sm font-semibold text-slate-700";

function getErrorMessage(data, fallback) {
  return (
    data?.message ||
    data?.error ||
    data?.data?.message ||
    fallback
  );
}

function getQuestionsFromResponse(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.data?.questions)) {
    return result.data.questions;
  }
  if (Array.isArray(result?.questions)) return result.questions;
  return [];
}

export default function QuestionSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [notice, setNotice] = useState({
    type: "",
    message: "",
  });
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const getToken = () => localStorage.getItem("token");

  const fetchQuestions = useCallback(async () => {
    setFetching(true);

    try {
      const token = getToken();

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          ...(token ? { Authorization: `Bearer ${ token } ` } : {}),
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          getErrorMessage(result, "Failed to load questions.")
        );
      }

      setQuestions(getQuestionsFromResponse(result));
    } catch (error) {
      setNotice({
        type: "error",
        message: error.message || "Could not load questions.",
      });
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!form.category.trim()) {
      return "Please select a category.";
    }

    if (!form.question_text.trim()) {
      return "Please enter the question.";
    }

    const options = [
      form.option_a,
      form.option_b,
      form.option_c,
      form.option_d,
    ];

    if (options.some((option) => !option.trim())) {
      return "Please fill in all four options.";
    }

    const normalizedOptions = options.map((option) =>
      option.trim().toLowerCase()
    );

    if (new Set(normalizedOptions).size !== normalizedOptions.length) {
      return "Each option must be different.";
    }

    if (!["A", "B", "C", "D"].includes(form.correct_answer)) {
      return "Please select the correct answer.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNotice({ type: "", message: "" });

    const validationError = validateForm();

    if (validationError) {
      setNotice({
        type: "error",
        message: validationError,
      });
      return;
    }

    setLoading(true);

    try {
      const token = getToken();

      const payload = {
        question_type: form.question_type,
        category: form.category.trim(),
        difficulty: form.difficulty,
        question_text: form.question_text.trim(),
        option_a: form.option_a.trim(),
        option_b: form.option_b.trim(),
        option_c: form.option_c.trim(),
        option_d: form.option_d.trim(),
        correct_answer: form.correct_answer,
        explanation: form.explanation.trim(),
      };

      const response = await fetch(`${ API_URL }/create`, {
method: "POST",
    headers: {
    "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
body: JSON.stringify(payload),
      });

const result = await response.json();

if (!response.ok) {
    throw new Error(
        getErrorMessage(result, "Failed to save the question.")
    );
}

setNotice({
    type: "success",
    message: "Question added successfully!",
});

setForm({
    ...INITIAL_FORM,
    category: payload.category,
});

await fetchQuestions();
    } catch (error) {
    setNotice({
        type: "error",
        message: error.message || "Something went wrong.",
    });
} finally {
    setLoading(false);
}
  };

const filteredQuestions = questions.filter((question) => {
    const matchesCategory =
        filterCategory === "All" ||
        question.category === filterCategory;

    const searchText = search.trim().toLowerCase();

    const matchesSearch =
        !searchText ||
        String(question.question_text || "")
            .toLowerCase()
            .includes(searchText) ||
        String(question.category || "")
            .toLowerCase()
            .includes(searchText);

    return matchesCategory && matchesSearch;
});

return (
    <div className="min-h-screen bg-[#F5F9FC] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-7">
            {/* Page heading */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <p className="mb-2 text-sm font-semibold text-[#0874BD]">
                        ADMINISTRATION / PRACTICE QUIZ
                    </p>

                    <h1 className="text-2xl font-bold tracking-tight text-[#182235] sm:text-3xl">
                        Question Management
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Create and manage questions for your public practice quiz.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={fetchQuestions}
                    disabled={fetching}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#0874BD] hover:text-[#0874BD] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <span>{fetching ? "Refreshing..." : "↻ Refresh questions"}</span>
                </button>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <SummaryCard
                    label="Total Questions"
                    value={questions.length}
                    icon="📚"
                />

                {CATEGORIES.map((category) => (
                    <SummaryCard
                        key={category}
                        label={category}
                        value={
                            questions.filter((question) => question.category === category)
                                .length
                        }
                        icon="📝"
                    />
                ))}
            </div>

            {/* Notice */}
            {notice.message && (
                <div
                    role="status"
                    className={`flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-sm ${notice.type === "success"
                            ? "border-green-200 bg-green-50 text-green-800"
                            : "border-red-200 bg-red-50 text-red-700"
                        }`}
                >
                    <p>{notice.message}</p>

                    <button
                        type="button"
                        aria-label="Dismiss message"
                        onClick={() => setNotice({ type: "", message: "" })}
                        className="font-bold"
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Add question form */}
            <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="border-b border-slate-100 bg-[#EAF4FB] px-5 py-5 sm:px-7">
                    <h2 className="text-lg font-bold text-[#182235]">
                        Add Practice Question
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Complete the fields below to add a question to the database.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-7">
                    {/* Category, difficulty and type */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                        <div>
                            <label className={labelClass} htmlFor="category">
                                Category <span className="text-red-500">*</span>
                            </label>

                            <select
                                id="category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className={inputClass}
                                required
                            >
                                {CATEGORIES.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className={labelClass} htmlFor="difficulty">
                                Difficulty <span className="text-red-500">*</span>
                            </label>

                            <select
                                id="difficulty"
                                name="difficulty"
                                value={form.difficulty}
                                onChange={handleChange}
                                className={inputClass}
                                required
                            >
                                {DIFFICULTIES.map((difficulty) => (
                                    <option key={difficulty} value={difficulty}>
                                        {difficulty}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className={labelClass} htmlFor="question_type">
                                Question Type
                            </label>

                            <select
                                id="question_type"
                                name="question_type"
                                value={form.question_type}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                <option value="MCQ">Multiple Choice (MCQ)</option>
                            </select>
                        </div>
                    </div>

                    {/* Question text */}
                    <div>
                        <label className={labelClass} htmlFor="question_text">
                            Question <span className="text-red-500">*</span>
                        </label>

                        <textarea
                            id="question_text"
                            name="question_text"
                            value={form.question_text}
                            onChange={handleChange}
                            rows={3}
                            maxLength={2000}
                            placeholder="Enter the complete question..."
                            className={inputClass}
                            required
                        />

                        <p className="mt-1 text-right text-xs text-slate-400">
                            {form.question_text.length}/2000
                        </p>
                    </div>

                    {/* Options */}
                    <div>
                        <div className="mb-3">
                            <h3 className="text-sm font-bold text-[#182235]">
                                Answer Options
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                                Enter four different answer choices.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {[
                                ["A", "option_a"],
                                ["B", "option_b"],
                                ["C", "option_c"],
                                ["D", "option_d"],
                            ].map(([letter, field]) => (
                                <div key={field}>
                                    <label className={labelClass} htmlFor={field}>
                                        <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF4FB] text-xs font-bold text-[#0874BD]">
                                            {letter}
                                        </span>
                                        Option {letter}
                                        <span className="ml-1 text-red-500">*</span>
                                    </label>

                                    <input
                                        id={field}
                                        name={field}
                                        value={form[field]}
                                        onChange={handleChange}
                                        placeholder={`Enter option ${letter}`}
                                        className={inputClass}
                                        maxLength={500}
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Correct answer */}
                    <div>
                        <label className={labelClass} htmlFor="correct_answer">
                            Correct Answer <span className="text-red-500">*</span>
                        </label>

                        <select
                            id="correct_answer"
                            name="correct_answer"
                            value={form.correct_answer}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        >
                            <option value="A">Option A</option>
                            <option value="B">Option B</option>
                            <option value="C">Option C</option>
                            <option value="D">Option D</option>
                        </select>
                    </div>

                    {/* Explanation */}
                    <div>
                        <label className={labelClass} htmlFor="explanation">
                            Explanation <span className="text-slate-400">(Optional)</span>
                        </label>

                        <textarea
                            id="explanation"
                            name="explanation"
                            value={form.explanation}
                            onChange={handleChange}
                            rows={3}
                            maxLength={2000}
                            placeholder="Explain why the selected answer is correct..."
                            className={inputClass}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                setForm(INITIAL_FORM);
                                setNotice({ type: "", message: "" });
                            }}
                            disabled={loading}
                            className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
                        >
                            Clear Form
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-[#0874BD] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0665A5] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Saving Question..." : "+ Add Question"}
                        </button>
                    </div>
                </form>
            </section>

            {/* Saved questions */}
            <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                    <div>
                        <h2 className="text-lg font-bold text-[#182235]">
                            Saved Questions
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            {questions.length} question
                            {questions.length === 1 ? "" : "s"} in your database
                        </p>
                    </div>

                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search questions..."
                        aria-label="Search questions"
                        className={`${inputClass} sm:max-w-xs`}
                    />
                </div>

                <div className="flex flex-wrap gap-2 px-5 py-4 sm:px-7">
                    {["All", ...CATEGORIES].map((category) => (
                        <button
                            type="button"
                            key={category}
                            onClick={() => setFilterCategory(category)}
                            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${filterCategory === category
                                    ? "bg-[#0874BD] text-white"
                                    : "bg-[#EAF4FB] text-[#0874BD] hover:bg-blue-100"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {fetching ? (
                    <div className="px-6 py-12 text-center text-sm text-slate-500">
                        Loading questions...
                    </div>
                ) : filteredQuestions.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                        <div className="mb-3 text-3xl">📋</div>
                        <h3 className="font-semibold text-[#182235]">
                            No questions found
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Add a new question or try a different search.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {filteredQuestions.map((question, index) => (
                            <article
                                key={question.id ?? index}
                                className="px-5 py-5 transition hover:bg-slate-50/70 sm:px-7"
                            >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-3 flex flex-wrap items-center gap-2">
                                            <span className="rounded-full bg-[#EAF4FB] px-3 py-1 text-xs font-semibold text-[#0874BD]">
                                                {question.category || "Uncategorized"}
                                            </span>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${question.difficulty === "Hard"
                                                        ? "bg-red-50 text-red-700"
                                                        : question.difficulty === "Medium"
                                                            ? "bg-amber-50 text-amber-700"
                                                            : "bg-green-50 text-green-700"
                                                    }`}
                                            >
                                                {question.difficulty || "Easy"}
                                            </span>

                                            <span className="text-xs text-slate-400">
                                                ID: {question.id ?? "—"}
                                            </span>
                                        </div>

                                        <h3 className="whitespace-pre-wrap break-words text-sm font-semibold leading-6 text-[#182235]">
                                            {question.question_text}
                                        </h3>

                                        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                            {[
                                                ["A", question.option_a],
                                                ["B", question.option_b],
                                                ["C", question.option_c],
                                                ["D", question.option_d],
                                            ].map(([letter, option]) => {
                                                const isCorrect =
                                                    String(question.correct_answer || "")
                                                        .trim()
                                                        .toUpperCase() === letter;

                                                return (
                                                    <div
                                                        key={letter}
                                                        className={`rounded-lg border px-3 py-2 text-sm ${isCorrect
                                                                ? "border-green-200 bg-green-50 text-green-800"
                                                                : "border-slate-100 bg-slate-50 text-slate-600"
                                                            }`}
                                                    >
                                                        <span className="mr-2 font-bold">
                                                            {letter}.
                                                        </span>
                                                        {option || "—"}
                                                        {isCorrect && (
                                                            <span className="ml-2 text-xs font-semibold">
                                                                ✓ Correct
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {question.explanation && (
                                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                                <span className="font-semibold text-slate-700">
                                                    Explanation:{" "}
                                                </span>
                                                {question.explanation}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    </div>
);
}

function SummaryCard({ label, value, icon }) {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FB] text-lg">
                    {icon}
                </span>
            </div>

            <p className="mt-4 text-3xl font-bold tracking-tight text-[#182235]">
                {value}
            </p>
        </div>
    );
}
