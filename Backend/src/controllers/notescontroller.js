import Note from "../models/Note.js"

export async function getallnotes(_, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });//-1 will sort in desc order (newest one) for asec order use 1
        res.status(200).json(notes)
    } catch (error) {
        console.log("Error in  getallnotes Controller", error);
        res.status(500).json({ message: "Internal Server error" })
    }
}


export async function createnotes(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content })
        const savenotes = await newNote.save()
        res.status(201).json({ message: "Note Created Successfully ...... ", savenotes })
    } catch (error) {
        console.log("Error in  createnotes Controller", error);
        res.status(500).json({ message: "Internal Server error" })
    }
}


export async function getnoteById(req, res) {
    try {
        const getnoteresponse = await Note.findById(req.params.id)
        if (!getnoteresponse) return res.status(404).json({ message: "Note not found....." })
        res.status(201).json({ message: "Note Founded Successfully.......", getnoteresponse })
    } catch (error) {
        console.log("Error in  getnoteById Controller", error);
        res.status(500).json({ message: "Internal Server error" })
    }
}


export async function updatenotes(req, res) {
    try {
        const { title, content } = req.body
        const updateresponse = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })
        if (!updateresponse) return res.status(404).json({ message: "Note not found....." })
        res.status(201).json({ message: "Note Updated Successfully.......", updateresponse })
    } catch (error) {
        console.log("Error in  updatenotes Controller", error);
        res.status(500).json({ message: "Internal Server error" })
    }
}


export async function deletenotes(req, res) {
    try {
        const deleteresponse = await Note.findByIdAndDelete(req.params.id)
        if (!deleteresponse) return res.status(404).json({ message: "Note Not found" })
        res.status(200).json({ message: "Note Deleted Successfully.......", deleteresponse })
    } catch (error) {
        console.log("Error in  deletenotes Controller", error);
        res.status(500).json({ message: "Internal Server error" })
    }
} 