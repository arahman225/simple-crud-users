const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;




// middleware 

app.use(cors())
app.use(express.json())



// root file

app.get('/', (req, res) => {
  res.send('Simple crud user running')
})


// mongo db set up



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2cslr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const coffeesCollections = client.db("CoffeesDB").collection("coffees2");
    const usersCollections = client.db("CoffeesDB").collection("users2");

    // POST 

    app.post('/coffees', async (req, res) => {
      const coffee = req.body;
      const result = await coffeesCollections.insertOne(coffee);
      res.send(result)
    })

    // get 
    app.get('/coffees', async (req, res) => {
      const cursor = coffeesCollections.find();
      const result = await cursor.toArray();
      res.send(result)
    })


    // delete 
    app.delete('/coffees/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeesCollections.deleteOne(query);
      res.send(result)
    })


    // update using put

    app.put('/coffees/:id', async (req, res) => {
      const id = req.params.id;
      const coffee = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateCoffee = {
        $set: {
          name: coffee.name,
          price: coffee.price
        },
      };
      const result = await coffeesCollections.updateOne(filter, updateCoffee, options);
      res.send(result)
    })


    // get what updated 

    app.get('/coffees/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeesCollections.findOne(query);
      res.send(result)
    })


    // users---------------------------------start---------------------------------

    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await usersCollections.insertOne(user)
      res.send(result)
    })

    // get for user
    app.get('/users', async (req, res) => {
      const user = usersCollections.find()
      const result = await user.toArray(user)
      res.send(result)
    })

    // user delete 

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollections.deleteOne(query);
      res.send(result)
    })

    // user update get
    app.patch('/users/:email', async (req, res) => {
      const email = req.params.email;
      // const user = req.body;
      const filter = { email };
    
      const updateUser = {
        $set: {
          lastLoginTime:req.body?.lastLoginTime
        },
      };
      const result = await usersCollections.updateOne(filter, updateUser);
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






// listen 

app.listen(port, () => {
  console.log(`Simple crud running on the port ${port}`)
})