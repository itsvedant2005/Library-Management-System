import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import API from "../services/api";
import toast from "react-hot-toast";

function StudentLogin() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/student/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "studentName",
        res.data.student.name
      );

      localStorage.setItem(
        "studentEmail",
        res.data.student.email
      );

      navigate(
        "/student/dashboard"
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-cyan-700 to-blue-500 flex justify-center items-center p-6">

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md">

        <div className="text-center">

          <div className="flex justify-center mb-4">

            <div className="bg-white p-4 rounded-full">

              <FaUserGraduate
                className="text-5xl text-blue-600"
              />

            </div>

          </div>

          <h1 className="text-4xl font-bold text-white">
            Student Login
          </h1>

          <p className="text-gray-200 mt-2">
            Access your library account
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full p-4 rounded-xl mb-4 bg-white text-slate-800 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full p-4 rounded-xl mb-6 bg-white text-slate-800 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold duration-300"
          >
            Login
          </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-white">

            New Student?

            <Link
              to="/student-register"
              className="ml-2 text-cyan-300 hover:text-cyan-200 font-semibold"
            >
              Register Here
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default StudentLogin;