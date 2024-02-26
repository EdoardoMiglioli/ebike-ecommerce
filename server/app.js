import bcrypt from "bcrypt"
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import express from "express";
import passport from "passport";
import pg from "pg";

dotenv.config();

const app = express();
const port = 5001;

const db = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({"userId": 4});
});

app.post("/register");


app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`)
});
