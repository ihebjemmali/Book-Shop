const express = require("express");
const {
  getCartItems,
  addToCart,
  removeFromCart,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/cart", getCartItems);
router.post("/cart", addToCart);
router.delete("/cart/:id", removeFromCart);

module.exports = router;
