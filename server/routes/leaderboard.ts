import express, { Request, Response, NextFunction } from 'express';
import Post from '../models/Post';
import {User, IUser} from '../models/User';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const leaderboard = await User.find({}).sort({ totalLikes: -1 }).limit(7);
        res.json(leaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Error fetching leaderboard' });
    }
});

export default router;
