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
/**
 * @route POST /
 * @desc Create a new post
 * @access Private
 *
 * This endpoint allows an authenticated user to create a new post.
 *
 * Request body:
 * - title: The title of the post. (required)
 * - product_details: Details about the product. (optional)
 * - material: The material of the product. (optional)
 * - brand: The brand of the product. (optional)
 * - cost: The cost of the product. (optional)
 * - numStores: The number of stores where the product is available. (optional)
 * - available_stores: The list of available stores. (optional)
 * - image: The image URL of the product. (required)
 * - tags: The list of tags associated with the post. (optional)
 * - date_created: The date the post was created. (automatically generated)
 *
 * Response:
 * - 201: Post created successfully.
 * - 400: Error creating post.
 * - 401: Unauthorized (if the user is not authenticated).
 * - 500: Internal server error.
 */
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const author = yield User_1.User.findOne({ user_id: req.user.user_id });
        if (!author) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const { title, product_details, material, brand, cost, numStores, available_stores, image, tags, } = req.body;
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
            tags,
            date_created: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }),
        });
        // adding post to the author's list of posts
        author.posts.push(new mongoose_1.default.Types.ObjectId(newPost._id));
        const savedPost = yield newPost.save();
        yield author.save();
        res.status(201).json({ "message": "Post created successfully", savedPost });
    }
    catch (error) {
        console.error("Error creating post:", error);
        res.status(400).json({ error: "Error creating post", details: error });
    }
}));
/**
 * @route GET /
 * @desc Retrieve a post by its _id
 * @access Public
 *
 * This endpoint allows users to retrieve a post by its MongoDB ObjectId.
 *
 * Request body:
 * - post_id: The ID of the post to be retrieved. (required)
 *
 * Response:
 * - 200: Post retrieved successfully.
 * - 404: Post not found.
 * - 500: Internal server error.
 */
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post_id = new mongoose_1.default.Types.ObjectId(req.body.post_id); // Convert post_id to ObjectId
        const post = yield Post_1.default.findById(post_id); // Find post by MongoDB's ObjectId
        if (!post) {
            res.status(404).json({ error: "Post not found" });
            return;
        }
        res.status(200).json(post);
    }
    catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ error: "Error fetching post" });
    }
}));
/**
 * @route DELETE /
 * @desc Delete a post by its _id
 * @access Private
 *
 * This endpoint allows an authenticated user to delete a post. The post is deleted from the user's posts
 * and the totalLikes of the author is decreased by the number of likes the post has.
 *
 * Request body:
 * - post_id: The ID of the post to be deleted. (required)
 *
 * Response:
 * - 200: Post deleted successfully.
 * - 400: Bad request (if post_id is missing or invalid).
 * - 401: Unauthorized (if the user is not authenticated or not the author of the post).
 * - 404: Post not found.
 * - 500: Internal server error.
 */
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const post_id = new mongoose_1.default.Types.ObjectId(req.body.post_id);
        const user_id = req.user.user_id;
        const post = yield Post_1.default.findById(post_id);
        if (!post) {
            res.status(404).json({ error: "Post not found" });
            return;
        }
        if (post.author !== user_id) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const author = yield User_1.User.findOne({ user_id: user_id });
        if (!author) {
            console.log("Author not found");
            throw new Error("Author not found");
        }
        // Deleting the post from the author's list of posts
        author.posts = author.posts.filter(postId => (postId.toString() !== post_id.toString()));
        author.totalLikes -= post.likes;
        // Deleting the post from the liked user's list of liked posts
        const likedUser = yield User_1.User.find({ user_id: { $in: post.likesList } });
        likedUser.forEach((likedUser) => __awaiter(void 0, void 0, void 0, function* () {
            likedUser.liked = likedUser.liked.filter(likedPostId => likedPostId.toString() !== post_id.toString());
            yield likedUser.save();
        }));
        // Saving the author changes since we are deleting post and decreasing the totalLikes
        yield author.save();
        yield Post_1.default.deleteOne({ _id: post_id });
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Error deleting post" });
    }
}));
/**
 * @route PATCH /
 * @desc Update specific fields of a post
 * @access Private
 *
 * This endpoint allows an authenticated user to update specific fields of a post.
 *
 * Request body:
 * - post_id: The ID of the post to be updated. (required)
 * - title: The new title of the post. (optional)
 * - product_details: Details about the product. (optional)
 * - material: The material of the product. (optional)
 * - brand: The brand of the product. (optional)
 * - cost: The cost of the product. (optional)
 * - numStores: The number of stores where the product is available. (optional)
 * - available_stores: The list of available stores. (optional)
 * - image: The image URL of the product. (optional)
 * - tags: The list of tags associated with the post. (optional)
 *
 * Response:
 * - 200: Post updated successfully.
 * - 400: Bad request (if the request body is invalid).
 * - 401: Unauthorized (if the user is not authenticated or not the author of the post).
 * - 404: Post not found.
 * - 500: Internal server error.
 */
