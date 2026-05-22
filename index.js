const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8000;
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`),
);

const verifyToken = async (req, res, next) => {
  const authHeader = req?.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const { payload } = await jwtVerify(token, JWKS);
    req.user = payload;
    next();
  } catch (error) {
    console.error("Token verify error:", error.message);
    return res.status(403).send({ message: "Forbidden" });
  }
};

async function run() {
  try {
    // await client.connect(); 

    const db = client.db("reserva");
    const facilityCollection = db.collection("facilities");
    const bookingCollection = db.collection("bookings");

    // ==================== FACILITY ROUTES ====================

    app.post("/facilities", verifyToken, async (req, res) => {
      const facilityData = req.body;
      const result = await facilityCollection.insertOne(facilityData);
      res.send(result);
    });

    // all facilities route
    app.get("/facilities", async (req, res) => {
      const result = await facilityCollection.find().toArray();
      res.send(result);
    });

    // individual route
    app.get("/facilities/author/:authorId", verifyToken, async (req, res) => {
      const authorId = req.params.authorId;
      const result = await facilityCollection
        .find({ authorId: authorId })
        .toArray();
      res.send(result);
    });

    // dynamic route
    app.get("/facilities/:id", async (req, res) => {
      const id = req.params.id;
      const result = await facilityCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.delete("/facilities/:id", async (req, res) => {
      const id = req.params.id;
      const result = await facilityCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.patch("/facilities/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const result = await facilityCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData },
      );
      res.send(result); 
    });

    // featured route
    app.get("/featured", async (req, res) => {
      const result = await facilityCollection.find().limit(6).toArray();
      res.send(result);
    });

    // ==================== BOOKING ROUTES ====================

    app.post("/bookings", verifyToken, async (req, res) => {
      const bookingData = req.body;
      const result = await bookingCollection.insertOne(bookingData);
      res.send(result);
    });

    app.get("/bookings", verifyToken, async (req, res) => {
      const result = await bookingCollection.find().toArray();
      res.send(result);
    });

    app.delete("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const result = await bookingCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    console.log("Connected to MongoDB!");
  } finally {
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
