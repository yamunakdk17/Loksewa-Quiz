import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-screen bg-[#0868a9] flex items-center justify-center px-5">
      {/* Register Card */}
      <div className="w-full max-w-[410px] bg-white rounded-[20px] px-[35px] py-[35px] text-center">
        {/* Heading */}
        <h1 className="text-[30px] font-bold text-slate-800 font-serif leading-tight">
          Create an account
        </h1>

        {/* Subtitle */}
        <p className="mt-3 mb-[30px] text-[15px] text-slate-500">
          Sign up to start practicing
        </p>

        {/* Form */}
        <form className="flex flex-col gap-4">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full name"
            required
            className="
              w-full
              h-[57px]
              px-4
              border
              border-[#d7dce1]
              rounded-xl
              text-[15px]
              text-slate-700
              placeholder:text-slate-500
              placeholder:font-semibold
              outline-none
              focus:border-[#0874bd]
            "
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            required
            className="
              w-full
              h-[57px]
              px-4
              border
              border-[#d7dce1]
              rounded-xl
              text-[15px]
              text-slate-700
              placeholder:text-slate-500
              placeholder:font-semibold
              outline-none
              focus:border-[#0874bd]
            "
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            required
            className="
              w-full
              h-[57px]
              px-4
              border
              border-[#d7dce1]
              rounded-xl
              text-[15px]
              text-slate-700
              placeholder:text-slate-500
              placeholder:font-semibold
              outline-none
              focus:border-[#0874bd]
            "
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm password"
            required
            className="
              w-full
              h-[57px]
              px-4
              border
              border-[#d7dce1]
              rounded-xl
              text-[15px]
              text-slate-700
              placeholder:text-slate-500
              placeholder:font-semibold
              outline-none
              focus:border-[#0874bd]
            "
          />

          {/* Register Button */}
          <button
            type="submit"
            className="
              w-full
              h-[52px]
              mt-[18px]
              bg-[#0874bd]
              hover:bg-[#0767aa]
              text-white
              rounded-[11px]
              text-[15px]
              font-bold
              shadow-md
              cursor-pointer
              transition
            "
          >
            Sign up
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-[14px] text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="text-[#0874bd] font-bold underline">
            Log in
          </Link>
        </p>

        {/* Note */}
        <p className="mt-5 text-[14px] leading-[1.6] text-slate-500">
          Your account and scores are saved in this browser, on
          <br />
          this device only.
        </p>
      </div>
    </div>
  );
}

export default Register;
