import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello from MERN stack!');
// });

app.use("/", records);

// start the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

