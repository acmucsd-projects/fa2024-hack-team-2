import mongoose, { Schema, Model } from 'mongoose';

interface IMessage {
  _id?: string; // Optional since MongoDB generates it
  conversation_id: string; // A unique ID for the conversation (e.g., "user1ID_user2ID")
  user_id: string; // The sender's user ID
  timestamp: string; // When the message was sent
  message: string; // The message content
}

const messageSchema = new Schema<IMessage>({
  conversation_id: { type: String, required: true },
  user_id: { type: String, required: true },
  timestamp: { type: String, required: true },
  message: { type: String, required: true },
});

const Message: Model<IMessage> = mongoose.model<IMessage>('Message', messageSchema);

export default Message;
