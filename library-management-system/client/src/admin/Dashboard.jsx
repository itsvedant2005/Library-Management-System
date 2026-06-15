import {
  FaBook,
  FaUsers,
  FaClock,
  FaMoneyBill,
  FaBookOpen
} from "react-icons/fa";

import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [loading, setLoading] =
useState(true);


  const [stats, setStats] = useState({
    totalBooks: 0,
    totalStudents: 0,
    issuedBooks: 0,
    pendingRequests: 0,
    totalFine: 0
  });
  const navigate = useNavigate();

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const res =
          await API.get(
            "/dashboard/stats"
          );

        setStats(res.data);

      } catch (error) {

        console.log(error);
        toast.error("Failed to fetch statistics");

      }

    };

    fetchStats();

  }, []);

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar role="admin" />

      <div className="p-8">

        {/* Hero Section */}

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl p-8 shadow-xl mb-8">

          <h1 className="text-4xl font-bold">
            Library Administration Dashboard
          </h1>

          <p className="mt-3 text-lg">
            Manage books, students, requests and library operations.
          </p>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

          <div className="bg-white rounded-3xl shadow-lg p-6 hover:scale-105 duration-300">

            <FaBook
              className="text-blue-600 text-4xl"
            />

            <h3 className="text-gray-500 mt-4">
              Total Books
            </h3>

            <h1 className="text-4xl font-bold mt-2">
              {stats.totalBooks}
            </h1>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 hover:scale-105 duration-300">

            <FaUsers
              className="text-green-600 text-4xl"
            />

            <h3 className="text-gray-500 mt-4">
              Students
            </h3>

            <h1 className="text-4xl font-bold mt-2">
              {stats.totalStudents}
            </h1>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 hover:scale-105 duration-300">

            <FaBookOpen
              className="text-purple-600 text-4xl"
            />

            <h3 className="text-gray-500 mt-4">
              Issued Books
            </h3>

            <h1 className="text-4xl font-bold mt-2">
              {stats.issuedBooks}
            </h1>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 hover:scale-105 duration-300">

            <FaClock
              className="text-orange-500 text-4xl"
            />

            <h3 className="text-gray-500 mt-4">
              Pending Requests
            </h3>

            <h1 className="text-4xl font-bold mt-2">
              {stats.pendingRequests}
            </h1>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 hover:scale-105 duration-300">

            <FaMoneyBill
              className="text-red-500 text-4xl"
            />

            <h3 className="text-gray-500 mt-4">
              Total Fine
            </h3>

            <h1 className="text-4xl font-bold mt-2">
              ₹{stats.totalFine}
            </h1>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-3 gap-6">

            <div
              onClick={() => navigate("/admin/books")}
              className="cursor-pointer bg-blue-600 text-white p-6 rounded-2xl hover:scale-105 duration-300"
            >
              <h2 className="text-xl font-bold">
                📚 Manage Books
              </h2>
              <p className="mt-2">
                Add, update and remove books
              </p>
            </div>

            <div
              onClick={() => navigate("/admin/students")}
              className="cursor-pointer bg-green-600 text-white p-6 rounded-2xl hover:scale-105 duration-300"
            >
              <h2 className="text-xl font-bold">
                👨‍🎓 Students
              </h2>
              <p className="mt-2">
                View registered students
              </p>
            </div>

            <div
              onClick={() => navigate("/admin/requests")}
              className="cursor-pointer bg-orange-500 text-white p-6 rounded-2xl hover:scale-105 duration-300"
            >
              <h2 className="text-xl font-bold">
                📋 Requests
              </h2>
              <p className="mt-2">
                Approve pending requests
              </p>
            </div>

          </div>

      </div>

    </div>

  );
}

export default Dashboard;