import mongoose, { Schema, Model, InferSchemaType } from 'mongoose';

interface IUser {
  user_id: string;
  username: string;
  bio?: string;
  pronouns?: string;
  tags: string[];
  followList: string[];
  followers: number;
  following: number;
  posts: mongoose.Types.ObjectId[];
  liked: mongoose.Types.ObjectId[];
  totalLikes: number;
  disliked: mongoose.Types.ObjectId[];
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
  followList: { type: [String], default: []},
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  posts: { type: [mongoose.Types.ObjectId], default: [] },
  liked: { type: [mongoose.Types.ObjectId], default: [] },
  disliked: { type: [String], default: [] },
  picture: { type: String },
  totalLikes: { type: Number, default: 0 },
  settings: {
    privateAccount: { type: Boolean, default: false },
  },
});

// type UserDocument = InferSchemaType<typeof userSchema>;

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export { User, IUser };