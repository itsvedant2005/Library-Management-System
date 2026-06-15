import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import API from "../services/api";
import Navbar from "../components/Navbar";

function Fines() {

  const [books, setBooks] = useState([]);

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
        "Failed to fetch fines"
      );

    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const totalFine = books.reduce(
    (sum, book) =>
      sum + (book.fine || 0),
    0
  );

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar role="student" />

      <div className="p-8">

        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-3xl p-8 shadow-xl">

          <h1 className="text-4xl font-bold">
            Fine Details
          </h1>

          <p className="mt-2">
            Current Outstanding Fine
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold">
            Total Fine
          </h2>

          <h1 className="text-6xl text-red-600 mt-4">
            ₹{totalFine}
          </h1>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Fine Breakdown
          </h2>

          {books.map((book) => (

            <div
              key={book._id}
              className="flex justify-between border-b py-3"
            >

              <span>
                {book.bookId?.title}
              </span>

              <span>
                ₹{book.fine || 0}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Fines;