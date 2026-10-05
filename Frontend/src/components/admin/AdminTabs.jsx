import React from "react";

function AdminTabs({ activeTab, setActiveTab }) {
    const tabs = [
        {
            id: "past",
            label: " Add Past Question",
        },
        {
            id: "quiz",
            label: " Add Practice Quiz",
        },
        {
            id: "questionbank",
            label: " Question Bank",
        },
        {
            id: "notice",
            label: " Notice Board",
        },
    ];

    return (
        <nav className="mb-6 flex gap-2 overflow-x-auto border-b border-slate-200 pb-2">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap rounded-lg px-4 py-3 text-sm font-semibold transition ${activeTab === tab.id
                            ? "bg-slate-800 text-white"
                            : "text-slate-600 hover:bg-slate-200"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
}

export default AdminTabs;