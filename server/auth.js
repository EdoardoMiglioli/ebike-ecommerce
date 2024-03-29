import { Router } from "express";
import passport from "passport";

const router = Router();
const homePageURL = "http://localhost:3000";

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: homePageURL,
  failureRedirect: '/login/failed',
}));

router.get('/github/callback', passport.authenticate('github', {
  successRedirect: homePageURL,
  failureRedirect: '/login/failed',
}));

router.get('/github', passport.authenticate('github', {
  scope: ['profile', 'email'],
}));


router.get('/login/success', (req, res) => {
  res.status(200).json({
    success: true,
    message: "successfull",
    user: req.user,
    cookies: req.cookies,
  });
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

export default router;
