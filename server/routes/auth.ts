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

// Callback route for Google OAuth
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirects to index
    res.redirect('/');
  }
);

router.get('/protected', isLoggedIn, (req: Request, res: Response) => {
  res.send('protected route');
});


export default router;
