import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const router = express.Router();

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  req.user ? next() : res.sendStatus(401);
}

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('auth route');
  });
  

// Redirect user to Google OAuth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback route
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

router.get('/protected', isLoggedIn, (req: Request, res: Response) => {
  res.send('protected route');
});


export default router;
