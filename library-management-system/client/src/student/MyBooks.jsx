import { useEffect, useState } from "react";

import {
  FaBook,
  FaCalendarAlt,
  FaMoneyBill,
  FaExclamationTriangle
} from "react-icons/fa";

import toast from "react-hot-toast";

import API from "../services/api";
import Navbar from "../components/Navbar";

function MyBooks() {

  const [books, setBooks] =
    useState([]);

  const fetchBooks = async () => {

    try {

      const res =
        await API.get(
          "/issues/my-books",
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

      setBooks(res.data);

    } catch (error) {

      toast.error(
        "Failed to fetch issued books"
      );

    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar role="student" />

      <div className="p-8">

        {/* Header */}

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl p-8 shadow-xl mb-8">

          <h1 className="text-4xl font-bold">
            My Books
          </h1>

          <p className="mt-3 text-lg">
            Track issued books, due dates and fines.
          </p>

        </div>

        {books.length === 0 ? (

          <div className="bg-white rounded-3xl p-10 text-center shadow-lg">

            <h2 className="text-2xl font-semibold text-gray-600">
              No Books Issued Yet
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
                    Author
                  </th>

                  <th className="p-4 text-left">
                    Category
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Issue Date
                  </th>

                  <th className="p-4 text-left">
                    Due Date
                  </th>

                  <th className="p-4 text-left">
                    Fine
                  </th>

                  <th className="p-4 text-left">
                    Alert
                  </th>

                </tr>

              </thead>

              <tbody>

                {books.map((book) => {

                  const today =
                    new Date();

                  const dueDate =
                    new Date(
                      book.dueDate
                    );

                  const daysLeft =
                    Math.ceil(
                      (
                        dueDate -
                        today
                      ) /
                      (
                        1000 *
                        60 *
                        60 *
                        24
                      )
                    );

                  return (

                    <tr
                      key={book._id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <FaBook className="text-blue-600" />

                          {book.bookId?.title}

                        </div>

                      </td>

                      <td className="p-4">
                        {book.bookId?.author}
                      </td>

                      <td className="p-4">
                        {book.bookId?.category}
                      </td>

                      <td className="p-4">

                        <span
                          className={
                            book.status === "Issued"
                              ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                              : "bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                          }
                        >
                          {book.status}
                        </span>

                      </td>

                      <td className="p-4">

                        <div className="flex items-center gap-2">

                          <FaCalendarAlt />

                          {
                            book.issueDate
                              ? new Date(
                                  book.issueDate
                                ).toLocaleDateString()
                              : "-"
                          }

                        </div>

                      </td>

                      <td className="p-4">

                        <div className="flex items-center gap-2">

                          <FaCalendarAlt />

                          {
                            book.dueDate
                              ? new Date(
                                  book.dueDate
                                ).toLocaleDateString()
                              : "-"
                          }

                        </div>

                      </td>

                      <td className="p-4">

                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full flex items-center gap-2 w-fit">

                          <FaMoneyBill />

                          ₹{book.fine || 0}

                        </span>

                      </td>

                      <td className="p-4">

                        {daysLeft < 0 ? (

                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full flex items-center gap-2 w-fit">

                            <FaExclamationTriangle />

                            Overdue by {Math.abs(daysLeft)} days

                          </span>

                        ) : daysLeft <= 2 ? (

                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full flex items-center gap-2 w-fit">

                            <FaExclamationTriangle />

                            Due in {daysLeft} day{daysLeft !== 1 ? "s" : ""}

                          </span>

                        ) : (

                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                            On Time

                          </span>

                        )}

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );
}

export default MyBooks;