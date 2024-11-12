require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let db, usersCollection, workoutCollection, healthInfoCollection;

async function connectToDatabase() {
    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        console.log('Connected to MongoDB Atlas');

        db = client.db('POOSDLarge');
        usersCollection = db.collection('Users');
        workoutCollection = db.collection('Workout');
        healthInfoCollection = db.collection('HealthInfo');

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

app.get('/api/users', async (req, res) => {
    try {
        // Fetch all documents from the "users" collection
        const users = await usersCollection.find({}).toArray();
        
        console.log('All users:', users); // Print all users to the console
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Add Workout Entry
app.post('/api/addWorkout', async (req, res) => {
    const { dateString, Text, MuscleGroup, UserID } = req.body;
    try {
        await workoutCollection.insertOne({
            Date: new Date(dateString),
            Text,
            MuscleGroup,
            UserID: new Number(UserID)
        });
        res.status(200).json({ message: 'Workout entry added successfully' });
    } catch (error) {
        console.error('Error adding workout entry:', error);
        res.status(500).json({ error: 'Failed to add workout entry' });
    }
});

// Edit Workout
app.patch('/api/editWorkout/:id', async (req, res) => {
    const { id } = req.params;
    const { dateString, Text, MuscleGroup } = req.body;
    try {
        const result = await workoutCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { Date: new Date(dateString), Text, MuscleGroup } }
        );
        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'Workout entry updated successfully' });
        } else {
            res.status(404).json({ error: 'Workout entry not found' });
        }
    } catch (error) {
        console.error('Error updating workout entry:', error);
        res.status(500).json({ error: 'Failed to update workout entry' });
    }
});

// Delete Workout
app.delete('/api/deleteWorkout/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await workoutCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Workout entry deleted successfully' });
        } else {
            res.status(404).json({ error: 'Workout entry not found' });
        }
    } catch (error) {
        console.error('Error deleting workout entry:', error);
        res.status(500).json({ error: 'Failed to delete workout entry' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});