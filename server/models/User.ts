import mongoose, { Schema, Model, InferSchemaType } from 'mongoose';

interface IUser {
  user_id: string;
  username: string;
  bio?: string;
  pronouns?: string;
  tags: string[];
  followers: number;
  following: number;
  wishlist: string[];
  posts: string[];
  liked: string[];
  disliked: string[];
  picture?: string; // Assuming a profile picture URL
  settings: {
    privateAccount: boolean;
  };
}

const userSchema = new Schema<IUser>({
  user_id: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  bio: { type: String },
  pronouns: { type: String },
  tags: { type: [String], default: [] },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  wishlist: { type: [String], default: [] },
  posts: { type: [String], default: [] },
  liked: { type: [String], default: [] },
  disliked: { type: [String], default: [] },
  picture: { type: String },
  settings: {
    privateAccount: { type: Boolean, default: false },
  },
});

// type UserDocument = InferSchemaType<typeof userSchema>;

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;