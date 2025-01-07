import mongoose, { Schema, Model } from 'mongoose';

interface IImage{
  data: Buffer;
  contentType: string;
}

interface IPost {
  _id?: string; // Optional as MongoDB will generate it
  title: string;
  product_details?: string;
  material?: string;
  brand?: string;
  cost?: number;
  likes: number;
  likesList: String[];
  numStores?: number;
  author: string; // user_id of the post author
  available_stores?: string[];
  images: IImage[]; // assuming that image will be a URL
  tags: string[];
  date_created: string; // MM-DD-YYYY
}

const imageSchema = new Schema<IImage>({  
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
});

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
  images: { type: [imageSchema], required: true }, // Array of image schemas
  tags: { type: [String], default: [] },
  date_created: { type: String, required: true },
  likesList: { type: [String], default: [] },
});

const Post: Model<IPost> = mongoose.model<IPost>('Post', postSchema);

export default Post;
