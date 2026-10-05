import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Quiz", path: "/quiz" },
    { name: "Past Questions", path: "/past-questions" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">

          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0874BD] text-lg font-bold text-white">
            lQ
          </span>

          <span className="font-serif text-xl font-bold text-[#182235]">
            Loksewa Quiz
          </span>

        </Link>


        {/* =========================
            NAVIGATION
        ========================= */}

        <div className="flex h-full items-center gap-1">

          {/* Normal Navigation Links */}

          {navLinks.map((link) => {

            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex h-full items-center border-b-2 px-4 text-sm font-semibold transition ${
                  isActive
                    ? "border-[#1769AA] text-[#1769AA]"
                    : "border-transparent text-[#182235] hover:text-[#1769AA]"
                }`}
              >
                {link.name}
              </Link>
            );

          })}


          {/* =========================
              NOT LOGGED IN
          ========================= */}

          {!user && (
            <Link
              to="/login"
              className={`ml-3 rounded-md px-5 py-2 text-sm font-semibold transition ${
                location.pathname === "/login"
                  ? "bg-[#1769AA] text-white"
                  : "border border-gray-300 text-[#182235] hover:bg-[#1769AA] hover:text-white"
              }`}
            >
              Login
            </Link>
          )}


          {/* =========================
              STUDENT LOGGED IN
          ========================= */}

          {user && user.role === "student" && (
            <>
              <Link
                to="/dashboard"
                className={`ml-3 rounded-md px-5 py-2 text-sm font-semibold transition ${
                  location.pathname === "/dashboard"
                    ? "bg-[#1769AA] text-white"
                    : "border border-gray-300 text-[#182235] hover:bg-[#1769AA] hover:text-white"
                }`}
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="ml-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          )}


          {/* =========================
              ADMIN LOGGED IN
          ========================= */}

          {user && user.role === "admin" && (
            <>
              <Link
                to="/admin"
                className={`ml-3 rounded-md px-5 py-2 text-sm font-semibold transition ${
                  location.pathname.startsWith("/admin")
                    ? "bg-[#1769AA] text-white"
                    : "border border-gray-300 text-[#182235] hover:bg-[#1769AA] hover:text-white"
                }`}
              >
                Admin
              </Link>

              <button
                onClick={handleLogout}
                className="ml-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;