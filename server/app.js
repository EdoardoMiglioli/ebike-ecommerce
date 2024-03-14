import authRoute from "./auth.js";
import bcrypt from "bcrypt"
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import GithubStrategy from "passport-github2";
import session from "express-session";
import pg from "pg";

const app = express();
const port = 5001;
const saltRounds = 10;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,PATCH,DELETE",
  credentials: true,
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use(express.static("public"));


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


// Authentication

app.get("/api/check-auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({isAuthenticated: true});
  } else {
    res.json({isAuthenticated: false});
  }
});

app.get("/userid", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({userId: req.user.id})
  } else {
    res.json({error: "user is not authenticated."});
  }
});

app.post('/auth/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('http://localhost:3000');
  });
});

// DB get
app.get("/products", async (req, res) => {
  const sorting = req.query.sorting;
  try {
    const response = await db.query(`SELECT * FROM public.products ORDER BY ${sorting}`);
    const listOfBikes = response.rows;
    res.json({ products: listOfBikes });
  } catch (error) {
    console.error("Error retrieving products: ", error);
    res.status(500).json({ error: "Error retrieving products" });
  }
});

app.get("/product/:product", async (req, res) => {
  const product = req.params.product;
  try {
    const response = await db.query(`SELECT * FROM public.products WHERE name = $1`, [product]);
    const fetchedProduct = response.rows[0];
    res.json({ product: fetchedProduct });
  } catch (err) {
    console.error(`Error retrieving product ${product}: `, err);
    res.status(500).json({ err: `Error retrieving products ${product}` });
  }
});

app.post("/has-user-already-cheked", async (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const response = await db.query(`SELECT * FROM public.ratings WHERE user_id = $1 AND product_id = $2`, 
    [userId, productId]);
    const hasAlreadyRated = response.rows.length > 0;
    res.json({hasAlreadyRated: hasAlreadyRated});
  } else {
    res.json({error: "user is not authenticated."});
  }
});

app.post("/user-product-rating", async (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.body.userId;
    const productId = req.body.productId;

    try {
      const response = await db.query(`SELECT * FROM public.ratings WHERE user_id = $1 AND product_id = $2`, 
      [userId, productId]);
      const { rating } = response.rows[0];
      res.json({ rating: rating });
    } catch (err) {
      console.error(`Error retrieving user's rating: `, err);
      res.status(500).json({ error: err });
    }
  } else {
    res.json({error: "user is not authenticated."});
  }
});

// DB post
app.post("/product/rating", async (req, res) => {
  const userId = req.body.userId;
  const productId = req.body.productId;
  const rating = req.body.rating;
  try {
    const response = await db.query("INSERT INTO ratings (user_id, product_id, rating) VALUES ($1, $2, $3)", [userId, productId, rating],);
  } catch (err) {
    if (err.code == 23505) {

      try {
        const response = await db.query(`
        UPDATE ratings
        SET rating = $3
        WHERE user_id = $1 AND product_id = $2;`, [userId, productId, rating],);
        return

      } catch (err) {
        console.log(err)
        res.status(500).json({error: "Something went wrong when submitting your review."});
      }
      
    }
    console.log(err)
    res.status(500).json({error: "Something went wrong when submitting your review."});
  }
});


// Login / register

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

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
},
async function(accessToken, refreshToken, profile, cb) {
  try {
    const result = await db.query("SELECT * FROM public.users WHERE email = $1",
    [profile.email]);

    if (result.rows.length === 0) {
      const newUser = await db.query("INSERT INTO public.users (email, password) VALUES ($1, $2)", 
      [profile.email, "google"]);
      cb(null, newUser.rows[0]);
    } else {
      cb(null, result.rows[0]);
    }
  } catch (err) {
    console.log(err);
    cb(err);
  }
}
));


passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/auth/github/callback',
},
async function(accessToken, refreshToken, profile, cb) {
  try {
    const username = profile._json.email ? profile._json.email : profile.username;
    const result = await db.query("SELECT * FROM public.users WHERE email = $1",
    [username]);

    if (result.rows.length === 0) {
      const newUser = await db.query("INSERT INTO public.users (email, password) VALUES ($1, $2)", 
      [username, "github"]);
      cb(null, newUser.rows[0]);
    } else {
      cb(null, result.rows[0]);
    }
  } catch (err) {
    console.log(err);
    cb(err);
  }
}
));


passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`)
});
