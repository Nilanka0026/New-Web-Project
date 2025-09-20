import express from "express"
import { getAllnotes,createNote,deleteNote,updateNote } from "../controllers/testControllers.js"
const router = express.Router()

router.get("/", getAllnotes)
router.post("/", createNote)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)


export default router;



