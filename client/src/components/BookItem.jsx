import React from "react";
import { Link } from "react-router-dom";

const BookItem = ({ book }) => {
  const { id, volumeInfo } = book;

  return (
    <div className="border p-4 rounded shadow-lg">
      <img
        src={
          volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"
        }
        alt={volumeInfo.title}
        className="w-full h-auto mb-2"
      />
      <h3 className="text-lg font-semibold">
        <Link to={`/book/${id}`}>{volumeInfo.title}</Link>
      </h3>
      <p className="text-sm">{volumeInfo.authors?.join(", ")}</p>
    </div>
  );
};

export default BookItem;
