import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details: ", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found.</div>;

  const { volumeInfo } = book;

  return (
    <div>
      <h1>{volumeInfo.title}</h1>
      <img
        src={volumeInfo.imageLinks?.thumbnail}
        alt={volumeInfo.title}
        className="mb-4"
      />
      <p>
        <strong>Author:</strong> {volumeInfo.authors?.join(", ")}
      </p>
      <p>
        <strong>Published Year:</strong> {volumeInfo.publishedDate}
      </p>
      <p>
        <strong>Description:</strong> {volumeInfo.description}
      </p>
      <a
        href={volumeInfo.previewLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        Preview Book
      </a>
    </div>
  );
};

export default BookDetails;
