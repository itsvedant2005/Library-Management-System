import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaUserGraduate,
  FaBook,
  FaMoneyBill,
  FaUndo
} from "react-icons/fa";

import API from "../services/api";
import Navbar from "../components/Navbar";

function Students() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {

    try {

      const res =
        await API.get("/students");

      setStudents(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const returnBook = async (issueId) => {

    try {

      const res =
        await API.put(
          `/issues/return/${issueId}`
        );

      toast.success(
        `Book Returned Successfully\nFine: ₹${res.data.fine}`
      );

      fetchStudents();

    } catch (error) {

      console.log(error);

      toast.error("Failed To Return Book");

    }
  };

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar role="admin" />

      <div className="p-8">

        {/* Header */}

        <div className="bg-gradient-to-r from-green-600 to-cyan-500 text-white rounded-3xl p-8 shadow-xl mb-8">

          <h1 className="text-4xl font-bold">
            Student Management
          </h1>

          <p className="mt-3 text-lg">
            View students, books issued and fines.
          </p>

        </div>

        {/* Search */}

        <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 mb-8">

          <FaSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full outline-none"
          />

        </div>

        {/* Students */}

        <div className="grid gap-6">

          {students

            .filter((student) =>

              student.name
                ?.toLowerCase()
                .includes(
                  search.toLowerCase()
                ) ||

              student.email
                ?.toLowerCase()
                .includes(
                  search.toLowerCase()
                )

            )

            .map((student) => (

              <div
                key={student._id}
                className="bg-white rounded-3xl shadow-lg p-6"
              >

                {/* Student Info */}

                <div className="flex flex-col md:flex-row md:justify-between md:items-center">

                  <div>

                    <h2 className="text-2xl font-bold flex items-center gap-3">

                      <FaUserGraduate className="text-blue-600" />

                      {student.name}

                    </h2>

                    <p className="text-gray-600 mt-2">
                      {student.email}
                    </p>

                  </div>

                  <div className="flex gap-4 mt-4 md:mt-0">

                    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl">
                      Books:
                      {" "}
                      {student.booksIssued}
                    </div>

                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded-xl flex items-center gap-2">

                      <FaMoneyBill />

                      ₹{student.currentFine}

                    </div>

                  </div>

                </div>

                {/* Issued Books */}

                {student.issues &&
                  student.issues.length > 0 && (

                    <div className="mt-6">

                      <h3 className="text-xl font-semibold mb-4">
                        Issued Books
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">

                        {student.issues.map(
                          (issue) => {

                            const dueDate =
                              new Date(
                                issue.dueDate
                              );

                            const today =
                              new Date();

                            const lateDays =
                              Math.max(
                                0,
                                Math.ceil(
                                  (
                                    today -
                                    dueDate
                                  ) /
                                  (
                                    1000 *
                                    60 *
                                    60 *
                                    24
                                  )
                                )
                              );

                            return (

                              <div
                                key={issue._id}
                                className="border rounded-2xl p-4 hover:shadow-lg duration-300"
                              >

                                <h4 className="font-semibold flex items-center gap-2">

                                  <FaBook className="text-blue-600" />

                                  {
                                    issue.bookId
                                      ?.title
                                  }

                                </h4>

                                <p className="mt-2 text-sm text-gray-600">
                                  Issue Date:
                                  {" "}
                                  {
                                    issue.issueDate
                                      ? new Date(
                                          issue.issueDate
                                        ).toLocaleDateString()
                                      : "-"
                                  }
                                </p>

                                <p className="text-sm text-gray-600">
                                  Due Date:
                                  {" "}
                                  {
                                    issue.dueDate
                                      ? new Date(
                                          issue.dueDate
                                        ).toLocaleDateString()
                                      : "-"
                                  }
                                </p>

                                <p className="mt-2 text-orange-600 font-medium">
                                  Days Late:
                                  {" "}
                                  {lateDays}
                                </p>

                                <p className="text-red-600 font-bold">
                                  Fine:
                                  {" "}
                                  ₹{lateDays * 5}
                                </p>

                                <button
                                  onClick={() =>
                                    returnBook(
                                      issue._id
                                    )
                                  }
                                  className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                                >
                                  <FaUndo />
                                  Return Book
                                </button>

                              </div>

                            );

                          }
                        )}

                      </div>

                    </div>

                  )}

              </div>

            ))}

        </div>

      </div>

    </div>

  );
}

export default Students;