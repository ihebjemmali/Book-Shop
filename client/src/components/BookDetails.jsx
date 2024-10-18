import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams(); // Use 'id' as per the route definition
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/book/books/${id}` // Use 'id'
        );
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching book details");
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]); // Use 'id'

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      {book && (
        <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-lg max-w-md w-full">
          {" "}
          {/* Set max width */}
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-64 object-cover mb-4 rounded-lg"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {book.title}
          </h2>
          <p className="text-gray-600 mb-4">{book.description}</p>
          <span className="text-lg font-semibold text-gray-900">
            ${book.price}
          </span>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
