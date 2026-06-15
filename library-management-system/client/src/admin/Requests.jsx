import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaTimes,
  FaUserGraduate,
  FaBook
} from "react-icons/fa";

import API from "../services/api";
import Navbar from "../components/Navbar";

function Requests() {

  const [requests, setRequests] =
    useState([]);

  const fetchRequests = async () => {

    try {

      const res =
        await API.get(
          "/issues/requests"
        );

      setRequests(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRequest =
    async (id) => {

      try {

        await API.put(
          `/issues/approve/${id}`
        );

        toast.success("Book Issued Successfully");
          

        fetchRequests();

      } catch (error) {

        console.log(error);

      }
    };

  const rejectRequest =
    async (id) => {

      try {

        await API.put(
          `/issues/reject/${id}`
        );

        toast.error("Request Rejected");

        fetchRequests();

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar role="admin" />

      <div className="p-8">

        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-3xl p-8 shadow-xl mb-8">

          <h1 className="text-4xl font-bold">
            Student Book Requests
          </h1>

          <p className="mt-3 text-lg">
            Approve or reject
            book issue requests.
          </p>

        </div>

        {requests.length === 0 ? (

          <div className="bg-white rounded-3xl p-10 text-center shadow-lg">

            <h2 className="text-2xl font-semibold text-gray-600">
              No Pending Requests
            </h2>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full bg-white rounded-3xl shadow-lg overflow-hidden">

              <thead>

                <tr className="bg-slate-800 text-white">

                  <th className="p-4 text-left">
                    Book
                  </th>

                  <th className="p-4 text-left">
                    Student
                  </th>

                  <th className="p-4 text-left">
                    Email
                  </th>

                  <th className="p-4 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {requests.map(
                  (request) => (

                    <tr
                      key={request._id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <FaBook className="text-blue-600" />

                          {
                            request.bookId
                              ?.title
                          }

                        </div>

                      </td>

                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <FaUserGraduate className="text-green-600" />

                          {
                            request.studentId
                              ?.name
                          }

                        </div>

                      </td>

                      <td className="p-4">

                        {
                          request.studentId
                            ?.email
                        }

                      </td>

                      <td className="p-4">

                        <div className="flex justify-center gap-3">

                          <button
                            onClick={() =>
                              approveRequest(
                                request._id
                              )
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                          >
                            <FaCheck />
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              rejectRequest(
                                request._id
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                          >
                            <FaTimes />
                            Reject
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );
}

export default Requests;