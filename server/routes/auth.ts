import express from 'express';
import passport from 'passport';

const router = express.Router();

// Redirect user to Google OAuth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route for Google OAuth
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect or send response
    res.redirect('/');
  }
);

export default router;
