import express, { Request, Response, NextFunction } from 'express';import passport from 'passport';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('auth route');
  });
  

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
