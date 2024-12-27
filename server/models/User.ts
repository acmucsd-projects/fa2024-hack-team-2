import mongoose,{ Document, model, Schema} from 'mongoose';

export interface User extends Document {
    user_id: string;
    username: string;
  }

const userSchema = new mongoose.Schema({
    user_id: {type: String, unique: true, required: true},
    username: String,
});

export const User = model<User>('User', userSchema);