const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); 
const port = process.env.PORT || 5000;
const app = express();
require('dotenv').config()

const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jpgna.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        
        const database= client.db('foodPoint');
        const restaurantsCollection = database.collection('restaurants');
        const foodsCollection = database.collection('foods');
        const ordersCollection = database.collection('orders');

        // GET API
        app.get('/restaurants', async (req, res) => {
            const cursor = restaurantsCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/foods', async (req, res) => {
            const cursor = foodsCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/orders', async (req, res) => {
            const cursor = ordersCollection.find({});
            const result = await cursor.toArray();
            // console.log(result);
            res.send(result);
        });

        app.get('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await ordersCollection.findOne(query);
            console.log(result);
            res.send(result);
        });

        // POST API
        app.post('/orders', async(req, res) => {
            const order = req.body;
            const result = await ordersCollection.insertOne(order);
            console.log(result);
            res.send(result);
        });

        // DELETE API
        app.delete('/orders/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await ordersCollection.deleteOne(query);
            console.log(result)
            res.json(result)
        })

    }
    finally{
        // await client.close();
    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello, from the node.');
});

app.listen(port, () => {
    console.log("listening to the port", port);
});