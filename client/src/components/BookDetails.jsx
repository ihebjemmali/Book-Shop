import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy Data for Testing
  const booksData = [
    {
      id: "670f89f07f37e76d2e816d92",
      title: "The Great Gatsby",
      imageURL: "https://via.placeholder.com/150",
      description: "A novel written by American author F. Scott Fitzgerald.",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      pdfLink: "https://example.com/pdf/the-great-gatsby",
      publishedYear: 1925,
      price: 15.99,
    },
    // Add more dummy books here
  ];

  useEffect(() => {
    const fetchBookDetails = () => {
      const bookDetails = booksData.find((book) => book.id === id);
      setBook(bookDetails);
      setLoading(false);
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.imageURL} alt={book.title} />
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>
      <p>
        <strong>Published Year:</strong> {book.publishedYear}
      </p>
      <p>
        <strong>Price:</strong> ${book.price.toFixed(2)}
      </p>
      <a href={book.pdfLink} target="_blank" rel="noopener noreferrer">
        Read PDF
      </a>
    </div>
  );
};

export default BookDetails;
