import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    price: "0",
    image: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/book/books/${id}`
        );
        setBook({
          title: response.data.title || "",
          author: response.data.author || "",
          description: response.data.description || "",
          price: response.data.price?.toString() || "0",
          image: response.data.image || "",
        });
      } catch (err) {
        setError("Failed to fetch book details. Please try again.");
        console.error("Error fetching book:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookToUpdate = {
        ...book,
        price: parseFloat(book.price),
      };
      await axios.put(`http://localhost:3004/book/books/${id}`, bookToUpdate);
      navigate("/home");
    } catch (err) {
      setError("Failed to update book. Please try again.");
      console.error("Error updating book:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-book-background min-h-screen p-8 flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-book-background min-h-screen p-8">
      <div className="max-w-md mx-auto book-card">
        <h1 className="text-3xl font-bold text-book-primary mb-6">
          Update Book
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-book-text mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
              className="input-field w-full"
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-book-text mb-1">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={book.author}
              onChange={handleChange}
              required
              className="input-field w-full"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-book-text mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={book.description}
              onChange={handleChange}
              required
              className="input-field w-full h-32"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-book-text mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={book.price}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              className="input-field w-full"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-book-text mb-1">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={book.image}
              onChange={handleChange}
              required
              className="input-field w-full"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
