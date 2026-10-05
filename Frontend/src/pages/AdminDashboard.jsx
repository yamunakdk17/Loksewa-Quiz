import React, { useState } from "react";

import AdminTabs from "../components/admin/AdminTabs";
import PastQuestionSection from "../components/admin/PastQuestionSection";
import PracticeQuizSection from "../components/admin/PracticeQuizSection";
import Questionbank from "../components/admin/Questionbank";
import NoticeBoardSection from "../components/admin/NoticeBoardSection";

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("past");
    const [toast, setToast] = useState("");

    const showToast = (message) => {
        setToast(message);

        setTimeout(() => {
            setToast("");
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px]">

                <AdminTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {activeTab === "past" && (
                    <PastQuestionSection
                        showToast={showToast}
                    />
                )}

                {activeTab === "quiz" && (
                    <PracticeQuizSection
                        showToast={showToast}
                    />
                )}

                {activeTab === "questionbank" && (
                    <Questionbank
                        showToast={showToast}
                    />
                )}

                {activeTab === "notice" && (
                    <NoticeBoardSection
                        showToast={showToast}
                    />
                )}

            </div>

            {toast && (
                <div className="fixed bottom-5 right-5 z-50 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg">
                    {toast}
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;