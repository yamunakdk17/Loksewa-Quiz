import { useState } from "react";

const subjects = ["Administration","General Knowledge","Education","Health","Agriculture","Engineering","Finance","IT"];
const provinces = ["All provinces","Koshi Province","Madhesh Province","Bagmati Province","Gandaki Province","Lumbini Province","Karnali Province","Sudurpashchim Province"];
const papers = [
  ["2026-09-15","Administration","Koshi Province","10 questions","15 min"],
  ["2026-09-08","Administration","Koshi Province","10 questions","15 min"],
  ["2026-08-26","General Knowledge","Bagmati Province","15 questions","20 min"],
  ["2026-08-12","Education","Gandaki Province","20 questions","25 min"],
];

function PastQuestions() {
  const [subject,setSubject] = useState("Administration");
  const [province,setProvince] = useState("All provinces");

  const filtered = papers.filter((p) => (subject === "All subjects" || p[1] === subject) && (province === "All provinces" || p[2] === province));

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8 lg:py-12">
        <div><p className="text-xs font-black uppercase tracking-[.16em] text-[#0874BD]">Paper library</p><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Past questions, without the clutter.</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">Filter the library first, then choose the exact paper you want to attempt or review.</p></div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <label><span className="mb-2 block text-xs font-extrabold text-slate-500">Subject</span><select value={subject} onChange={e=>setSubject(e.target.value)} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold outline-none focus:border-[#0874BD]"><option>All subjects</option>{subjects.map(s=><option key={s}>{s}</option>)}</select></label>
            <label><span className="mb-2 block text-xs font-extrabold text-slate-500">Province</span><select value={province} onChange={e=>setProvince(e.target.value)} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold outline-none focus:border-[#0874BD]">{provinces.map(s=><option key={s}>{s}</option>)}</select></label>
            <button onClick={()=>{setSubject("Administration");setProvince("All provinces")}} className="h-11 rounded-xl border border-slate-200 px-4 text-xs font-extrabold text-slate-600 hover:bg-slate-50">Reset</button>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {filtered.length ? filtered.map(([date,sub,prov,q,time])=><article key={`${date}-${sub}`} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#B9D9ED] hover:shadow-[0_14px_30px_rgba(24,34,53,.06)] sm:flex sm:items-center sm:justify-between sm:p-6"><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#EAF4FB] text-xs font-black text-[#0874BD]">PDF</span><div><div className="flex flex-wrap items-center gap-2"><h2 className="font-black text-[#182235]">{sub}</h2><span className="rounded-full bg-[#EAF7EF] px-2 py-1 text-[10px] font-black text-[#187A46]">Sample</span></div><p className="mt-1 text-sm text-slate-500">{date} · {prov}</p><p className="mt-2 text-xs font-bold text-slate-400">{q} · {time}</p></div></div><button className="mt-5 w-full rounded-xl bg-[#0874BD] px-5 py-3 text-xs font-extrabold text-white hover:bg-[#07538E] sm:mt-0 sm:w-auto">Open paper →</button></article>) : <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"><p className="font-black">No papers match those filters.</p><p className="mt-1 text-sm text-slate-400">Try a different subject or province.</p></div>}
        </div>

        <p className="mt-6 text-xs leading-5 text-slate-400">Practice material shown here is sample content. Official past papers should be verified with the relevant Public Service Commission.</p>
      </div>
    </div>
  );
}
export default PastQuestions;
