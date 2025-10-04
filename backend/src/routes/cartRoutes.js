import express from "express";
import { getCart, addToCart, removeFromCart,updateCartQuantity } from "../controllers/cartController.js";

const router = express.Router();

// Get user's cart
router.get("/:userId", getCart);

// Add item to cart
router.post("/", addToCart);

// Remove item from cart
router.delete("/", removeFromCart);

router.patch("/", updateCartQuantity);

export default router;
