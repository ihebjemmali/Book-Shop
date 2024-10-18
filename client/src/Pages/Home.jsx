import { useEffect, useState } from "react";
import axios from "axios";
import BookItem from "../components/BookItem"; // Importing BookItem
import { useNavigate } from "react-router-dom";

const Home = ({ addToCart }) => {
  const [books, setBooks] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate(); // useNavigate for navigation

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3004/book/books");
        console.log("response", response);
        setBooks(response.data); // Set books in the frontend
        setFilteredItems(response.data);
      } catch (error) {
        console.error("Error fetching books: ", error);
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
    }
  };

  const handleSearch = (value) => {
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filteredBooks);
  };

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`); // Ensure the path is correct
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Search Books by Category
      </h2>

      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by title"
          className="border border-gray-300 rounded-lg p-3 mb-6 w-full shadow-sm focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((book) => (
          <BookItem
            key={book._id}
            book={book}
            onAddToCart={handleCreateCart} // Pass down the add to cart function
            onClick={() => handleBookClick(book._id)} // Pass down the click handler
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
