import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRouter from "./Routees/notesRouter.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
const __dirname = path.resolve()

//middlware
if (process.env.NODE_ENV !== "production") {
    app.use(cors({ origin: "http://localhost:5173", }))
}
app.use(express.json()) // this is actully help parse JSON bodies: req.body
app.use(rateLimiter)
//and is simple custom middilware
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} and Req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"))
    })

}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server Started on PORT:", PORT)
    })
})


