function AdminTabs({ activeTab, setActiveTab }) {
  const tabs = [
    ["past", "Past questions"],
    ["quiz", "Practice quizzes"],
    ["questionbank", "Question bank"],
    ["notice", "Notice board"],
  ];
  return <nav className="mb-6 flex gap-2 overflow-x-auto border-b border-slate-200 pb-2">{tabs.map(([id,label])=><button key={id} type="button" onClick={()=>setActiveTab(id)} className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-extrabold transition ${activeTab===id ? "bg-[#182235] text-white" : "text-slate-500 hover:bg-slate-100"}`}>{label}</button>)}</nav>;
}
export default AdminTabs;
