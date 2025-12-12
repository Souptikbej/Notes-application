import express from "express";
import { getallnotes, createnotes, updatenotes, deletenotes, getnoteById } from "../controllers/notescontroller.js";
const router = express.Router();

router.get("/", getallnotes);
router.get("/:id", getnoteById);
router.post("/", createnotes);
// router.post("/check-toxicity", checkNoteToxicity);
router.put("/:id", updatenotes);
router.delete("/:id", deletenotes);

export default router;