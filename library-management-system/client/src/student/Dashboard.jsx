import {
  FaBook,
  FaUserGraduate,
  FaMoneyBill,
  FaArrowRight
} from "react-icons/fa";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  

  const name =
    localStorage.getItem(
      "studentName"
    ) || "Student";

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar role="student" />

      <div className="p-8">

        {/* Welcome Banner */}

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl p-8 shadow-xl mb-8">

          <h1 className="text-4xl font-bold">
            Welcome Back, {name} 👋
          </h1>

          <p className="mt-3 text-lg">
            Manage your books, requests and fines from one place.
          </p>

        </div>

        {/* Quick Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          

  <div
    onClick={() =>
      navigate("/student/books")
    }
    className="bg-white rounded-3xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer"
  >

    <FaBook
      className="text-5xl text-blue-600"
    />

    <h3 className="mt-4 text-gray-500">
      Library Books
    </h3>

    <p className="text-lg font-semibold">
      Browse Available Books
    </p>

  </div>

  <div
    onClick={() =>
      navigate("/student/my-books")
    }
    className="bg-white rounded-3xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer"
  >

    <FaUserGraduate
      className="text-5xl text-green-600"
    />

    <h3 className="mt-4 text-gray-500">
      My Books
    </h3>

    <p className="text-lg font-semibold">
      Track Issued Books
    </p>

  </div>

  <div
    onClick={() =>
     navigate("/student/fines")
    }
    className="bg-white rounded-3xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer"
  >

    <FaMoneyBill
      className="text-5xl text-red-500"
    />

    <h3 className="mt-4 text-gray-500">
      Fines
    </h3>

    <p className="text-lg font-semibold">
      View Pending Fines
    </p>

  </div>

</div>

        {/* Quick Actions */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="border rounded-2xl p-6 hover:shadow-lg duration-300">

              <h3 className="text-xl font-semibold">
                📚 Browse Books
              </h3>

              <p className="text-gray-600 mt-2">
                Search and request books from the library catalog.
              </p>

              <Link
                to="/student/books"
              >
                <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700">

                  Open Catalog

                  <FaArrowRight />

                </button>
              </Link>

            </div>

            <div className="border rounded-2xl p-6 hover:shadow-lg duration-300">

              <h3 className="text-xl font-semibold">
                📖 My Books
              </h3>

              <p className="text-gray-600 mt-2">
                Check issue dates, due dates and fines.
              </p>

              <Link
                to="/student/my-books"
              >
                <button className="mt-4 bg-green-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-green-700">

                  View Books

                  <FaArrowRight />

                </button>
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;