import express from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from "../controllers/itemControllers.js";

import { isAdmin } from "../middleware/adminCheck.js";


const router = express.Router();

router.get("/", getAllItems);
router.get("/:id", getItemById);

//router.post("/", createItem);
//router.put("/:id", updateItem);
//router.delete("/:id", deleteItem);



router.post("/", isAdmin, createItem);
router.put("/:id", isAdmin, updateItem);
router.delete("/:id", isAdmin, deleteItem);



export default router;
