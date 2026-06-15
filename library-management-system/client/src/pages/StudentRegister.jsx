import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import API from "../services/api";
import toast from "react-hot-toast";

function StudentRegister() {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: ""
    });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/student/register",
        form
      );

      toast.success("Registration Successful");

      navigate(
        "/student-login"
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-600 flex justify-center items-center p-6">

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md">

        <div className="text-center">

          <div className="flex justify-center mb-4">

            <div className="bg-white p-4 rounded-full">

              <FaUserPlus
                className="text-5xl text-blue-600"
              />

            </div>

          </div>

          <h1 className="text-4xl font-bold text-white">
            Student Registration
          </h1>

          <p className="text-gray-200 mt-2">
            Create your library account
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
            className="w-full p-4 rounded-xl mb-4 bg-white text-slate-800 outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
            className="w-full p-4 rounded-xl mb-4 bg-white text-slate-800 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
            className="w-full p-4 rounded-xl mb-6 bg-white text-slate-800 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl font-semibold duration-300"
          >
            Create Account
          </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-white">

            Already have an account?

            <Link
              to="/student-login"
              className="ml-2 text-cyan-300 hover:text-cyan-200 font-semibold"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default StudentRegister;