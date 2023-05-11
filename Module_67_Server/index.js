const express = require('express')
var cors = require('cors')
var app = express()
const { MongoClient, ServerApiVersion,ObjectId} = require('mongodb');

const port = process.env.PORT || 2000;

app.use(cors())

app.use(express.json());
//start view code
const uri = "mongodb+srv://tasniaarhamarham:4F2efmTK4HhPOkCr@cluster0.ioy1chb.mongodb.net/?retryWrites=true&w=majority";

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
    // Send a ping to confirm a successful connection
    const database = client.db("insertDB");

    const haiku = database.collection("haiku");
    app.delete('/user/:id',async(req,res)=>{
        const id=req.params.id;
        console.log("get deleteid",id);
        const query = { _id:new ObjectId(id)};

        const result = await haiku.deleteOne(query);

    })
    app.get('/user',async(req,res)=>{
const cursor=haiku.find();
const data=await cursor.toArray();
res.send(data);
    })
    app.post('/user',async(req,res)=>{
        const user=req.body;
        console.log("connect user",user);
        const result = await haiku.insertOne(user);
        res.send(result);

    })
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