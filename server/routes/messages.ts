import express from 'express';
import { Message } from '../schemas/messageSchema';

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const messages = await Message.find().sort({timestamp: 1});
        res.json(messages);
    } catch (error){
        res.status(500).json({ error: 'Failed to fetch messages'});
    }
});

export default router;