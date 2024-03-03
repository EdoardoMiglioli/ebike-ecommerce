import bcrypt from "bcrypt"
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import pg from "pg";

const app = express();
const port = 5001;
const saltRounds = 10;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});
db.connect();

app.get("/cart/:user", (req, res) => {
  if (req.isAuthenticated) {
    res.json({});
  } else {
    res.json({});
  }
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
}))

app.post("/register", (req, res) => {
  const { email, password } = req.body;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) throw err;
      db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hash], (err) => {
          if (err) {
            res.status(500).send("Error registering user");
          } else {
            res.redirect("/products");
          }
      });
    });
});

app.get('/api/check-auth', (req, res) => {
  if (req.isAuthenticated) {
    res.json({isAuthenticated: true});
  } else {
    res.json({isAuthenticated: false});
  }
})

// Passport strategies

passport.use(
  "local",
  new Strategy(async function verify(email, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        email,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`)
});
