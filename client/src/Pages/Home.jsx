import { useEffect, useState } from "react";
import axios from "axios";
import BookItem from "../components/BookItem";
import { useNavigate, Link } from "react-router-dom";

const Home = ({ addToCart }) => {
  const [books, setBooks] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3004/book/books");
        setBooks(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error("Error fetching books: ", error);
        setError("Failed to fetch books. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleCreateCart = async (bookId) => {
    try {
      const response = await axios.get(
        `http://localhost:3004/book/books/${bookId}`
      );
      const book = response.data;

      if (!book) {
        throw new Error("Book not found");
      }

      const cartItem = await axios.post("http://localhost:3004/api/cart", {
        bookId: book._id,
        quantity: 1,
      });

      addToCart(cartItem.data);
    } catch (error) {
      console.error("Error creating cart", error);
      setError("Failed to add book to cart. Please try again.");
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filteredBooks);
  };

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="bg-book-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-book-primary mb-8 text-shadow">
          Discover Your Next Favorite Book
        </h1>

        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search by title"
            className="input-field w-full"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="mb-8 flex justify-center">
          <Link to="/add-book" className="btn-primary mr-4">
            Add New Book
          </Link>
        </div>

        {isLoading && (
          <div className="text-center text-book-secondary">
            <p className="text-xl">Loading books...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500">
            <p className="text-xl">{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {filteredItems.length === 0 ? (
              <p className="text-center text-book-text text-xl">
                No books found. Try a different search term.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems.map((book) => (
                  <BookItem
                    key={book._id}
                    book={book}
                    onAddToCart={handleCreateCart}
                    onClick={() => handleBookClick(book._id)}
                    onUpdate={() => navigate(`/update-book/${book._id}`)}
                    onDelete={() => navigate(`/delete-book/${book._id}`)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
