import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BookDetails = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/book/books/${id}`
        );
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError("Failed to fetch book details. Please try again later.");
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const cartItem = await axios.post("http://localhost:3004/api/cart", {
        bookId: book._id,
        quantity: 1,
      });
      addToCart(cartItem.data);
      // You might want to show a success message or navigate to the cart page
    } catch (error) {
      console.error("Error adding book to cart:", error);
      setError("Failed to add book to cart. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="bg-book-background min-h-screen flex items-center justify-center">
        <p className="text-book-primary text-xl font-semibold">
          Loading book details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-book-background min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 text-xl font-semibold mb-4">{error}</p>
        <button onClick={() => navigate(-1)} className="btn-secondary">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-book-background min-h-screen p-8 flex justify-center items-center">
      {book && (
        <div className="book-card max-w-2xl w-full">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                src={book.image}
                alt={book.title}
                className="h-48 w-full object-cover md:w-48 rounded-t-lg md:rounded-l-lg md:rounded-t-none"
              />
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-book-primary mb-2">
                {book.title}
              </h1>
              <p className="text-book-secondary mb-2">{book.author}</p>
              <p className="text-book-text mb-4">{book.description}</p>
              <p className="text-2xl font-semibold text-book-accent mb-4">
                ${parseFloat(book.price).toFixed(2)}
              </p>
              <div className="flex space-x-4">
                <button onClick={handleAddToCart} className="btn-primary">
                  Add to Cart
                </button>
                <button onClick={() => navigate(-1)} className="btn-secondary">
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
