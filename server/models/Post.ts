import mongoose, { Schema, Model } from 'mongoose';

interface IPost {
  _id?: string; // Optional as MongoDB will generate it
  title: string;
  product_details?: string;
  material?: string;
  brand?: string;
  cost?: number;
  likes: number;
  numStores?: number;
  author: string; // user_id of the post author
  available_stores?: string[];
  image: string; // assuming that image will be a URL
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  product_details: { type: String },
  material: { type: String },
  brand: { type: String },
  cost: { type: Number },
  likes: { type: Number, default: 0 },
  numStores: { type: Number },
  author: { type: String, required: true },
  available_stores: { type: [String], default: [] },
  image: { type: String, required: true },
});

const Post: Model<IPost> = mongoose.model<IPost>('Post', postSchema);

export default Post;
