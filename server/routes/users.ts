import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import {User, IUser} from "../models/User"

// This gets the current user's information, as of now just user_id
router.get('/self', (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    res.json((req.user as IUser).user_id);  // Send the user's name (or 'username' field)
  } else {
    res.status(401).send('Unauthorized');
  }
});

// This gets all users except the current user, useful for messaging feature
router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if the user is authenticated
    const currentUser = req.user as IUser | undefined;
    console.log("currentser", currentUser)

    if (!currentUser) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Query to fetch all users excluding the current authenticated user
    const users = await User.find({ user_id: { $ne: currentUser?.user_id } });

    // Respond with the list of users excluding the current user
    res.json(users);
  } catch (error) {
    next(error);  // Pass the error to the global error handler
  }
});

export default router;
