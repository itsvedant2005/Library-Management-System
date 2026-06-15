import { useEffect, useState } from "react";

import {
  FaBook,
  FaSearch,
  FaTrash,
  FaPlus
} from "react-icons/fa";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Books() {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    quantity: ""
  });

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

  const addBook = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/books",
        form
      );

      fetchBooks();

      setForm({
        title: "",
        author: "",
        category: "",
        isbn: "",
        quantity: ""
      });

      toast.success("Book Added Successfully");

    } catch (error) {

      console.log(error);

    }
  };

  const deleteBook = async (id) => {

    try {

      await API.delete(
        `/books/${id}`
      );

      fetchBooks();

      toast.success("Book Deleted");

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar role="admin" />

      <div className="p-8">

        <h1 className="text-4xl font-bold text-slate-800 mb-6">
          📚 Books Management
        </h1>

        {/* Add Book Form */}

        <form
          onSubmit={addBook}
          className="bg-white p-6 rounded-3xl shadow-lg mb-8"
        >

          <h2 className="text-2xl font-semibold mb-4">
            Add New Book
          </h2>

          <div className="grid md:grid-cols-5 gap-4">

            <input
              className="border p-3 rounded-xl"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value
                })
              }
            />

            <input
              className="border p-3 rounded-xl"
              placeholder="Author"
              value={form.author}
              onChange={(e) =>
                setForm({
                  ...form,
                  author: e.target.value
                })
              }
            />

            <input
              className="border p-3 rounded-xl"
              placeholder="Category"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value
                })
              }
            />

            <input
              className="border p-3 rounded-xl"
              placeholder="ISBN"
              value={form.isbn}
              onChange={(e) =>
                setForm({
                  ...form,
                  isbn: e.target.value
                })
              }
            />

            <input
              className="border p-3 rounded-xl"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) =>
                setForm({
                  ...form,
                  quantity: e.target.value
                })
              }
            />

          </div>

          <button
            className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700"
          >
            <FaPlus />
            Add Book
          </button>

        </form>

        {/* Search */}

        <div className="bg-white p-4 rounded-2xl shadow-lg mb-8 flex items-center gap-3">

          <FaSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full outline-none"
          />

        </div>

        {/* Books Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {books

            .filter((book) =>

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
                )

            )

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

                <h2 className="text-2xl font-bold text-slate-800">
                  {book.title}
                </h2>

                <p className="mt-2 text-gray-600">
                  Author: {book.author}
                </p>

                <p className="text-gray-600">
                  Category: {book.category}
                </p>

                <p className="text-gray-600">
                  ISBN: {book.isbn}
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
                  onClick={() =>
                    deleteBook(
                      book._id
                    )
                  }
                  className="mt-5 bg-red-500 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-red-600"
                >
                  <FaTrash />
                  Delete
                </button>

              </div>

            ))}

        </div>

      </div>

    </div>

  );
}

export default Books;