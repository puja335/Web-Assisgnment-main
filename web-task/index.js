
const express = require("express")
const userRoutes = require("./src/routes/user-routes")

require("dotenv").config()
const connectDB = require("./src/database/db")

const app = express()

app.use(express.json())
app.use("/api/users", userRoutes)

const PORT = 5000

connectDB()

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`)
})
