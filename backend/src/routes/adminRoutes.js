import express from "express";
import {
  getAllUsers,
  getAllItems,
  addItem,
  deleteUser,
  deleteItem
} from "../controllers/adminController.js";
import { isAdmin } from "../middleware/adminCheck.js";

const router = express.Router();

// GET all users (admin only)
router.get("/users", isAdmin, getAllUsers);

// GET all items (admin only)
router.get("/items", isAdmin, getAllItems);

// POST new item (admin only)
router.post("/items", isAdmin, addItem);

// DELETE user (admin only)
router.delete("/users/:userId", isAdmin, deleteUser);

// DELETE item (admin only)
router.delete("/items/:itemId", isAdmin, deleteItem);

export default router;
