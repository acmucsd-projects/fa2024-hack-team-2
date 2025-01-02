import express, { Request, Response } from 'express';
import Message from '../models/Message';

const router = express.Router();

// Test route
router.get('/messages/test', (req: Request, res: Response) => {
  res.send('Messages route is working');
});

// GET: Fetch all messages in a conversation
router.get('/messages/:conversation_id', async (req: Request, res: Response) => {
  try {
    const { conversation_id } = req.params;
    const messages = await Message.find({ conversation_id }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Error fetching messages', details: error });
  }
});

// POST: Send a new message
router.post('/messages', async (req: Request, res: Response) => {
  try {
    const { conversation_id, user_id, timestamp, message } = req.body;

    const newMessage = new Message({
      conversation_id,
      user_id,
      timestamp,
      message,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(400).json({ error: 'Error sending message', details: error });
  }
});

export default router;
