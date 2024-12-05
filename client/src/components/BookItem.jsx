import React from "react";

const BookItem = ({
  book,
  onAddToCart,
  onClick,
  onUpdate = () => {},
  onDelete = () => {},
}) => {
  return (
    <div className="book-card flex flex-col justify-between">
      <div>
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-64 object-cover mb-4 rounded-t-lg cursor-pointer"
          onClick={onClick}
        />
        <h3
          className="text-xl font-semibold text-book-primary mb-2 cursor-pointer hover:text-book-secondary transition-colors duration-300"
          onClick={onClick}
        >
          {book.title}
        </h3>
        <p className="text-book-text mb-2">{book.author}</p>
        <p className="text-lg font-semibold text-book-accent">
          ${parseFloat(book.price).toFixed(2)}
        </p>
      </div>
      <div className="mt-4 space-y-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(book._id);
          }}
          className="btn-primary w-full"
          aria-label={`Add ${book.title} to cart`}
        >
          Add to Cart
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onUpdate) onUpdate();
          }}
          className="btn-secondary w-full"
          aria-label={`Update ${book.title}`}
        >
          Update
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete();
          }}
          className="btn-secondary bg-red-500 hover:bg-red-600 w-full"
          aria-label={`Delete ${book.title}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookItem;
