"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Message_1 = __importDefault(require("../models/Message"));
const router = express_1.default.Router();
// Test route
router.get('/messages/test', (req, res) => {
    res.send('Messages route is working');
});
// GET: Fetch all messages in a conversation
router.get('/messages/:conversation_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { conversation_id } = req.params;
        const messages = yield Message_1.default.find({ conversation_id }).sort({ timestamp: 1 });
        res.status(200).json(messages);
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Error fetching messages', details: error });
    }
}));
// POST: Send a new message
router.post('/messages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { conversation_id, user_id, timestamp, message } = req.body;
        const newMessage = new Message_1.default({
            conversation_id,
            user_id,
            timestamp,
            message,
        });
        const savedMessage = yield newMessage.save();
        res.status(201).json(savedMessage);
    }
    catch (error) {
        console.error('Error sending message:', error);
        res.status(400).json({ error: 'Error sending message', details: error });
    }
}));
exports.default = router;
