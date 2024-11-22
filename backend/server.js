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
  // incoming: login, password
  // outgoing: id, firstName, lastName, error
  var error = "";
  const { login, password } = req.body;

  try {
    // Search for user's email
    const user = await db.collection("Users").findOne({ Email: login });
    if (!user) {
      error = "Invalid username";
      return res.status(400).json({ id: -1, name: "", error: error });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.Password);
    if (!passwordMatch) {
      error = "Incorrect password";
      return res.status(400).json({ id: -1, name: "", error: error });
    }

    // Login successful
    const ret = {
      id: user.ID,
      name: user.Name,
      error: "",
    };
    res.status(200).json(ret);
  } catch (err) {
    console.error("Error during login:", err);
    res
      .status(500)
      .json({ id: -1, name: "", error: "Oopsies we did a fucky wucky :3" });
  }
});

// Add Workout Entry
app.post("/api/addWorkout", async (req, res) => {
  const { dateString, Text, MuscleGroup, UserID } = req.body;
  try {
    await workoutCollection.insertOne({
      Date: new Date(dateString),
      Text,
      MuscleGroup,
      UserID: new Number(UserID),
    });
    res.status(200).json({ message: "Workout entry added successfully" });
  } catch (error) {
    console.error("Error adding workout entry:", error);
    res.status(500).json({ error: "Failed to add workout entry" });
  }
});

// Edit Workout
app.patch("/api/editWorkout/:id", async (req, res) => {
  const { id } = req.params;
  const { dateString, Text, MuscleGroup } = req.body;
  try {
    const result = await workoutCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { Date: new Date(dateString), Text, MuscleGroup } },
    );
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Workout entry updated successfully" });
    } else {
      res.status(404).json({ error: "Workout entry not found" });
    }
  } catch (error) {
    console.error("Error updating workout entry:", error);
    res.status(500).json({ error: "Failed to update workout entry" });
  }
});

// Delete Workout
app.delete("/api/deleteWorkout/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await workoutCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Workout entry deleted successfully" });
    } else {
      res.status(404).json({ error: "Workout entry not found" });
    }
  } catch (error) {
    console.error("Error deleting workout entry:", error);
    res.status(500).json({ error: "Failed to delete workout entry" });
  }
});

// User Signup
app.post("/api/signup", async (req, res) => {
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
  const idI = BigInt(req.params.id);
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
  // Get user ID to find which user to edit
  const userID = parseInt(req.params.id, 10);
  // Then get user's fields to edit
  const { email, phone, currentPassword, newPassword } = req.body;

  try {
    const user = await db.collection("Users").findOne({ ID: userID });
    // Fund user fielfs to update
    const thingsToUpdate = {
      ...(email && { Email: email }),
      ...(phone && { Phone: phone }),
    };

    // Check if nerw password is there but not old password
    if (!currentPassword && newPassword) {
      return res.status(400).json({ message: "Both passwords are required." });
    }

    // Only runs if both passwords are there
    if (currentPassword && newPassword) {
      // Check if current password is correct
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.Password,
      );
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect." });
      }
      // Hash and update password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      thingsToUpdate.Password = hashedPassword;
    }

    // Find user from ID and update
    const result = await db
      .collection("Users")
      .updateOne({ ID: userID }, { $set: thingsToUpdate });

    if (result.matchedCount == 0) {
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
