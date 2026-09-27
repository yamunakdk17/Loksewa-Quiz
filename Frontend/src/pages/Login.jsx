import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(async (response) => {
                const data = await response.json();

                console.log("LOGIN RESPONSE:", data);

                if (!response.ok) {
                    throw new Error(data.message || "Login failed");
                }

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                if (data.user.role === "admin") {
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/dashboard";
                }
            })
            .catch((error) => {
                console.error(error);
            });
        
        
    };

    return (
        <div className="min-h-screen bg-[#0868a9] flex items-center justify-center px-5">
            <div className="w-full max-w-[410px] min-h-[515px] bg-white rounded-[20px] px-[35px] py-[35px] text-center">

                <h1 className="text-[30px] font-bold text-slate-800 font-serif leading-tight">
                    Welcome back!
                </h1>

                <p className="mt-3 mb-[30px] text-[15px] text-slate-500">
                    Log in to your account
                </p>

                <form
                    onSubmit={handleLogin}
                    className="flex flex-col gap-4"
                >

                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="
                            w-full h-[57px] px-4 border border-[#d7dce1] rounded-xl
                            text-[15px] text-slate-700 placeholder:text-slate-500
                            placeholder:font-semibold outline-none
                            focus:border-[#0874bd]
                        "
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="
                            w-full h-[57px] px-4 border border-[#d7dce1] rounded-xl
                            text-[15px] text-slate-700 placeholder:text-slate-500
                            placeholder:font-semibold outline-none
                            focus:border-[#0874bd]
                        "
                    />

                    <button
                        type="submit"
                        className="
                            w-full h-[52px] mt-[34px] bg-[#0874bd]
                            hover:bg-[#0767aa] text-white rounded-[11px]
                            text-[15px] font-bold shadow-md cursor-pointer
                            transition
                        "
                    >
                        Log in
                    </button>

                </form>

                <p className="mt-6 text-[14px] text-slate-500">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-[#0874bd] font-bold underline"
                    >
                        Sign up
                    </Link>
                </p>

                <p className="mt-5 text-[14px] leading-[1.6] text-slate-500">
                    Your account and scores are saved in this browser, on
                    <br />
                    this device only.
                </p>

            </div>
        </div>
    );
}


export default Login;