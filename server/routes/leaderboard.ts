import express, { Request, Response } from 'express';
import Post from '../models/Post';
import {User, IUser} from '../models/User';

const router = express.Router();

/**
 * @route GET /leaderboard
 * @desc Retrieve the leaderboard
 * @access Public
 *
 * This endpoint allows users to retrieve the leaderboard, which lists users (up to 7) sorted by their total likes in descending order.
 *
 * Response:
 * - 200: Leaderboard retrieved successfully.
 *   - The response includes the list of users sorted by total likes.
 * - 500: Internal server error.
 *   - The response includes an error message indicating the failure to fetch the leaderboard.
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const leaderboard = await User.find({}, 'picture user_id username totalLikes').sort({ totalLikes: -1 }).limit(7);
        res.status(200).json(leaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Error fetching leaderboard' });
    }
});

export default router;
