import express, { Request, Response } from 'express';
import Post from '../models/Post';
import { User, IUser } from '../models/User';
import mongoose from 'mongoose';

const router = express.Router();

// Test route
router.get('/posts/test', (req: Request, res: Response) => {
  res.send('posts route is working');
});

// GET: Retrieve a post by its _id
router.get('/', async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.body.post_id); // Find post by MongoDB's ObjectId
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Error fetching post' });
  }
});

// GET: Retrieve all posts by a specific author (user_id)
router.get('/author/:user_id', async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ author: req.params.user_id }); // Find all posts by author
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts by author:', error);
    res.status(500).json({ error: 'Error fetching posts by author' });
  }
});

// Post: Liking a post
router.post('/like', async (req: Request, res: Response) => {
  try {

    console.log("request body:", req.body)
    const post_id = new mongoose.Types.ObjectId(req.body.post_id);
    const user_id = (req.user as IUser).user_id;

    // Validate user_id and post_id
    if (!mongoose.Types.ObjectId.isValid(post_id)) {
      res.status(400).json({ error: 'Invalid post_id format' });
      return;
    }

    const post = await Post.findById(post_id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    const user = await User.findById(user_id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const index = user.liked.indexOf(post_id.toString());
    if (index !== -1) {
      user.liked.splice(index, 1);
      post.likes--;
    } else {
      user.liked.push(post_id.toString());
      post.likes++;
    }

    await user.save();
    await post.save();

    res.status(200).json({ message: 'Post liked successfully', post });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'Error liking post' });
  }
});



// POST: Create a new post
router.post('/create', async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const {
      title,
      product_details,
      material,
      brand,
      cost,
      numStores,
      available_stores,
      image,
    } = req.body;


    const newPost = new Post({
      title,
      product_details,
      material,
      brand,
      cost,
      numStores,
      author: (req.user as IUser).user_id,
      available_stores,
      image,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(400).json({ error: 'Error creating post', details: error });
  }
});

// Export the router
export default router;