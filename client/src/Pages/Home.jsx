import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=programming"
        );
        setBooks(response.data.items);
      } catch (error) {
        console.error("Error fetching books: ", error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.volumeInfo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Search Books by Category</h2>
      <input
        type="text"
        placeholder="Search by title"
        className="border p-2 mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        {filteredBooks.map((book) => (
          <div key={book.id} className="border p-4 rounded shadow-lg">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
              className="w-full h-auto mb-2"
            />
            <h3 className="text-lg font-semibold">{book.volumeInfo.title}</h3>
            <p className="text-sm">{book.volumeInfo.authors?.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
