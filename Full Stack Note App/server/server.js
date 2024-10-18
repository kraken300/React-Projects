import express from "express";
import 'dotenv/config';
import connectDB from "./config/db.js";
import notesRoute from "./routes/notesRoute.js";
const PORT = process.env.PORT || 5001;

const app = express();
connectDB();

app.use(express.json());

app.use("/api/note", notesRoute);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})