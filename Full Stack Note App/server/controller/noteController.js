import Note from "../models/noteModel.js";

//Get all notes
const getNote = async (req, res) => {

    try {
        const notes = await Note.find({});
        if (notes.length > 0) {
            res.status(200).send(notes);
        }
        else {
            res.status(404).send("No notes found!");
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Add a new note
const addNote = async (req, res) => {
    const { title, content } = req.body;
    const note = new Note({
        title, content
    });
    try {
        const addedNote = await note.save();
        res.status(201).send(addedNote);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Update an existing note
const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        if (note) {
            res.status(200).send(note);
        }
        else {
            res.status(404).send("Note not found!");
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findById(id);
        if (note) {
            await note.deleteOne();
            res.status(200).send("Note deleted successfully");
        }
        else {
            res.status(404).send("Note not found!");
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export { getNote, addNote, updateNote, deleteNote };

