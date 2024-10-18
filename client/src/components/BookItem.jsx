import React from "react";
import { useNavigate } from "react-router-dom";

const BookItem = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/books/${book.id}`);
  };

  // Get the image URL from the book data
  const imageUrl = book.volumeInfo?.imageLinks?.thumbnail;

  return (
    <div
      className="border rounded shadow p-4 cursor-pointer transition-transform duration-200 hover:scale-105 w-64" // Decreased the width of the box
      onClick={handleClick}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={book.volumeInfo.title}
          className="mb-2 w-48 h-60 object-cover rounded-md" // Set a fixed width and height for images
        />
      ) : (
        <div className="mb-2 w-48 h-60 bg-gray-200 flex items-center justify-center rounded-md">
          No Image Available
        </div>
      )}
      <h2 className="font-semibold text-lg">{book.volumeInfo.title}</h2>
      <p className="text-gray-600">{book.volumeInfo.authors?.join(", ")}</p>
    </div>
  );
};

export default BookItem;
