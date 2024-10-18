import { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:3004/api/cart");
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveBook = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:3004/api/cart/${cartItemId}`);
      setCart(cart.filter((item) => item._id !== cartItemId));
    } catch (error) {
      console.error("Error removing book from cart:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Your Cart
      </h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item) => {
            return (
              <div
                key={item._id}
                className="bg-white border border-gray-200 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={item.bookId.image}
                  alt={item.bookId.title}
                  className="w-full h-64 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.bookId.title}
                </h3>
                <p className="text-gray-600 mb-2">Quantity: {item.quantity}</p>
                <p className="text-lg font-semibold text-gray-900 mb-4">
                  Total Price: $
                  {(
                    parseFloat(item.bookId.price.split("$")[1]) * item.quantity
                  ).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemoveBook(item._id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                  Remove from Cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cart;
