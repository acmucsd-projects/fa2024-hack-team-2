import express, { Request, Response, NextFunction } from 'express';
import Post from '../models/Post';
import {User, IUser} from '../models/User';

const router = express.Router();

/**
 * @route GET /
 * @desc Retrieve the leaderboard
 * @access Public
 *
 * This endpoint allows users to retrieve the leaderboard, which lists users (up to 7) sorted by their total likes in descending order.
 *
 * Response:
 * - 200: Leaderboard retrieved successfully.
 *   - The response includes the list of users sorted by total likes.
 * - 500: Internal server error.
 */
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
