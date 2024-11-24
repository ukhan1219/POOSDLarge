require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let db,
  usersCollection,
  workoutCollection,
  healthInfoCollection,
  IDCounter = 1;

// Find the highest UserID and set IDCounter to the next highest one
async function initialiseIDCounter() {
  try {
    const highestID = await db
      .collection("Users")
      .find()
      .sort({ ID: -1 })
      .limit(1)
      .toArray();
    if (highestID.length > 0 && highestID[0].ID) {
      IDCounter = highestID[0].ID + 1;
    }
    console.log(`ID counter initialised to ${IDCounter}`);
  } catch (error) {
    console.error("Error initialising ID counter:", error);
  }
}

async function connectToDatabase() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    db = client.db("POOSDLarge");
    usersCollection = db.collection("Users");
    workoutCollection = db.collection("Workout");
    healthInfoCollection = db.collection("HealthInfo");

    const collections = await db.listCollections().toArray();
    console.log("Collections in POOSDLarge:");
    collections.forEach((collection) => {
      console.log(`- ${collection.name}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

connectToDatabase().then(initialiseIDCounter);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS",
  );
  next();
});
app.post("/api/login", async (req, res, next) => {
  const { login, password } = req.body;

  try {
    const user = await db.collection("Users").findOne({ Email: login });
    if (!user) {
      return res
        .status(400)
        .json({ id: -1, name: "", error: "Invalid username" });
    }

    const passwordMatch = await bcrypt.compare(password, user.Password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ id: -1, name: "", error: "Incorrect password" });
    }

    res.status(200).json({ id: user.ID, name: user.Name });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ id: -1, name: "", error: "Server error" });
  }
});

// Add Workout Entry
app.post("/api/addWorkout", async (req, res) => {
  const { dateString, Text, MuscleGroup, UserID } = req.body;
  try {
    const userIDInt = parseInt(UserID, 10);
    await workoutCollection.insertOne({
      Date: new Date(dateString),
      Text,
      MuscleGroup,
      UserID: userIDInt,
    });
    res.status(200).json({ message: "Workout entry added successfully" });
  } catch (error) {
    console.error("Error adding workout entry:", error);
    res.status(500).json({ error: "Failed to add workout entry" });
  }
});

// Edit Workout Entry
app.patch("/api/editWorkout", async (req, res) => {
  const { UserID, dateString, Text, MuscleGroup } = req.body;

  try {
    // Validate UserID exists in the Users collection
    const user = await usersCollection.findOne({ ID: parseInt(UserID, 10) });
    if (!user) {
      return res.status(400).json({ error: "Invalid UserID: User not found." });
    }

    const updates = {
      ...(dateString && { Date: new Date(dateString) }),
      ...(Text && { Text }),
      ...(MuscleGroup && { MuscleGroup }),
    };

    const result = await workoutCollection.updateMany(
      { UserID: parseInt(UserID, 10) },
      { $set: updates },
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Workout entries updated successfully" });
    } else {
      res
        .status(404)
        .json({ error: "No workout entries found for this UserID." });
    }
  } catch (error) {
    console.error("Error updating workout entry:", error);
    res.status(500).json({ error: "Failed to update workout entry" });
  }
});

// Delete Workout Entry
app.delete("/api/deleteWorkout", async (req, res) => {
  const { UserID } = req.body;

  try {
    // Validate UserID exists in the Users collection
    const user = await usersCollection.findOne({ ID: parseInt(UserID, 10) });
    if (!user) {
      return res.status(400).json({ error: "Invalid UserID: User not found." });
    }

    const result = await workoutCollection.deleteMany({
      UserID: parseInt(UserID, 10),
    });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Workout entries deleted successfully" });
    } else {
      res
        .status(404)
        .json({ error: "No workout entries found for this UserID." });
    }
  } catch (error) {
    console.error("Error deleting workout entry:", error);
    res.status(500).json({ error: "Failed to delete workout entry" });
  }
});

// Get Workout Info
app.get("/api/getWorkoutInfo", async (req, res) => {
  const { UserID } = req.query;

  try {
    // Validate UserID exists in the Users collection
    const user = await usersCollection.findOne({ ID: parseInt(UserID, 10) });
    if (!user) {
      return res.status(400).json({ error: "Invalid UserID: User not found." });
    }

    const workouts = await workoutCollection
      .find({ UserID: parseInt(UserID, 10) })
      .toArray();

    if (workouts.length > 0) {
      res.status(200).json(workouts);
    } else {
      res
        .status(404)
        .json({ error: "No workout entries found for this UserID." });
    }
  } catch (error) {
    console.error("Error fetching workout info:", error);
    res.status(500).json({ error: "Failed to fetch workout info" });
  }
});

// User Signup
app.post("/api/signup", async (req, res) => {
  initialiseIDCounter();
  try {
    const { name, email, password, phone } = req.body;

    // Check if the email is in use already
    const existingUser = await db.collection("Users").findOne({ Email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Prep for user creation
    const newID = IDCounter++;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      Name: name,
      Email: email,
      Password: hashedPassword,
      Phone: phone,
      ID: newID,
    };

    console.log("User Info:", newUser);

    // Insert user
    await db.collection("Users").insertOne(newUser);
    res.status(201).json({ message: "User Signup successful" });
  } catch (error) {
    console.error("Error during signup:", error);
    res
      .status(500)
      .json({ message: "Error during signup", error: error.message });
  }
});

//Inserts health info, or updates if already present
app.post("/api/HealthInfo/:id", async (req, res) => {
  const { id } = req.params;
  const { HeightCM, Weight, BMI } = req.body;
  const idI = parseInt(req.params.id, 10);
  var error = "";
  try {
    if (isNaN(parseFloat(HeightCM))) {
      throw new Error("Invalid Height");
    }
    if (isNaN(parseFloat(Weight))) {
      throw new Error("Invalid Weight");
    }
    if (isNaN(parseFloat(BMI))) {
      throw new Error("Invalid BMI");
    }

    const result = await db.collection("HealthInfo").updateOne(
      { UserID: idI },

      {
        $set: {
          HeightCM: parseFloat(HeightCM),
          Weight: parseFloat(Weight),
          BMI: parseFloat(BMI),
        },
      },
      { upsert: true },
    );
    if (result.matchedCount === 0 && result.upsertedCount === 0) {
      res
        .status(500)
        .json({ message: "Error with inserting/updating Health Info" });
    }
    res.status(200).json({ message: "Successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Edit user info, only changes the fields that have been filled out, leaves the rest of the fields alone, includes password changing iff current password is there and correct
app.put("/api/user/:id", async (req, res) => {
  const userID = parseInt(req.params.id, 10);
  const { email, currentPassword, newPassword } = req.body;

  try {
    const user = await usersCollection.findOne({ ID: userID });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Fields to update
    const updates = {};

    // Update email if provided
    if (email) {
      const emailExists = await usersCollection.findOne({ Email: email });
      if (emailExists && emailExists.ID !== userID) {
        return res.status(400).json({ message: "Email already in use." });
      }
      updates.Email = email;
    }

    // Update password if both current and new passwords are provided
    if (currentPassword && newPassword) {
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.Password,
      );
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect." });
      }
      updates.Password = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No updates provided." });
    }

    const result = await usersCollection.updateOne(
      { ID: userID },
      { $set: updates },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User successfully updated." });
  } catch (error) {
    console.error("Error while updating user:", error);
    res
      .status(500)
      .json({ message: "Error while updating user", error: error.message });
  }
});

//  Gets health info for a user
app.get("/api/gethealthinfo/:id", async (req, res) => {
  const userID = parseInt(req.params.id, 10); // Convert to int32
  console.log("Fetching health info for userID:", userID);

  try {
    const healthInfo = await healthInfoCollection.findOne({ UserID: userID });

    if (!healthInfo) {
      return res.status(404).json({ message: "Health information not found." });
    }

    res.status(200).json(healthInfo);
  } catch (error) {
    console.error("Error fetching health information:", error);
    res.status(500).json({ error: "Failed to fetch health information." });
  }
});

// Gets user info for a user
app.get("/api/getuser/:id", async (req, res) => {
  const userID = parseInt(req.params.id, 10); // Convert to int32
  console.log("Fetching user data for userID:", userID);

  try {
    const user = await usersCollection.findOne(
      { ID: userID },
      { projection: { Email: 1, Name: 1 } },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user." });
  }
});

app.get("/api/getHealthInfo/:id", async (req,res) => {

  const { id } = req.params;

  try {

    const BigUserID = BigInt(id);
    const user = await db.collection("Users").findOne({ ID: BigUserID });

    if(!user){
      return res.status(404).json({ Error: "No User"});
    }

    const healthInfo = await db.collection("HealthInfo").findOne({ UserID: BigUserID });

    if(!healthInfo){
      return res.status(200).json({ message: "Successful but HealthInfo is empty"});
    } else {
      return res.status(200).json({ HealthInfo: healthInfo });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

});