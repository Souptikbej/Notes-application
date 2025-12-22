import express from "express";
import { getallnotes, createnotes, updatenotes, deletenotes, getnoteById } from "../controllers/notescontroller.js";
const router = express.Router();
// router.get("/:id", getNoteById);
router.get("/", getallnotes);
router.get("/:id", getnoteById);
router.post("/", createnotes);
router.put("/:id", updatenotes);
router.delete("/:id", deletenotes);

export default router;