require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let db;

async function connectToDatabase() {
    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        console.log('Connected to MongoDB Atlas');

        db = client.db('POOSDLarge');

        const collections = await db.listCollections().toArray();
        console.log('Collections in POOSDLarge:');
        collections.forEach((collection) => {
            console.log(`- ${collection.name}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

connectToDatabase();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});
app.post('/api/addcard', async (req, res, next) => {
    // incoming: userId, color
    // outgoing: error
    var error = '';
    const { userId, card } = req.body;
    // TEMP FOR LOCAL TESTING.
    cardList.push(card);
    var ret = { error: error };
    res.status(200).json(ret);
});
app.post('/api/login', async (req, res, next) => {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
    var error = '';
    const { login, password } = req.body;
    var id = -1;
    var fn = '';
    var ln = '';
    if (login.toLowerCase() == 'bob' && password == 'COP4331') {
        id = 1;
        fn = 'Bob';
        ln = 'Roberts';
    }
    else {
        error = 'Invalid user name/password';
    }
    var ret = { id: id, firstName: fn, lastName: ln, error: error };
    res.status(200).json(ret);
});
app.post('/api/searchcards', async (req, res, next) => {
    // incoming: userId, search
    // outgoing: results[], error
    var error = '';
    const { userId, search } = req.body;
    var _search = search.toLowerCase().trim();
    var _ret = [];
    for (var i = 0; i < cardList.length; i++) {
        var lowerFromList = cardList[i].toLocaleLowerCase();
        if (lowerFromList.indexOf(_search) >= 0) {
            _ret.push(cardList[i]);
        }
    }
    var ret = { results: _ret, error: '' };
    res.status(200).json(ret);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});