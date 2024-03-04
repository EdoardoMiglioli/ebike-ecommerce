import bcrypt from "bcrypt"
import bodyParser from "body-parser";
import cors from "cors";
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

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

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

app.get('/api/check-auth', (req, res) => {
  if (req.isAuthenticated) {
    res.json({isAuthenticated: true});
  } else {
    res.json({isAuthenticated: false});
  }
})

app.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return res.redirect("/login?error=" + encodeURIComponent(err));
    }
    if (!user) {
      return res.redirect("/login?error=" + encodeURIComponent(info.message));
    }
    return res.redirect("/");
  })(req, res, next);
});


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

// Passport strategies

passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        const valid = await bcrypt.compare(password, storedHashedPassword);
        if (valid) {
          return cb(null, user);
        } else {
          return cb(null, false, { message: "Invalid password" });
        }
      } else {
        return cb(null, false, { message: "User not found" });
      }
    } catch (err) {
      console.error("Error authenticating user:", err);
      return cb(err);
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
