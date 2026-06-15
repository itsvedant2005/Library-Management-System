import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBook,
  FaSearch
} from "react-icons/fa";

import API from "../services/api";
import Navbar from "../components/Navbar";

function Books() {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchBooks = async () => {

    try {

      const res =
        await API.get("/books");

      setBooks(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const requestBook = async (bookId) => {

    try {

      await API.post(
        "/issues/request",
        { bookId },
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      toast.success("Book Requested Successfully");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Request Failed"
      );

    }
  };


  
  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar role="student" />

      <div className="p-8">

        {/* Banner */}

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl p-8 shadow-xl mb-8">

          <h1 className="text-4xl font-bold">
            Library Catalog
          </h1>

          <p className="mt-3 text-lg">
            Discover and request books.
          </p>

        </div>

        {/* Search */}

        <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 mb-6">

          <FaSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full outline-none"
          />

        </div>

        {/* Filter Buttons */}

        <div className="flex gap-3 mb-8 flex-wrap">

          <button
            onClick={() =>
              setFilter("all")
            }
            className={
              filter === "all"
                ? "bg-blue-600 text-white px-5 py-2 rounded-xl"
                : "bg-white px-5 py-2 rounded-xl shadow"
            }
          >
            All Books
          </button>

          <button
            onClick={() =>
              setFilter("available")
            }
            className={
              filter === "available"
                ? "bg-green-600 text-white px-5 py-2 rounded-xl"
                : "bg-white px-5 py-2 rounded-xl shadow"
            }
          >
            Available
          </button>

          <button
            onClick={() =>
              setFilter("outofstock")
            }
            className={
              filter === "outofstock"
                ? "bg-red-600 text-white px-5 py-2 rounded-xl"
                : "bg-white px-5 py-2 rounded-xl shadow"
            }
          >
            Out Of Stock
          </button>

        </div>

        {/* Books Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {books

            .filter((book) => {

              const matchesSearch =

                book.title
                  ?.toLowerCase()
                  .includes(
                    search.toLowerCase()
                  ) ||

                book.author
                  ?.toLowerCase()
                  .includes(
                    search.toLowerCase()
                  ) ||

                book.category
                  ?.toLowerCase()
                  .includes(
                    search.toLowerCase()
                  ) ||

                book.isbn
                  ?.toLowerCase()
                  .includes(
                    search.toLowerCase()
                  );

              const matchesFilter =

                filter === "all" ||

                (
                  filter === "available" &&
                  book.availableCopies > 0
                ) ||

                (
                  filter === "outofstock" &&
                  book.availableCopies === 0
                );

              return (
                matchesSearch &&
                matchesFilter
              );

            })

            .map((book) => (

              <div
                key={book._id}
                className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 duration-300"
              >

                <div
  className={`h-52 flex items-center justify-center
  ${
    book.category?.toLowerCase().includes("java")
      ? "bg-gradient-to-r from-orange-500 to-red-500"
      : book.category?.toLowerCase().includes("math")
      ? "bg-gradient-to-r from-blue-600 to-cyan-500"
      : book.category?.toLowerCase().includes("biology")
      ? "bg-gradient-to-r from-green-500 to-emerald-700"
      : book.category?.toLowerCase().includes("mechanical")
      ? "bg-gradient-to-r from-gray-600 to-slate-800"
      : "bg-gradient-to-r from-purple-600 to-indigo-700"
  }`}
>

  <h1 className="text-4xl font-bold text-white text-center px-4">
    {book.title}
  </h1>

</div>

                <FaBook
                  className="text-5xl text-blue-600 mb-4"
                />

                <h2 className="text-2xl font-bold">
                  {book.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  Author:
                  {" "}
                  {book.author}
                </p>

                <p className="text-gray-600">
                  Category:
                  {" "}
                  {book.category}
                </p>

                <p className="text-gray-600">
                  ISBN:
                  {" "}
                  {book.isbn}
                </p>

                <div className="mt-4">

                  {book.availableCopies > 0 ? (

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      Available:
                      {" "}
                      {book.availableCopies}
                    </span>

                  ) : (

                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                      Out Of Stock
                    </span>

                  )}

                </div>

                <button
                  disabled={
                    book.availableCopies === 0
                  }
                  onClick={() =>
                    requestBook(
                      book._id
                    )
                  }
                  className={`mt-5 px-5 py-2 rounded-xl text-white ${
                    book.availableCopies === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {
                    book.availableCopies === 0
                      ? "Out Of Stock"
                      : "Request Book"
                  }
                </button>

              </div>

            ))}

        </div>

      </div>

    </div>
  );
}

export default Books;