router.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const post_id = new mongoose_1.default.Types.ObjectId(req.body.post_id);
        const user_id = req.user.user_id;
        const post = yield Post_1.default.findById(post_id);
        if (!post) {
            res.status(404).json({ error: "Post not found" });
            return;
        }
        if (post.author !== user_id) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const { title, product_details, material, brand, cost, numStores, available_stores, image, tags, } = req.body;
        if (title) {
            post.title = title;
        }
        if (product_details) {
            post.product_details = product_details;
        }
        if (material) {
            post.material = material;
        }
        if (brand) {
            post.brand = brand;
        }
        if (cost) {
            post.cost = cost;
        }
        if (numStores) {
            post.numStores = numStores;
        }
        if (available_stores) {
            post.available_stores = available_stores;
        }
        if (image) {
            post.image = image;
        }
        if (tags) {
            post.tags = tags;
        }
        yield post.save();
        res.status(200).json({ message: "Post updated successfully", post });
    }
    catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Error updating post" });
    }
}));
/**
 * @route GET /author
 * @desc Retrieve all posts by a specific author
 * @access Public
 *
 * This endpoint allows users to retrieve all posts created by a specific author.
 *
 * Request body:
 * - user_id: The ID of the author whose posts are to be retrieved. (required)
 *
 * Response:
 * - 200: Posts retrieved successfully.
 * - 404: No posts found for the given author.
 * - 500: Internal server error.
 */
router.get("/author", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({ user_id: req.body.user_id });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const posts = yield Post_1.default.find({ _id: { $in: user.posts } });
        res.status(200).json(posts);
    }
    catch (error) {
        console.error("Error fetching posts by author:", error);
        res.status(500).json({ error: "Error fetching posts by author" });
    }
}));
/**
 * @route PATCH /like
 * @desc Like or unlike a post
 * @access Private
 *
 * This endpoint allows an authenticated user to like or unlike a post.
 * If the user has already liked the post, it will be unliked.
 * If the user has not liked the post, it will be liked.
 * The totalLikes of the post and the author will be updated accordingly.
 * The user's liked posts list will also be updated.
 *
 * Request body:
 * - post_id: The ID of the post to be liked or unliked.
 *
 * Response:
 * - 200: Post liked/unliked successfully.
 * - 400: Invalid post_id format.
 * - 401: Unauthorized (if the user is not authenticated).
 * - 404: Post or user not found.
 * - 500: Internal server error.
 */
router.patch("/like", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const post_id = req.body.post_id;
        const user_id = req.user.user_id;
        // Validate post_id
        if (!mongoose_1.default.Types.ObjectId.isValid(post_id)) {
            res.status(400).json({ error: "Invalid post_id format" });
        }
        const post = yield Post_1.default.findById(post_id);
        if (!post) {
            res.status(404).json({ error: "Post not found" });
            return;
        }
        const [author, user] = yield Promise.all([
            User_1.User.findOne({ user_id: post.author }),
            User_1.User.findOne({ user_id: user_id })
        ]);
        if (!author) {
            res.status(404).json({ error: "Author not found" });
            return;
        }
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const postObjectId = new mongoose_1.default.Types.ObjectId(post_id);
        const index = user.liked.indexOf(postObjectId);
        if (index !== -1) {
            user.liked.splice(index, 1);
            post.likes--;
            author.totalLikes--;
            post.likesList = post.likesList.filter(id => id.toString() !== user_id);
        }
        else {
            user.liked.push(postObjectId);
            post.likes++;
            author.totalLikes++;
            post.likesList.push(user_id);
        }
        yield Promise.all([user.save(), post.save(), author.save()]);
        res.status(200).json({ message: "Post liked/unliked successfully" });
    }
    catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ error: "Error liking post" });
    }
}));
exports.default = router;
