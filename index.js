require('dotenv').config()
const express = require('express')
const { MongoClient,
    ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// username:redux-database
//password:bOsec6YXvN5sVuNv

const uri = "mongodb+srv://redux-database:bOsec6YXvN5sVuNv@cluster1.umiyftz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

async function dbConnect() {
    try {
        await client.connect();
        console.log('database is connected');

    } catch (error) {
        console.log('database is not conneted');
    }
}

dbConnect()

const product = client.db('carProduct').collection('car')


app.delete("/car/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const query = { _id: new ObjectId(id) }
        console.log(query)
        const result = await product.deleteOne(query);
        console.log(result)
        res.send({
            status: true,
            message: "data send sucessful",
            data: result
        })
    }
    catch (error) {
        res.send({
            status: false,
            message: "data send failed",
            data: error
        })
    }
})
app.post('/addcar', async (req, res) => {
    try {
        const userdata = req.body;
        const result = await product.insertOne(userdata)
        console.log(result)
        res.send({
            status: true,
            message: "data send sucessful",
            data: result
        })


    } catch (error) {
        console.log(error);
    }
})

app.get('/allcar', async (req, res) => {
    try {
        const query = {}
        const cursor = await product.find(query).toArray();
        res.send({
            status: true,
            message: "data send sucessful",
            data: cursor
        })

    } catch (error) {
        console.log(error);
    }
})

app.get('/', (req, res) => {
    res.send("the server is runnig")
})
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})