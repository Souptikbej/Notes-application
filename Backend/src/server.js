import express from "express";
import notesPouter from "./Routees/notesRouter.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();

//middlware
app.use(express.json()) // this is actully help parse JSON bodies: req.body
app.use(rateLimiter)
//and is simple custom middilware
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} and Req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesPouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server Started on PORT:", PORT)
    })
})


