import express from "express"
import testRoutes from "./routes/testRoutes.js"
import { connectDB } from "./config/db.js";

const app = express()

connectDB();

app.use(express.json());

app.use("/api/notes", testRoutes); //middelware

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000")
})



//mongodb+srv://nilankaofficial2001_db_user:35SCCJGjxqBsWozY@cluster0.skbcrvg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0