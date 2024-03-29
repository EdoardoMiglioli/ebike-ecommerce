import authRoute from "./auth.js";
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser";
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

app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
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

app.get("/product-ratings/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const response = await db.query(`SELECT * FROM public.ratings WHERE product_id = $1`, [productId]);
    const fetchedRatings = response.rows;
    const ratingsArray = fetchedRatings.map(item => item.rating);
    res.json({ ratings: ratingsArray });
  } catch (err) {
    console.error(`Error retrieving product with id ${productId}: `, err);
    res.status(500).json({ err: `Error retrieving product ${productId}` });
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

// Cookies

app.get("/cart-products", (req, res) => {
  if (req.isAuthenticated()) {
    try {
      if (!req.cookies.cart) {
        const oneYearMilliseconds = 365 * 24 * 60 * 60 * 1000;
        res.cookie("cart", [], { maxAge: oneYearMilliseconds }); 
      }

      const products = req.cookies.cart;
      res.json({products: products})
      return

    } catch (err) {
      res.status(500).json({error: err});
    }
  }
});

app.post("/add-to-cart/:productName", (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const productName = req.params.productName;
      const cartItems = req.cookies.cart || [];
      
      if (cartItems.includes(productName)) {
        res.redirect("/cart");
        return
      }

      const oneYearMilliseconds = 365 * 24 * 60 * 60 * 1000;
      res.cookie("cart", [...cartItems, productName], { maxAge: oneYearMilliseconds }); 
      res.redirect("/cart");
      return

    } catch (err) {
      res.status(500).json({error: err});
    }
  } else {
    res.status(401).json({error: "user is not authenticated."});
  }
});

app.delete("/delete-from-cart/:productName", (req, res) => {
  if (req.isAuthenticated()) {
    try{
      const productName = req.params.productName;
      const cartItems = req.cookies.cart

      const newCartItems = cartItems.filter(product => product !== productName);

      const oneYearMilliseconds = 365 * 24 * 60 * 60 * 1000;
      res.cookie("cart", newCartItems, { maxAge: oneYearMilliseconds }); 
      res.redirect("/cart");

    } catch (err) {
      res.status(500).json({error: err});
    }
  } else {
    res.status(401).json({error: "user is not authenticated."});
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

    req.login(user, (err) => {
      if (err) {
        return res.redirect("/login?error=" + encodeURIComponent(err));
      }
      return res.redirect("/");
    });
    
  })(req, res, next);
});

app.post("/register", (req, res, next) => {
  const { email, password } = req.body;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) throw err;
    try {
      const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", [email, hash]);
      const user = result.rows[0];

      req.login(user, (err) => {
        if (err) {
          return res.redirect("/login?error=" + encodeURIComponent(err));
        }
        return res.redirect("/");
      });

    } catch (err) {
      let error = "Error registering you.";
      if (err.message === 'duplicate key value violates unique constraint "users_email_key"') {
        error = "This email is already in use.";
      }
      return res.redirect(`/register?error=${encodeURIComponent(error)}`);
    }
  });
});

// Passport strategies

passport.use(
  "local",
  new Strategy(
    {
      usernameField: "email", 
      passwordField: "password", 
    }, 

    async function verify(email, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
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
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    cb(null, user.rows[0]);
  } catch (err) {
    cb(err, null);
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`)
});
