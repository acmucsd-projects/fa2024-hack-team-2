import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
const router = express.Router();

router.get(
    '/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      // Successful login
      res.redirect('/success');
    }
  );

export default router;
