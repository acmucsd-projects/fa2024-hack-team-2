"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = require("../models/User");
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
// Test route
router.get('/posts/test', (req, res) => {
    res.send('posts route is working');
});
// GET: Retrieve a post by its _id
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.body.post_id); // Find post by MongoDB's ObjectId
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }
        res.status(200).json(post);
    }
    catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Error fetching post' });
    }
}));
// GET: Retrieve all posts by a specific author (user_id)
router.get('/author/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find({ author: req.params.user_id }); // Find all posts by author
        res.status(200).json(posts);
    }
    catch (error) {
        console.error('Error fetching posts by author:', error);
        res.status(500).json({ error: 'Error fetching posts by author' });
    }
}));
// Post: Liking a post
router.post('/like', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("request body:", req.body);
        const post_id = new mongoose_1.default.Types.ObjectId(req.body.post_id);
        const user_id = req.user.user_id;
        // Validate user_id and post_id
        if (!mongoose_1.default.Types.ObjectId.isValid(post_id)) {
            res.status(400).json({ error: 'Invalid post_id format' });
            return;
        }
        const post = yield Post_1.default.findById(post_id);
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }
        const user = yield User_1.User.findById(user_id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const index = user.liked.indexOf(post_id.toString());
        if (index !== -1) {
            user.liked.splice(index, 1);
            post.likes--;
        }
        else {
            user.liked.push(post_id.toString());
            post.likes++;
        }
        yield user.save();
        yield post.save();
        res.status(200).json({ message: 'Post liked successfully', post });
    }
    catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ error: 'Error liking post' });
    }
}));
// POST: Create a new post
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    try {
        const { title, product_details, material, brand, cost, numStores, available_stores, image, } = req.body;
        const newPost = new Post_1.default({
            title,
            product_details,
            material,
            brand,
            cost,
            numStores,
            author: req.user.user_id,
            available_stores,
            image,
        });
        const savedPost = yield newPost.save();
        res.status(201).json(savedPost);
    }
    catch (error) {
        console.error('Error creating post:', error);
        res.status(400).json({ error: 'Error creating post', details: error });
    }
}));
// Export the router
exports.default = router;
