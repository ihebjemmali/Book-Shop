import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ addToCart }) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5001/book/books");
        console.log("response", response);
        setBooks(response.data); // Set books in the frontend
      } catch (error) {
        console.error("Error fetching books: ", error);
      }
    };

    fetchBooks();
  }, []);

  const handleCreateCart = async (bookId) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/book/books/${bookId}`
      );
      const book = response.data;

      if (!book) {
        throw new Error("Book not found");
      }

      const cartItem = await axios.post(`http://localhost:5001/api/cart`, {
        bookId: book._id,
        quantity: 1,
      });

      addToCart(cartItem.data);
    } catch (error) {
      console.error("Error creating cart", error);
    }
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white border border-gray-200 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-64 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-4">{book.subtitle}</p>
            <span className="text-lg font-semibold text-gray-900">${book.price}</span>
            <button
              onClick={() => handleCreateCart(book._id)}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
