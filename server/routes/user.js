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
const User_1 = require("../models/User");
const router = express_1.default.Router();
router.get('/users/test', (req, res, next) => {
    res.send('users route');
});
// Find user by user_id
router.get('/users/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({ user_id: req.params.user_id }); // Use findOne for custom user_id
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Error fetching user' });
    }
}));
// POST: Create a new user
router.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, username, bio, pronouns, tags, picture, settings } = req.body;
        const newUser = new User_1.User({
            user_id,
            username,
            bio,
            pronouns,
            tags,
            followList: [],
            followers: 0,
            following: 0,
            wishlist: [],
            posts: [],
            liked: [],
            disliked: [],
            picture,
            settings,
        });
        const savedUser = yield newUser.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(400).json({ error: 'Error creating user', details: error });
    }
}));
// POST: Follow user
router.post('/follow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ message: `Unauthorized` });
        return;
    }
    try {
        // Get IDs from req
        const currUser = req.user.user_id;
        const { follow_user_id } = req.body;
        // Find users from database using IDs
        const user_to_follow = yield User_1.User.findOne({ user_id: follow_user_id });
        const user = yield User_1.User.findOne({ user_id: currUser });
        // If either user doesn't exist, send an error
        if (!user) {
            res.status(404).json({ message: `Curr user not found: ${currUser}` });
            return;
        }
        if (!user_to_follow) {
            res.status(404).json({ message: `User to follow not found: ${follow_user_id}` });
            return;
        }
        // If user already follows, then unfollow
        if (user.followList.includes(follow_user_id)) {
            // Remove the followed user from follow list
            yield user.updateOne({ $set: { followList: user.followList.filter(id => id !== follow_user_id) } });
            // Update fields accordingly
            yield user.updateOne({ $inc: { following: -1 } });
            yield user_to_follow.updateOne({ $inc: { followers: -1 } });
        }
        else {
            // If user isn't following, then follow
            yield user.updateOne({ $inc: { following: 1 } });
            yield (user_to_follow === null || user_to_follow === void 0 ? void 0 : user_to_follow.updateOne({ $inc: { followers: 1 } }));
            // Add user to follow to the follow list
            user.followList.push(follow_user_id);
        }
        // Save the new information of both users
        yield user.save(), user_to_follow.save();
        res.status(200).json({ message: `Followed successfully. User's follows: ${user.following}. User to follow's followers: ${user_to_follow.followers}` });
    }
    catch (err) {
        res.status(500).json({ message: 'Following error occurred:', err });
    }
}));
// PATCH: Edit profile 
router.patch('/profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ message: `Unauthorized` });
        return;
    }
    try {
        // Get profile fields from request
        const { username, bio, tags, pronouns, picture, settings } = req.body;
        // Find user in database
        const user_id = req.user.user_id;
        const user = yield User_1.User.findOne({ user_id: user_id });
        if (!user) {
            res.status(404).json({ message: `User not found: ${user_id}` });
            return;
        }
        // Update user's profile fields to request values
        const updatedUser = yield User_1.User.findOneAndUpdate({ user_id: user_id }, {
            $set: {
                username: username,
                bio: bio,
                pronouns: pronouns,
                picture: picture,
                settings: settings
            },
            $push: {
                tags: { $each: [tags] }
            }
        }, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(500).json({ error: 'Error editing profile' });
    }
}));
// GET: Get current user's information
router.get('/self', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const user = yield User_1.User.findOne({ user_id: req.user.user_id });
        res.json(user); // Send the user's name (or 'username' field)
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
// GET: Get all user informatione except self
router.get('/all', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the user is authenticated
        const currentUser = req.user;
        console.log("currentser", currentUser);
        if (!currentUser) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        // Query to fetch all users excluding the current authenticated user
        const users = yield User_1.User.find({ user_id: { $ne: currentUser === null || currentUser === void 0 ? void 0 : currentUser.user_id } });
        // Respond with the list of users excluding the current user
        res.json(users);
    }
    catch (error) {
        next(error); // Pass the error to the global error handler
    }
}));
exports.default = router;
