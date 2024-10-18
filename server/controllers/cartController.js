const CartItem = require("../models/Cart");


const getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate("bookId");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  const { bookId, quantity } = req.body;
  try {
    // Find the book in the database using the bookId (which will now be the MongoDB _id)
    let cartItem = await CartItem.findOne({ bookId });

    if (cartItem) {
      // If the item already exists, update the quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Create a new cart item
      cartItem = new CartItem({ bookId, quantity });
      await cartItem.save();
    }

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await CartItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCartItems, addToCart, removeFromCart };
