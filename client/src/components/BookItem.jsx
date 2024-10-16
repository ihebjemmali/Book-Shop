import React from "react";

const BookItem = ({ title }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
};

export default BookItem;
