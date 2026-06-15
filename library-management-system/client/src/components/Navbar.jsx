import { Link, useNavigate } from "react-router-dom";

import {
  FaBook,
  FaUsers,
  FaSignOutAlt,
  FaHome,
  FaUserGraduate,
  FaClipboardList
} from "react-icons/fa";

function Navbar({ role }) {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <nav className="bg-slate-900 text-white shadow-xl sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}

        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >

          <div className="bg-blue-600 p-2 rounded-xl">

            <FaBook size={22} />

          </div>

          <div>

            <h1 className="font-bold text-2xl">
              LibraryHub
            </h1>

            <p className="text-xs text-gray-400">
              Smart Library Management
            </p>

          </div>

        </div>

        {/* Navigation */}

        <div className="flex items-center gap-5">

          <Link
            to="/"
            className="hover:text-cyan-400 duration-300 flex items-center gap-2"
          >
            <FaHome />
            Home
          </Link>

          {role === "admin" && (
            <>

              <Link
                to="/admin/dashboard"
                className="hover:text-cyan-400 duration-300"
              >
                Dashboard
              </Link>

              <Link
                to="/admin/books"
                className="hover:text-cyan-400 duration-300 flex items-center gap-2"
              >
                <FaBook />
                Books
              </Link>

              <Link
                to="/admin/students"
                className="hover:text-cyan-400 duration-300 flex items-center gap-2"
              >
                <FaUsers />
                Students
              </Link>

              <Link
                to="/admin/requests"
                className="hover:text-cyan-400 duration-300 flex items-center gap-2"
              >
                <FaClipboardList />
                Requests
              </Link>

              <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">
                Admin
              </span>

            </>
          )}

          {role === "student" && (
            <>

              <Link
                to="/student/dashboard"
                className="hover:text-cyan-400 duration-300"
              >
                Dashboard
              </Link>

              <Link
                to="/student/books"
                className="hover:text-cyan-400 duration-300 flex items-center gap-2"
              >
                <FaBook />
                Books
              </Link>

              <Link
                to="/student/my-books"
                className="hover:text-cyan-400 duration-300 flex items-center gap-2"
              >
                <FaUserGraduate />
                My Books
              </Link>

              <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                Student
              </span>

            </>
          )}

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl flex items-center gap-2 duration-300"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

    </nav>

  );
}

export default Navbar;