import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import API from "../services/api";
import toast from "react-hot-toast";

function AdminLogin() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res =
        await API.post(
          "/auth/admin/login",
          {
            email,
            password
          }
        );

      localStorage.setItem(
        "adminToken",
        res.data.token
      );

      navigate(
        "/admin/dashboard"
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-700 flex justify-center items-center p-6">

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md">

        <div className="text-center">

          <div className="flex justify-center mb-4">

            <div className="bg-white p-4 rounded-full">

              <FaUserShield
                className="text-5xl text-blue-600"
              />

            </div>

          </div>

          <h1 className="text-4xl font-bold text-white">

            Admin Login

          </h1>

          <p className="text-gray-200 mt-2">

            Library Administration Portal

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >

          <input
            type="email"
            placeholder="Admin Email"
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

      </div>

    </div>

  );
}

export default AdminLogin;