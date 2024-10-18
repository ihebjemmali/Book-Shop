import React from "react";

const BookItem = ({ book, onAddToCart, onClick }) => {
  return (
    <div
      key={book._id}
      className="bg-white border border-gray-200 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm w-full" // Adjust width here as well
    >
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-64 object-cover mb-4 rounded-lg cursor-pointer"
        onClick={onClick} // Trigger onClick when the image is clicked
      />
      <h3
        className="text-xl font-bold text-gray-800 mb-2 cursor-pointer"
        onClick={onClick} // Trigger onClick when the title is clicked
      >
        {book.title}
      </h3>
      {/* Removed description from here */}
      <span className="text-lg font-semibold text-gray-900">${book.price}</span>
      <button
        onClick={() => onAddToCart(book._id)}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default BookItem;
