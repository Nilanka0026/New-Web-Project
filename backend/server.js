import express from "express"

const app = express()

app.get("/api/notes", (req, res) => {
  res.status(200).send("20 notes")
})

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000")
})