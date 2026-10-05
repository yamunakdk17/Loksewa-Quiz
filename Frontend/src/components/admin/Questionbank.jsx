import React, { useState } from "react";

import {
    subjects,
    provinces,
    initialQuizForm,
    initialMCQForm,
} from "../../constants/adminConstants";

function PracticeQuizSection({ showToast }) {
    const [quiz, setQuiz] = useState(initialQuizForm);
    const [mcq, setMcq] = useState(initialMCQForm);
    const [mcqFile, setMcqFile] = useState(null);

    const inputClass =
        "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

    const updateQuiz = (field, value) => {
        setQuiz((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const updateMCQ = (field, value) => {
        setMcq((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const handleMCQFile = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const name = file.name.toLowerCase();

        if (!name.endsWith(".pdf") && !name.endsWith(".docx")) {
            showToast("Only PDF and DOCX files are allowed.");
            event.target.value = "";
            return;
        }

        setMcqFile(file);
    };

    const saveQuiz = (event) => {
        event.preventDefault();

        showToast("Practice quiz ready to save.");
    };

    const importMCQ = (event) => {
        event.preventDefault();

        if (!mcqFile) {
            showToast("Please select a PDF or DOCX file.");
            return;
        }

        showToast("MCQ document ready for import.");
    };

    return (
        <div className="space-y-6">

            {/* Manual MCQ */}

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <h2 className="mb-1 text-xl font-bold">
                    Add Practice Quiz
                </h2>

                <p className="mb-6 text-sm text-slate-500">
                    Create an MCQ manually.
                </p>

                <form onSubmit={saveQuiz}>

                    <div className="grid gap-5 md:grid-cols-2">

                        <Field label="Category">
                            <input
                                value={quiz.category}
                                onChange={(e) =>
                                    updateQuiz("category", e.target.value)
                                }
                                className={inputClass}
                            />
                        </Field>

                        <Field label="Difficulty">
                            <select
                                value={quiz.difficulty}
                                onChange={(e) =>
                                    updateQuiz("difficulty", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </Field>

                        <Field label="Subject">
                            <select
                                value={quiz.subject}
                                onChange={(e) =>
                                    updateQuiz("subject", e.target.value)
                                }
                                className={inputClass}
                            >
                                {subjects.map((subject) => (
                                    <option key={subject}>{subject}</option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Province">
                            <select
                                value={quiz.province}
                                onChange={(e) =>
                                    updateQuiz("province", e.target.value)
                                }
                                className={inputClass}
                            >
                                {provinces.map((province) => (
                                    <option key={province}>{province}</option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Exam Date">
                            <input
                                type="date"
                                value={quiz.examDate}
                                onChange={(e) =>
                                    updateQuiz("examDate", e.target.value)
                                }
                                className={inputClass}
                            />
                        </Field>
                    </div>

                    <Field label="Question">
                        <textarea
                            rows="4"
                            value={quiz.text}
                            onChange={(e) =>
                                updateQuiz("text", e.target.value)
                            }
                            placeholder="Enter question..."
                            required
                            className={inputClass}
                        />
                    </Field>

                    <div className="grid gap-5 md:grid-cols-2">

                        {["A", "B", "C", "D"].map((option) => (
                            <Field
                                key={option}
                                label={`Option ${option}`}
                            >
                                <input
                                    value={quiz[option]}
                                    onChange={(e) =>
                                        updateQuiz(option, e.target.value)
                                    }
                                    className={inputClass}
                                />
                            </Field>
                        ))}
                    </div>

                    <Field label="Correct Answer">
                        <select
                            value={quiz.correct}
                            onChange={(e) =>
                                updateQuiz("correct", e.target.value)
                            }
                            className={inputClass}
                        >
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                        </select>
                    </Field>

                    <Field label="Explanation">
                        <textarea
                            rows="4"
                            value={quiz.explanation}
                            onChange={(e) =>
                                updateQuiz("explanation", e.target.value)
                            }
                            className={inputClass}
                        />
                    </Field>

                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Save Practice Quiz
                    </button>

                </form>
            </div>

            {/* MCQ Document Import */}

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <h2 className="mb-1 text-xl font-bold">
                    Import MCQ Document
                </h2>

                <p className="mb-6 text-sm text-slate-500">
                    Upload a PDF or DOCX containing MCQs.
                </p>

                <form onSubmit={importMCQ}>

                    <input
                        type="file"
                        accept=".pdf,.docx"
                        onChange={handleMCQFile}
                        className="mb-4 block w-full rounded-lg border border-slate-300 bg-white text-sm"
                    />

                    {mcqFile && (
                        <p className="mb-4 text-sm font-semibold text-blue-600">
                            Selected: {mcqFile.name}
                        </p>
                    )}

                    <div className="grid gap-5 md:grid-cols-2">

                        <Field label="Subject">
                            <select
                                value={mcq.subject}
                                onChange={(e) =>
                                    updateMCQ("subject", e.target.value)
                                }
                                className={inputClass}
                            >
                                {subjects.map((subject) => (
                                    <option key={subject}>{subject}</option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Province">
                            <select
                                value={mcq.province}
                                onChange={(e) =>
                                    updateMCQ("province", e.target.value)
                                }
                                className={inputClass}
                            >
                                {provinces.map((province) => (
                                    <option key={province}>{province}</option>
                                ))}
                            </select>
                        </Field>

                    </div>

                    <Field label="Exam Date">
                        <input
                            type="date"
                            value={mcq.examDate}
                            onChange={(e) =>
                                updateMCQ("examDate", e.target.value)
                            }
                            className={inputClass}
                        />
                    </Field>

                    <button
                        type="submit"
                        className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                    >
                        Import MCQ
                    </button>

                </form>
            </div>
        </div>
    );
}

function Field({ label, children }) {
    return (
        <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </label>

            {children}
        </div>
    );
}

export default PracticeQuizSection;