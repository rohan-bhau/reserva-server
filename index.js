const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Server is running fine!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});