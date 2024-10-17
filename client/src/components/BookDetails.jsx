import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );

        // Check if the book is found
        if (response.data) {
          setBook(response.data);
        } else {
          setError("Book not found.");
        }
      } catch (error) {
        console.error("Error fetching book details: ", error);
        setError("An error occurred while fetching the book details.");
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchBookDetails();
  }, [id]);

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  // If the book is not found, display a message
  if (!book) return <div>Book not found.</div>;

  const { volumeInfo } = book;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{volumeInfo.title}</h1>
      {volumeInfo.imageLinks && (
        <img
          src={volumeInfo.imageLinks.thumbnail}
          alt={volumeInfo.title}
          className="mb-4"
        />
      )}
      <p>
        <strong>Author:</strong> {volumeInfo.authors?.join(", ") || "Unknown"}
      </p>
      <p>
        <strong>Published Year:</strong> {volumeInfo.publishedDate || "Unknown"}
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
