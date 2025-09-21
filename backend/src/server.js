import express from "express"
import { connectDB } from "./config/db.js";

import testRoutes from "./routes/testRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import itemRoutes from "./routes/itemRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"

const app = express()



app.use(express.json());

app.use("/api/notes", testRoutes);
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/carts", cartRoutes); //middelware

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});





//mongodb+srv://nilankaofficial2001_db_user:35SCCJGjxqBsWozY@cluster0.skbcrvg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0