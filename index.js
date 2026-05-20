const express = require('express')
const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 8000
const uri = process.env.MONGODB_URI;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
      await client.connect();
      
      const db = client.db('reserva')
      const facilityCollection = db.collection('facilities')
    
      app.get('/facilities', (req, res) => {
          res.send("all facilities will show here")
      })




    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running fine!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});