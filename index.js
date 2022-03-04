const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb'); 
const port = process.env.PORT || 5000;
const app = express();
require('dotenv').config()

const cors = require('cors');


// db:foodPoint
//pass:JYh9krCt2WlRhBmV

// middleware
// app.use(cors());
// app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jpgna.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();
        
        const database= client.db('foodPoint');
        const restaurantsCollection = database.collection('restaurants');

        // GET API
        app.get('/restaurants', async (req, res) => {
            const cursor = restaurantsCollection.find({});
            const result = await cursor.toArray();
            console.log(result);
            res.send(result);
        });
        // POST API
        // app.post('/restaurants', async(req, res) => {
        //     const 
        // })


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