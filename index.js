const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const app = express();
const corsOption = {
  origin: ["http://localhost:5173"],
  Credential: true,
  optionSucccessStatus: 200,
};
app.use(cors(corsOption));
app.use(express.json());
//mongodb
const { MongoClient, ServerApiVersion } = require("mongodb");

/* -==================MONGODB======================= */

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.phei2xm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    /* collection */

    const jobCollection = client.db("Freelancing-job").collection("job");
    const bidsCollectino = client.db("Freelancing-job").collection("bids");

    /* ===================================================================================== */

    /* get all job data */
    app.get("/job", async (req, res) => {
      const result = await jobCollection.find().toArray();
      res.send(result);
    });

    /* ========================================================================================== */
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

/* -===================================================================== */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
