import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setMessage("Passwords do not match.");
    setMessage("Account creation is ready to connect to your registration endpoint.");
  };

  return (
    <div className="app-grid min-h-screen bg-white">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[.92fr_1.08fr]">
        <div className="hidden bg-[#0874BD] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <Link to="/" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-xs font-black">LQ</span><span className="font-extrabold">Loksewa Quiz</span></Link>
          <div><p className="text-xs font-black uppercase tracking-[.18em] text-[#FFAA0A]">Start with one habit</p><h1 className="mt-5 max-w-lg text-5xl font-black leading-[1.04] tracking-[-.04em]">Small daily practice adds up.</h1><p className="mt-6 max-w-md leading-7 text-blue-100">Create your account to keep quiz attempts, accuracy and your study routine in one place.</p></div>
          <p className="text-xs text-blue-200">Fixed brand colors • Clear spacing • Student-first navigation</p>
        </div>
        <div className="flex items-center justify-center px-5 py-10 sm:px-10">
          <div className="w-full max-w-[470px]">
            <div className="mb-8 lg:hidden"><Link to="/" className="inline-flex items-center gap-3 font-extrabold"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0874BD] text-xs font-black text-white">LQ</span>Loksewa Quiz</Link></div>
            <p className="text-xs font-black uppercase tracking-[.16em] text-[#0874BD]">Create your account</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">Set up your study space.</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">It only takes a minute to get started.</p>
            <form onSubmit={submit} className="mt-8 space-y-4">
              {[[ "name", "Full name", "Your name", "text"], ["email", "Email address", "you@example.com", "email"], ["password", "Password", "Create a password", "password"], ["confirm", "Confirm password", "Repeat your password", "password"]].map(([key,label,placeholder,type]) => <label key={key} className="block"><span className="mb-2 block text-xs font-extrabold text-slate-600">{label}</span><input value={form[key]} onChange={(e)=>setForm({...form,[key]:e.target.value})} type={type} required placeholder={placeholder} className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#0874BD] focus:ring-4 focus:ring-[#0874BD]/10"/></label>)}
              {message && <div className="rounded-xl border border-[#CDE5F4] bg-[#F2F9FD] px-4 py-3 text-sm font-semibold text-[#07538E]">{message}</div>}
              <button className="mt-2 h-12 w-full rounded-xl bg-[#0874BD] text-sm font-extrabold text-white hover:bg-[#07538E]">Create account</button>
            </form>
            <p className="mt-7 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-extrabold text-[#0874BD]">Log in</Link></p>
            <Link to="/" className="mt-6 block text-center text-xs font-bold text-slate-400">← Back to home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
