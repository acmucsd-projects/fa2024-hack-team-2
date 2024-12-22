import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    message: String,
    user_id: String,
});

const Message = mongoose.model('Message', messageSchema);

export { Message };