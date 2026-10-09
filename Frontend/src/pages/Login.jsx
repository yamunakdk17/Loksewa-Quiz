import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message || "Invalid email or password."
        );
      }

      const token = result.data?.token;
      const user = result.data?.user;

      if (!token || !user) {
        throw new Error("Login response is missing the token or user.");
      }

      // Store only the user information needed by the frontend.
      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(safeUser));

      // Redirect according to the user's role.
      if (String(user.role).toLowerCase() === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the server. Please check that your backend is running."
          : err.message || "Unable to log in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-grid min-h-screen bg-white">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.05fr_.95fr]">
        <div className="hidden flex-col justify-between bg-[#182235] p-10 text-white lg:flex xl:p-14">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0874BD] text-xs font-black">
              LQ
            </span>
            <span className="font-extrabold">Loksewa Quiz</span>
          </Link>

          <div className="max-w-xl">
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#FFAA0A]">
              Your preparation desk
            </p>

            <h1 className="mt-5 text-5xl font-black leading-[1.03] tracking-[-.04em]">
              Come back to where your progress is.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
              Your practice history, saved questions and study progress stay
              together so every session has a clear next step.
            </p>

            <div className="mt-9 grid grid-cols-3 gap-3">
              {[
                ["15", "Q / quiz"],
                ["6", "sectors"],
                ["24/7", "practice"],
              ].map(([number, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xl font-black">{number}</p>
                  <p className="mt-1 text-xs text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Focused design. Fixed brand palette. No distracting theme controls.
          </p>
        </div>

        <div className="flex items-center justify-center px-5 py-10 sm:px-10">
          <div className="w-full max-w-[440px]">
            <div className="mb-8 lg:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-3 font-extrabold"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0874BD] text-xs font-black text-white">
                  LQ
                </span>
                Loksewa Quiz
              </Link>
            </div>

            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-[.16em] text-[#0874BD]">
                Student login
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-[#182235]">
                Welcome back.
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Log in to continue your preparation.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-xs font-extrabold text-slate-600">
                  Email address
                </span>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-300 focus:border-[#0874BD] focus:ring-4 focus:ring-[#0874BD]/10"
                />
              </label>

              <label className="block">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-600">
                    Password
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    Keep it private
                  </span>
                </div>

                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-300 focus:border-[#0874BD] focus:ring-4 focus:ring-[#0874BD]/10"
                />
              </label>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-[#0874BD] text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(8,116,189,.16)] transition hover:bg-[#07538E] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing you in…" : "Log in"}
              </button>
            </form>

            <div className="my-7 flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-100" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                or
              </span>
              <span className="h-px flex-1 bg-slate-100" />
            </div>

            <p className="text-center text-sm text-slate-500">
              New to Loksewa Quiz?{" "}
              <Link
                to="/register"
                className="font-extrabold text-[#0874BD] hover:underline"
              >
                Create an account
              </Link>
            </p>

            <Link
              to="/"
              className="mt-6 block text-center text-xs font-bold text-slate-400 hover:text-[#0874BD]"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;