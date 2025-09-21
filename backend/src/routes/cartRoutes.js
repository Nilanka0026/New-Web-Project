import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart
} from "../controllers/cartController.js";

const router = express.Router();

// get cart for a user
router.get("/:userId", getCart);

// add item to cart
router.post("/", addToCart);

// remove item from cart
router.delete("/", removeFromCart);

export default router;
