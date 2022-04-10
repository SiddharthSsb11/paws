const express = require('express');
const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://sidssb11:merndating@cluster0.pzobw.mongodb.net/datingDB?retryWrites=true&w=majority'

const app = express();

const PORT = 5000;


app.get('/', (req, res) => {
    res.json('done done')
});

app.get('/users', async(req, res) => {

    const client = new MongoClient(uri);

    try{
        await client.connect();
        const database = client.db('datingDB');
        const users = database.collection('users');
        const returnedUsers = await users.find().toArray();
        //const returnedUsers = await users.find();
        res.json(returnedUsers); //res.send(returnedUsers);
    }finally{
        await client.close()
    }
    //res.json
})


app.post('/signup', (req, res) => {
    res.json ('done done')
});



app.listen(PORT, ()=> console.log("Server started on PORT 5000"));  