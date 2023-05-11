const express = require('express')
var cors = require('cors')
var app = express()
const { MongoClient, ServerApiVersion,ObjectId} = require('mongodb');
const port = process.env.PORT || 2300;

app.use(cors())

app.use(express.json());
//start view code


const uri = "mongodb+srv://tasniauser:ZjcePuca0FaoDG6V@cluster0.ioy1chb.mongodb.net/?retryWrites=true&w=majority";

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
    const databasecollection = client.db("Another").collection("userCollection");
    app.put('/user/:id',async(req,res)=>{
        const id=req.params.id;
        const myobj=req.body;
console.log(id);
        const filter = { _id:new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {

            $set: {
      
         name:myobj.name,
         email:myobj.email
      
            },
      
          };

          const result = await databasecollection.updateOne(filter, updateDoc, options);
          res.send(result);

    })
    app.get('/user/:id',async(req,res)=>{
        const id=req.params.id;
        const query = { _id:new ObjectId(id) };    
        const movie = await databasecollection.findOne(query);
        res.send(movie);
    })
    app.delete('/user/:id',async(req,res)=>{
        const id=req.params.id;
        console.log("id",id);
        const query = { _id:new ObjectId(id) };

        const result = await databasecollection.deleteOne(query);
        res.send(result);
    })
    app.get('/user',async(req,res)=>{
        const cursor = databasecollection.find();
        const dataall=await cursor.toArray();
        console.log(dataall);
        res.send(dataall);
    })
  
    app.post('/user',async(req,res)=>{
        const newuser=req.body;
        console.log(newuser);
        const result = await databasecollection.insertOne(newuser);
        res.send(result);
        console.log(result);
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

//end view code
app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})