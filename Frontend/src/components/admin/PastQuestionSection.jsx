import React, { useState } from "react";

import {
    subjects,
    provinces,
    levels,
    initialPastQuestionForm,
} from "../../constants/adminConstants";

function PastQuestionSection({ showToast }) {
    const [form, setForm] = useState(initialPastQuestionForm);
    const [file, setFile] = useState(null);

    const inputClass =
        "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

    const updateForm = (field, value) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) return;

        const name = selectedFile.name.toLowerCase();

        if (!name.endsWith(".pdf") && !name.endsWith(".docx")) {
            showToast("Only PDF and DOCX files are allowed.");
            event.target.value = "";
            return;
        }

        setFile(selectedFile);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!file) {
            showToast("Please select a PDF or DOCX file.");
            return;
        }

        showToast("Past question ready for upload.");
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                    Add Past Question
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Upload previous Loksewa question papers.
                </p>
            </div>

            <form onSubmit={handleSubmit}>

                {/* File */}

                <div className="mb-6 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center">

                    <div className="mb-3 text-3xl">
                        📄
                    </div>

                    <p className="mb-2 font-semibold text-slate-700">
                        Upload Question Paper
                    </p>

                    <p className="mb-4 text-xs text-slate-500">
                        PDF or DOCX
                    </p>

                    <input
                        type="file"
                        accept=".pdf,.docx"
                        onChange={handleFileChange}
                        className="mx-auto block w-full max-w-md rounded-lg border border-slate-300 bg-white text-sm"
                    />

                    {file && (
                        <p className="mt-3 text-sm font-semibold text-blue-600">
                            Selected: {file.name}
                        </p>
                    )}
                </div>

                {/* Title */}

                <div className="mb-5">
                    <label className="mb-2 block text-sm font-semibold">
                        Title *
                    </label>

                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) =>
                            updateForm("title", e.target.value)
                        }
                        placeholder="Example: Section Officer First Paper 2081"
                        required
                        className={inputClass}
                    />
                </div>

                {/* Fields */}

                <div className="grid gap-5 md:grid-cols-2">

                    <Field label="Subject">
                        <select
                            value={form.subject}
                            onChange={(e) =>
                                updateForm("subject", e.target.value)
                            }
                            className={inputClass}
                        >
                            {subjects.map((subject) => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <Field label="Province">
                        <select
                            value={form.province}
                            onChange={(e) =>
                                updateForm("province", e.target.value)
                            }
                            className={inputClass}
                        >
                            {provinces.map((province) => (
                                <option key={province} value={province}>
                                    {province}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <Field label="Exam Date">
                        <input
                            type="date"
                            value={form.examDate}
                            onChange={(e) =>
                                updateForm("examDate", e.target.value)
                            }
                            className={inputClass}
                        />
                    </Field>

                    <Field label="Level">
                        <select
                            value={form.level}
                            onChange={(e) =>
                                updateForm("level", e.target.value)
                            }
                            className={inputClass}
                        >
                            {levels.map((level) => (
                                <option key={level} value={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <Field label="Year">
                        <input
                            type="number"
                            value={form.year}
                            onChange={(e) =>
                                updateForm("year", e.target.value)
                            }
                            placeholder="2081"
                            className={inputClass}
                        />
                    </Field>
                </div>

                <div className="mb-5 mt-5">
                    <label className="mb-2 block text-sm font-semibold">
                        Description
                    </label>

                    <textarea
                        rows="4"
                        value={form.description}
                        onChange={(e) =>
                            updateForm("description", e.target.value)
                        }
                        placeholder="Enter description..."
                        className={inputClass}
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                >
                    Upload Past Question
                </button>

            </form>
        </div>
    );
}

function Field({ label, children }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </label>

            {children}
        </div>
    );
}

export default PastQuestionSection;