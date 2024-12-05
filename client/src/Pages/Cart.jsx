import { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3004/api/cart");
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to fetch cart items. Please try again later.");
      } finally {
        setIsLoading(false);
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
      setError("Failed to remove book from cart. Please try again.");
    }
  };

  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => {
        if (!item?.bookId?.price) return total;
        const price = parseFloat(item.bookId.price.replace("$", ""));
        return total + price * (item.quantity || 1);
      }, 0)
      .toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="bg-book-background min-h-screen flex items-center justify-center">
        <p className="text-book-primary text-xl font-semibold">
          Loading your cart...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-book-background min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-book-background min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-book-primary mb-8 text-shadow">
          Your Cart
        </h1>
        {cart.length === 0 ? (
          <p className="text-center text-book-text text-xl">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {cart.map((item) => {
                // Skip rendering if bookId is null or undefined
                if (!item?.bookId) return null;

                return (
                  <div
                    key={item._id}
                    className="book-card flex flex-col justify-between"
                  >
                    <div>
                      <img
                        src={item.bookId.image}
                        alt={item.bookId.title || "Book cover"}
                        className="w-full h-64 object-cover mb-4 rounded-t-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "fallback-image-url.jpg"; // Add a fallback image URL
                        }}
                      />
                      <h3 className="text-xl font-semibold text-book-primary mb-2">
                        {item.bookId.title || "Untitled Book"}
                      </h3>
                      <p className="text-book-text mb-2">
                        Quantity: {item.quantity || 1}
                      </p>
                      <p className="text-lg font-semibold text-book-secondary mb-4">
                        Total: $
                        {item.bookId.price
                          ? (
                              parseFloat(item.bookId.price.replace("$", "")) *
                              (item.quantity || 1)
                            ).toFixed(2)
                          : "0.00"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveBook(item._id)}
                      className="btn-secondary w-full"
                    >
                      Remove from Cart
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-book-primary mb-4">
                Total: ${calculateTotalPrice()}
              </p>
              <button className="btn-primary text-lg px-8 py-3">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
