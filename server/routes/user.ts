import express, { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

const router = express.Router();

router.get('/users/test', (req: Request, res: Response, next: NextFunction) => {
  res.send('users route');
});

// Find user by user_id
router.get('/users/:user_id', async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ user_id: req.params.user_id }); // Use findOne for custom user_id
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Error fetching user' });
    }
  });
  
// POST: Create a new user
router.post('/users', async (req: Request, res: Response) => {
  try {
    const { user_id, username, bio, pronouns, tags, picture, settings } = req.body;

    const newUser = new User({
      user_id,
      username,
      bio,
      pronouns,
      tags,
      followers: 0,
      following: 0,
      wishlist: [],
      posts: [],
      liked: [],
      disliked: [],
      picture,
      settings,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: 'Error creating user', details: error });
  }
});

export default router;
