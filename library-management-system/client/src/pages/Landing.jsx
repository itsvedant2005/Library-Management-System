import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaUsers,
  FaBook,
  FaShieldAlt
} from "react-icons/fa";

function Landing() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-700">

      {/* Navbar */}

      <nav className="flex justify-between items-center px-10 py-6 text-white">

        <h1 className="text-3xl font-bold">
          📚 LibraryHub
        </h1>

        <div className="flex gap-4">

          <Link to="/student-login">
            <button className="bg-white text-slate-900 px-5 py-2 rounded-xl font-semibold hover:scale-105 duration-300">
              Student Login
            </button>
          </Link>

          <Link to="/admin-login">
            <button className="bg-blue-600 px-5 py-2 rounded-xl text-white hover:bg-blue-700 duration-300">
              Admin Login
            </button>
          </Link>

        </div>

      </nav>

      {/* Hero */}

      <div className="max-w-7xl mx-auto px-10 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}

          <div>

            <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full mb-5">

              Smart Library Management

            </div>

            <h1 className="text-6xl font-bold text-white leading-tight">

              Modern Library
              <br />
              Management
              <span className="text-cyan-300">
                {" "}System
              </span>

            </h1>

            <p className="text-gray-200 mt-6 text-lg">

              Manage books, students,
              issue requests, returns and
              fines with a professional
              digital library platform.

            </p>

            <div className="flex gap-4 mt-8">

              <Link to="/student-register">

                <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold duration-300">

                  Get Started

                </button>

              </Link>

              <Link to="/student-login">

                <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-semibold hover:scale-105 duration-300">

                  Browse Library

                </button>

              </Link>

            </div>

          </div>

          {/* Right Card */}

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">

            <FaBookOpen
              className="text-7xl text-white mb-6"
            />

            <h2 className="text-3xl font-bold text-white">

              Digital Library Portal

            </h2>

            <p className="text-gray-200 mt-4">

              A complete solution for
              book management,
              student records,
              issue tracking and
              fine calculation.

            </p>

          </div>

        </div>

        {/* Features */}

        <div className="grid md:grid-cols-3 gap-6 mt-24">

          <div className="bg-white rounded-3xl p-8 shadow-xl">

            <FaBook
              className="text-5xl text-blue-600 mb-4"
            />

            <h3 className="text-xl font-bold">
              Book Management
            </h3>

            <p className="text-gray-600 mt-3">
              Add, update and manage
              library books efficiently.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl">

            <FaUsers
              className="text-5xl text-green-600 mb-4"
            />

            <h3 className="text-xl font-bold">
              Student Management
            </h3>

            <p className="text-gray-600 mt-3">
              Maintain student records,
              requests and history.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl">

            <FaShieldAlt
              className="text-5xl text-red-500 mb-4"
            />

            <h3 className="text-xl font-bold">
              Secure System
            </h3>

            <p className="text-gray-600 mt-3">
              JWT authentication and
              protected routes for safety.
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Landing;