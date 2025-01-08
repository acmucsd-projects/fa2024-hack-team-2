import express, { Request, Response } from 'express';
import passport from 'passport';
import isLoggedIn from '../utils/LoginMiddleware';

const router = express.Router();

/**
 * @route GET /
 * @description Default route for authentication module.
 * @access Public
 */
router.get('/', (req: Request, res: Response) => {
  res.send('auth route');
});

/**
 * @route GET /google
 * @description Redirect user to Google OAuth for authentication.
 * @access Public
 */
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * @route GET /google/callback
 * @description Google OAuth callback route.
 * @access Public
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
  if (req.user) {
    console.log('User authenticated successfully:', req.user);
    return res.redirect('http://localhost:3000');  // Correct redirection
  } else {
    console.log("User not authenticated.");
    return res.redirect('/login');  // Fallback if no user object
  }
  }
);

/**
 * @route GET /logout
 * @description Logout route to end user session and redirect to home or login page.
 * @access Public
 */
router.get('/logout', (req, res) => {
  req.logout((err) => {
  if (err) {
    res.status(500).send('Error logging out');
  }
  req.session.destroy((err) => {
    if (err) {
    res.status(500).send('Error destroying session');
    }
    res.redirect('http://localhost:3000');  // Correct redirection
  });
  });
});

export default router;