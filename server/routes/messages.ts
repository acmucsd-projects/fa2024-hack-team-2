import express, { Request, Response, NextFunction } from 'express';
import { Message } from '../models/messageSchema';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('messages route');
});

export default router;