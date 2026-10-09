import { Link } from "react-router-dom";

const attempts = [
  ["GK — History Mock Test", "Sep 24, 2026", "18 / 20", "90%"],
  ["Section Officer — Paper I", "Sep 22, 2026", "38 / 50", "76%"],
  ["Kharidar Model Test", "Sep 18, 2026", "28 / 40", "70%"],
];

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const firstName = user?.name?.split(" ")[0] || "Student";

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[230px_1fr]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-3 lg:sticky lg:top-[94px]">
            <div className="mb-3 px-3 py-3"><p className="text-xs font-black uppercase tracking-[.15em] text-[#0874BD]">My study</p><p className="mt-1 text-sm font-extrabold">Preparation desk</p></div>
            {[["Dashboard","/dashboard","▦"],["Practice quiz","/quiz","◈"],["Past questions","/past-questions","▤"]].map(([label,path,icon],i)=><Link key={path} to={path} className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold ${i===0 ? "bg-[#EAF4FB] text-[#07538E]" : "text-slate-500 hover:bg-slate-50 hover:text-[#0874BD]"}`}><span className="w-5 text-center">{icon}</span>{label}</Link>)}
            <div className="my-3 border-t border-slate-100" />
            <div className="rounded-xl bg-[#FFF9EA] p-3"><p className="text-xs font-black text-[#A56A00]">STREAK</p><p className="mt-1 text-xl font-black text-[#182235]">4 days</p><p className="mt-1 text-[11px] leading-4 text-slate-500">Keep today’s practice session alive.</p></div>
          </aside>

          <main className="min-w-0">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div><p className="text-xs font-black uppercase tracking-[.16em] text-[#0874BD]">Good to see you</p><h1 className="mt-2 text-3xl font-black tracking-[-.03em] text-[#182235]">Ready to study, {firstName}?</h1><p className="mt-2 text-sm text-slate-500">Here’s the shortest useful path for your next session.</p></div>
              <Link to="/quiz" className="inline-flex w-fit rounded-xl bg-[#0874BD] px-4 py-3 text-sm font-extrabold text-white hover:bg-[#07538E]">Start 15-question quiz →</Link>
            </div>

            <section className="mt-7 grid gap-4 sm:grid-cols-3">
              {[["85%", "Average accuracy", "↑ 8% this month"],["12", "Quizzes attempted", "3 this week"],["4", "Sectors practiced", "2 need attention"]].map(([n,l,d])=><div key={l} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><p className="text-xs font-bold text-slate-400">{l}</p><span className="h-2 w-2 rounded-full bg-[#0874BD]"/></div><p className="mt-4 text-3xl font-black tracking-tight text-[#182235]">{n}</p><p className="mt-1 text-xs font-bold text-[#0874BD]">{d}</p></div>)}
            </section>

            <section className="mt-7 grid gap-5 xl:grid-cols-[1fr_300px]">
              <div className="rounded-2xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-100 p-5"><div><h2 className="font-black">Recent attempts</h2><p className="mt-1 text-xs text-slate-400">Your latest practice sessions</p></div><Link to="/quiz" className="text-xs font-extrabold text-[#0874BD]">Practice again</Link></div>
                <div className="divide-y divide-slate-100">
                  {attempts.map(([title,date,score,pct])=><div key={title} className="grid gap-3 p-5 sm:grid-cols-[1fr_120px_80px] sm:items-center"><div><p className="text-sm font-extrabold text-[#182235]">{title}</p><p className="mt-1 text-xs text-slate-400">{date}</p></div><span className="text-sm font-bold text-slate-600">{score}</span><span className="w-fit rounded-full bg-[#EAF7EF] px-2.5 py-1 text-xs font-black text-[#187A46]">{pct}</span></div>)}
                </div>
              </div>

              <div className="rounded-2xl bg-[#182235] p-6 text-white">
                <p className="text-xs font-black uppercase tracking-[.16em] text-[#FFAA0A]">Next focus</p>
                <h2 className="mt-3 text-xl font-black">Administration</h2>
                <p className="mt-2 text-xs leading-5 text-slate-400">Your strongest sector is GK. Spend the next session improving Administration.</p>
                <div className="mt-6"><div className="flex justify-between text-xs font-bold"><span>Progress</span><span>64%</span></div><div className="mt-2 h-2 rounded-full bg-white/10"><div className="h-full w-[64%] rounded-full bg-[#FFAA0A]"/></div></div>
                <Link to="/quiz" className="mt-6 block rounded-xl bg-white px-4 py-3 text-center text-xs font-extrabold text-[#182235]">Practice Administration</Link>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
