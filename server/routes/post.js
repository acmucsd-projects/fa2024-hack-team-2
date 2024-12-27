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
const router = express_1.default.Router();
// Test route
router.get('/posts/test', (req, res) => {
    res.send('posts route is working');
});
// GET: Retrieve a post by its _id
router.get('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id); // Find post by MongoDB's ObjectId
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
router.get('/posts/author/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find({ author: req.params.user_id }); // Find all posts by author
        res.status(200).json(posts);
    }
    catch (error) {
        console.error('Error fetching posts by author:', error);
        res.status(500).json({ error: 'Error fetching posts by author' });
    }
}));
// POST: Create a new post
router.post('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, product_details, material, brand, cost, likes, numStores, author, available_stores, image, } = req.body;
        const newPost = new Post_1.default({
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
