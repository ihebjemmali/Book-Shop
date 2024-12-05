import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DeleteBook = () => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/book/books/${id}`
        );
        setBook(response.data);
      } catch (err) {
        setError("Failed to fetch book details. Please try again.");
        console.error("Error fetching book:", err);
      }
    };
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3004/book/books/${id}`);
      navigate("/home");
    } catch (err) {
      setError("Failed to delete book. Please try again.");
      console.error("Error deleting book:", err);
    }
  };

  if (!book) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="bg-book-background min-h-screen p-8">
      <div className="max-w-md mx-auto book-card">
        <h1 className="text-3xl font-bold text-book-primary mb-6">
          Delete Book
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-book-secondary mb-2">
            {book.title}
          </h2>
          <p className="text-book-text mb-2">by {book.author}</p>
          <p className="text-book-text mb-4">{book.description}</p>
          <p className="text-book-accent font-semibold">
            Price: ${parseFloat(book.price).toFixed(2)}
          </p>
        </div>
        <p className="text-red-500 font-semibold mb-4">
          Are you sure you want to delete this book?
        </p>
        <div className="flex justify-between">
          <button
            onClick={handleDelete}
            className="btn-secondary bg-red-500 hover:bg-red-600"
          >
            Delete Book
          </button>
          <button onClick={() => navigate("/home")} className="btn-primary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
