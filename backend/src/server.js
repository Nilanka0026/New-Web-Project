import express from "express"
import testRoutes from "./routes/testRoutes.js"

const app = express()

app.use("/api/notes", testRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000")
})