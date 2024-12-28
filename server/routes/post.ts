import express, { Request, Response } from 'express';
import Post from '../models/Post';

const router = express.Router();

// Test route
router.get('/posts/test', (req: Request, res: Response) => {
  res.send('posts route is working');
});

// GET: Retrieve a post by its _id
router.get('/posts/:id', async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id); // Find post by MongoDB's ObjectId
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
router.get('/posts/author/:user_id', async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ author: req.params.user_id }); // Find all posts by author
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts by author:', error);
    res.status(500).json({ error: 'Error fetching posts by author' });
  }
});

// POST: Create a new post
router.post('/posts', async (req: Request, res: Response) => {
  try {
    const {
      title,
      product_details,
      material,
      brand,
      cost,
      likes,
      numStores,
      author,
      available_stores,
      image,
    } = req.body;

    const newPost = new Post({
      title,
      product_details,
      material,
      brand,
      cost,
      likes,
      numStores,
      author,
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
