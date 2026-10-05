import React, { useState } from "react";

import {initialNoticeForm,noticeTypes,} from "../../constants/adminConstants";
import {createNotice } from "../../services/noticeService";

function NoticeBoardSection({ showToast }) {
    const [form, setForm] = useState(initialNoticeForm);
    const [file, setFile] = useState(null);

    const inputClass =
        "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

    const updateForm = (field, value) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const handleFile = (event) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) return;

        if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
            showToast("Only PDF files are allowed.");
            event.target.value = "";
            return;
        }

        if (selectedFile.size > 10 * 1024 * 1024) {
            showToast("PDF must not be larger than 10 MB.");
            event.target.value = "";
            return;
        }

        setFile(selectedFile);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            showToast("Please select a notice PDF.");
            return;
        }

        try {
            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("sector", form.sector);
            formData.append("notice_type", form.notice_type);
            formData.append("organization", form.organization);
            formData.append("published_date", form.published_date);
            formData.append("deadline", form.deadline);
            formData.append("status", form.status);

            // Important: backend expects notice_pdf
            formData.append("notice_pdf", file);

            // For now, if your backend requires JWT,
            // replace this with your actual token.
            const token = localStorage.getItem("token");

            const result = await createNotice(formData, token);

            console.log("Notice uploaded:", result);

            showToast("Notice uploaded successfully.");

            // Reset form
            setForm(initialNoticeForm);
            setFile(null);

            // Reset file input
            event.target.reset();

        } catch (error) {
            console.error("Notice upload error:", error);

            showToast(error.message || "Failed to upload notice.");
        }
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                    Add Notice
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Upload an official notice for students.
                </p>
            </div>

            <form onSubmit={handleSubmit}>

                {/* Notice Title */}

                <Field label="Notice Title *">
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) =>
                            updateForm("title", e.target.value)
                        }
                        placeholder="Enter notice title"
                        required
                        className={inputClass}
                    />
                </Field>

                {/* Description */}

                <Field label="Description *">
                    <textarea
                        rows="4"
                        value={form.description}
                        onChange={(e) =>
                            updateForm("description", e.target.value)
                        }
                        placeholder="Enter notice description"
                        required
                        className={inputClass}
                    />
                </Field>

                <div className="grid gap-5 md:grid-cols-2">

                    {/* Sector */}

                    <Field label="Sector *">
                        <select
                            value={form.sector}
                            onChange={(e) =>
                                updateForm("sector", e.target.value)
                            }
                            required
                            className={inputClass}
                        >
                            <option value="Administration">
                                Administration
                            </option>

                            <option value="Education">
                                Education
                            </option>

                            <option value="Health">
                                Health
                            </option>

                            <option value="Agriculture">
                                Agriculture
                            </option>

                            <option value="Engineering">
                                Engineering
                            </option>

                            <option value="Finance">
                                Finance
                            </option>

                            <option value="IT">
                                IT
                            </option>

                            <option value="General Knowledge">
                                General Knowledge
                            </option>
                        </select>
                    </Field>

                    {/* Notice Type */}

                    <Field label="Notice Type *">
                        <select
                            value={form.notice_type}
                            onChange={(e) =>
                                updateForm(
                                    "notice_type",
                                    e.target.value
                                )
                            }
                            required
                            className={inputClass}
                        >
                            {noticeTypes.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </Field>

                    {/* Organization */}

                    <Field label="Organization">
                        <input
                            type="text"
                            value={form.organization}
                            onChange={(e) =>
                                updateForm(
                                    "organization",
                                    e.target.value
                                )
                            }
                            placeholder="Public Service Commission"
                            className={inputClass}
                        />
                    </Field>

                    {/* Published Date */}

                    <Field label="Published Date">
                        <input
                            type="date"
                            value={form.published_date}
                            onChange={(e) =>
                                updateForm(
                                    "published_date",
                                    e.target.value
                                )
                            }
                            className={inputClass}
                        />
                    </Field>

                    {/* Deadline */}

                    <Field label="Deadline">
                        <input
                            type="date"
                            value={form.deadline}
                            onChange={(e) =>
                                updateForm(
                                    "deadline",
                                    e.target.value
                                )
                            }
                            className={inputClass}
                        />
                    </Field>

                    {/* Status */}

                    <Field label="Status *">
                        <select
                            value={form.status}
                            onChange={(e) =>
                                updateForm("status", e.target.value)
                            }
                            required
                            className={inputClass}
                        >
                            <option value="Open">Open</option>
                            <option value="Closed">Closed</option>
                            <option value="Upcoming">Upcoming</option>
                        </select>
                    </Field>

                </div>

                {/* PDF Upload */}

                <div className="mb-6 mt-6 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center">

                    <div className="mb-3 text-3xl">
                        📄
                    </div>

                    <p className="mb-2 font-semibold text-slate-700">
                        Notice PDF *
                    </p>

                    <p className="mb-4 text-xs text-slate-500">
                        PDF only • Maximum 10 MB
                    </p>

                    <input
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleFile}
                        required
                        className="mx-auto block w-full max-w-md rounded-lg border border-slate-300 bg-white text-sm"
                    />

                    {file && (
                        <p className="mt-3 text-sm font-semibold text-green-600">
                            Selected: {file.name}
                        </p>
                    )}

                </div>

                {/* Submit */}

                <button
                    type="submit"
                    className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                >
                    Upload Notice
                </button>

            </form>
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

export default NoticeBoardSection;