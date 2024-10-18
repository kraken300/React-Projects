import express from "express";
const router = express.Router();
import { getNote, addNote, updateNote, deleteNote } from "../controller/noteController.js";

//Routes
// 1
// router.route("/").get(getNote);
// router.route("/addnote").post(addNote); 
// router.route("/updatenote/:id").put(updateNote); 
// router.route("/deletenote/:id").delete(deleteNote); 

// 2
router.get("/", getNote);
router.post("/addnote", addNote);
router.put("/updatenote/:id", updateNote);
router.delete("/deletenote/:id", deleteNote);

export default router;
