import Note from "../models/noteModel.js";

const getNote = ("/", async (req, res) => {

    try {
        const note = await Note.find({});
        if (note.length !== 0) {
            res.status(200).send(note);
        }
        else {
            res.status(404).send("Notes not found!");
        }
    }
    catch (error) {
        res.status(500).send("Internal server error", error.message);
    }
});

const addNote = ("/addnote", async (req, res) => {
    const { title, content } = req.body;
    const note = new Note({
        title, content
    });
    try {
        const addedNote = await note.save();
        res.status(201).send(addedNote);
    }
    catch (error) {
        res.status(500).send("Internal server error", error.message);
    }
});

const updateNote = ("/updatenote", async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const note = await Note.findByIdAndUpdate(id, { title, content }, { returnDocument: "after" });
        if (note.length !== 0) {
            // const updatedNote = await note.updateOne({title, content});
            res.status(200).send(note);
        }
        else {
            res.status(404).send("Note does not exist!");
        }
    }
    catch (error) {
        res.status(500).send("Internal server error", error.message);
    }
});

const deleteNote = ("/deletenote", async (req, res) => {
    const {id} = req.params;
    try {
        const note = await Note.findById(id);
        if (note.length !== 0) {
            await note.deleteOne();
            res.status(200).send("Note deleted successfully");
        }
        else {
            res.status(404).send("Note does not exist!");
        }
    }
    catch (error) {
        res.status(500).send("Internal server error", error.message);
    }
});

export { getNote, addNote, updateNote, deleteNote };

