const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
      const bookingCollection = db.collection('bookings')
    
      
      app.post("/facilities", async (req, res) => {
        const facilityData = req.body;
        console.log(facilityData);
        const result = await facilityCollection.insertOne(facilityData);
        res.send(result);
      });

    app.get('/facilities', async (req, res) => {
        const result = await facilityCollection.find().toArray()
          res.send(result)
    })
    
    app.get("/facilities/:id", async (req, res) => {
      const id = req.params.id;
      const result = await facilityCollection.findOne({
        _id: new ObjectId(id),
      });
      
      res.send(result)
    });


    app.post('/bookings', async (req, res) => {
      const bookingData = req.body;
      console.log(bookingData)

      const result = await bookingCollection.insertOne(bookingData)

      res.send(result)
    })


   app.get("/bookings", async (req, res) => {
     const result = await bookingCollection.find().toArray();
     console.log(result);
     res.send(result);
   });



    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running fine!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});