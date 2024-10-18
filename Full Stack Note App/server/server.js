import express from "express";
import 'dotenv/config';
import connectDB from "./config/db.js";
import notesRoute from "./routes/notesRoute.js"

const app = express();
connectDB();

app.use(express.json());

app.use("/api/note", notesRoute);

app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})