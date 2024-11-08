require('dotenv').config(); // Load .env variables
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
        const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
        await client.connect();
        console.log('✅ Connected to MongoDB Atlas');

        // Connect to the specified database
        db = client.db('POOSDLarge');

        // List and print all collections in the database
        const collections = await db.listCollections().toArray();
        console.log('Available Collections:');
        collections.forEach(collection => console.log(`- ${collection.name}`));
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

connectToDatabase();

let cardList = [
    'Roy Campanella', 'Paul Molitor', 'Tony Gwynn', 'Dennis Eckersley',
    'Reggie Jackson', 'Gaylord Perry', 'Buck Leonard', 'Rollie Fingers'
];

app.post('/api/addcard', async (req, res) => {
    const { card } = req.body;
    try {
        const result = await db.collection('cards').insertOne({ card });
        cardList.push(card);
        res.status(200).json({ message: 'Card added successfully', cardList, insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add card' });
    }
});

app.post('/api/searchcards', async (req, res) => {
    const { search } = req.body;
    try {
        const _search = search.toLowerCase().trim();
        const results = await db.collection('cards').find({ card: { $regex: _search, $options: 'i' } }).toArray();
        res.status(200).json({ results });
    } catch (error) {
        res.status(500).json({ error: 'Failed to search cards' });
    }
});

app.post('/api/login', (req, res) => {
    const { login, password } = req.body;
    if (login.toLowerCase() === 'bob' && password === 'COP4331') {
        return res.status(200).json({ id: 1, firstName: 'Bob', lastName: 'Roberts' });
    }
    return res.status(401).json({ error: 'Invalid username/password' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
