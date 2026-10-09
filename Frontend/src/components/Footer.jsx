import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#182235] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0874BD] text-xs font-black">LQ</span>
            <div>
              <p className="font-extrabold">Loksewa Quiz</p>
              <p className="text-xs text-slate-400">A focused practice desk for Loksewa preparation.</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
            Practice sector-wise questions, review past papers and build a consistent exam routine without unnecessary clutter.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs font-black uppercase tracking-[.16em] text-slate-300">Study</p>
          <div className="space-y-3 text-sm text-slate-400">
            <Link className="block hover:text-white" to="/quiz">Practice quizzes</Link>
            <Link className="block hover:text-white" to="/past-questions">Past questions</Link>
            <Link className="block hover:text-white" to="/dashboard">My dashboard</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-black uppercase tracking-[.16em] text-slate-300">Account</p>
          <div className="space-y-3 text-sm text-slate-400">
            <Link className="block hover:text-white" to="/login">Log in</Link>
            <Link className="block hover:text-white" to="/register">Create account</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© 2026 Loksewa Quiz</span>
          <span>Built for focused exam preparation.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
