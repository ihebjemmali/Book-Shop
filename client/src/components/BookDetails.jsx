import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams(); // Get book ID from route params
  const [book, setBook] = useState(null); // Store book details
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(""); // Track errors

  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((res) => setBook(res.data))
      .catch(() => setError("Error fetching book details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Book not found.</p>;

  const { volumeInfo } = book;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{volumeInfo.title}</h1>
      {volumeInfo.imageLinks?.thumbnail && (
        <img
          src={volumeInfo.imageLinks.thumbnail}
          alt={volumeInfo.title}
          className="mb-4 w-64 object-cover"
        />
      )}
      <p>
        <strong>Author:</strong> {volumeInfo.authors?.join(", ") || "Unknown"}
      </p>
      <p>
        <strong>Published:</strong> {volumeInfo.publishedDate || "Unknown"}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {volumeInfo.description || "No description available."}
      </p>
      <a
        href={volumeInfo.previewLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Preview Book
      </a>
    </div>
  );
};

export default BookDetails;
