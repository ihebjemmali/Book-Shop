import React from "react";
import { useNavigate } from "react-router-dom";

const BookItem = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div className="border p-4 rounded shadow" onClick={handleClick}>
      <img
        src={book.imageURL}
        alt={book.title}
        className="mb-2 w-full h-40 object-cover"
      />
      <h2 className="font-semibold">{book.title}</h2>
      <p className="text-gray-600">{book.author}</p>
    </div>
  );
};

export default BookItem;
