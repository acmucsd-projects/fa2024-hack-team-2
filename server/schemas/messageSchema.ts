import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    message: String,
    conversation_id: String,
    user_id: String,
    time: {type: Date, default: Date.now},
});

const Message = mongoose.model('Message', messageSchema);

export { Message };