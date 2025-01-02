import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { User } from '../models/User';
import type { IUser } from '../models/User';

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

// Get token route
router.get('/get-token', isLoggedIn, async (req, res) => {
    try {
        const user_id = (req.user as IUser).user_id;
        const user = await User.findOne( {user_id: user_id});

        if (!user){
            res.sendStatus(404);
            return;
        }
        res.json({token: user.token });
    } catch (err){
        console.error(err);
        res.sendStatus(500);
        return;
    }
})

export default router;
