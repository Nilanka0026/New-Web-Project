import express from "express";
import { getAllUsers, addItem } from "../controllers/adminController.js";
import { isAdmin } from "../middleware/adminCheck.js";

const router = express.Router();

// GET users (admin only)
router.get("/users", isAdmin, getAllUsers);

// POST new item (admin only)
router.post("/items", isAdmin, addItem);

export default router;
