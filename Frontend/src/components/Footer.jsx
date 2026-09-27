import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-[#182d5d] text-white pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-6">

        {/* Footer Main */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* About */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Loksewa <span className="text-[#62A9DC]"> Quiz</span>
            </h2>

            <p className="text-gray-400 leading-7 text-sm">
              A simple learning platform for Loksewa students to learn,
              practice questions, prepare for exams, and improve their
              knowledge.
            </p>

            {/* Email */}
            <div className="mt-6">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-white/10 border border-white/10
                rounded-md px-4 py-3 text-sm text-white
                placeholder-gray-400 outline-none
                focus:border-[#62A9DC]"
              />
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Explore
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/quiz" className="hover:text-white transition">
                  Quiz
                </Link>
              </li>

              <li>
                <Link
                  to="/past-questions"
                  className="hover:text-white transition"
                >
                  Past Questions
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-white transition"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link to="/login" className="hover:text-white transition">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Practice */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Popular Practice
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link to="/quiz" className="hover:text-white transition">
                  General Knowledge
                </Link>
              </li>

              <li>
                <Link to="/quiz" className="hover:text-white transition">
                  Administration
                </Link>
              </li>

              <li>
                <Link to="/quiz" className="hover:text-white transition">
                  Health
                </Link>
              </li>

              <li>
                <Link to="/quiz" className="hover:text-white transition">
                  IT
                </Link>
              </li>

              <li>
                <Link to="/quiz" className="hover:text-white transition">
                  Education
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Follow Us
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Facebook
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Instagram
                </a>
              </li>

             

              <li>
                <a href="#" className="hover:text-white transition">
                  YouTube
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Twitter
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 mt-12 pt-6">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-sm text-gray-500">
              © 2026 Loksewa Quiz. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-white transition">
                Terms & Conditions
              </a>

              <a href="#" className="hover:text-white transition">
                License
              </a>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;