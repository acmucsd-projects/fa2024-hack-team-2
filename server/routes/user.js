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
/**
 * @route GET /
 * @desc Get user information
 * @access Private
 *
 * This endpoint allows a user to view another user's information.
 *
 * Request Body:
 * - user_id: The ID of the user to view. (required)
 *
 * Response:
 * - 200: The user was successfully found and their information was retrieved.
 * - 404: The specified user was not found.
 * - 500: Internal server error.
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.body.user_id;
        const user = yield User_1.User.findOne({ user_id: user_id });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        if (req.user) {
            const currUser = yield User_1.User.findOne({ user_id: req.user.user_id });
            yield (currUser === null || currUser === void 0 ? void 0 : currUser.updateOne({ $pull: { viewedUsers: user_id } }));
            yield (currUser === null || currUser === void 0 ? void 0 : currUser.updateOne({ $push: {
                    viewedUsers: { $each: [user_id], $position: 0 }
                } }));
            yield (currUser === null || currUser === void 0 ? void 0 : currUser.save());
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Error fetching user' });
    }
}));
/**
 * WIP
 */
router.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
/**
 * @route PATCH /follow
 * @desc Follow a user
 * @access Private
 *
 * This endpoint allows authenticated users to follow other users on the site. If they
 * are already following the user, it will allow them to unfollow.
 *
 * Request Body:
 * - follow_user_id: The desired user's ID.
 *
 * Request User:
 * - req.user.user_id: The current user's ID.
 *
 * Response:
 * - 200: The user followed/unfollowed successfully.
 * - 401: Unauthorized
 * - 404: Error finding a user.
 * - 500: Internal server error.
 */
router.patch('/follow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ message: `Unauthorized` });
        return;
    }
    try {
        const currUser = req.user.user_id;
        const { follow_user_id } = req.body;
        const user_to_follow = yield User_1.User.findOne({ user_id: follow_user_id });
        const user = yield User_1.User.findOne({ user_id: currUser });
        if (!user) {
            res.status(404).json({ message: `Curr user not found: ${currUser}` });
            return;
        }
        if (!user_to_follow) {
            res.status(404).json({ message: `User to follow not found: ${follow_user_id}` });
            return;
        }
        if (user.followList.includes(follow_user_id)) {
            yield user.updateOne({ $set: { followList: user.followList.filter(id => id !== follow_user_id) } });
            yield user.updateOne({ $inc: { following: -1 } });
            yield user_to_follow.updateOne({ $inc: { followers: -1 } });
        }
        else {
            yield user.updateOne({ $inc: { following: 1 } });
            yield (user_to_follow === null || user_to_follow === void 0 ? void 0 : user_to_follow.updateOne({ $inc: { followers: 1 } }));
            user.followList.push(follow_user_id);
        }
        yield user.save(), user_to_follow.save();
        res.status(200).json({ user, user_to_follow });
    }
    catch (err) {
        res.status(500).json({ message: 'Following error occurred:', err });
    }
}));
/**
 * @route PATCH /profile
 * @desc Edit profile
 * @access Private
 *
 * This endpoint allows the user to edit their profile.
 *
 * Request Body:
 * - username: The user's desired username. (required)
 * - bio: The user's biography. (optional)
 * - tags: Categories the user is interested in. (optional)
 * - pronouns: The user's pronouns. (optional)
 * - picture: The user's profile picture. (optional)
 * - settings The user's desired account settings. (optional)
 *
 * Responses:
 * - 200: The profile was updated successfully.
 * - 400: Username was taken.
 * - 401: Unauthorized.
 * - 404: The user was not found.
 * - 500: Internal server error.
 *
 */
router.patch('/profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ message: `Unauthorized` });
        return;
    }
    try {
        const { username, bio, tags, pronouns, picture, settings } = req.body;
        const user_id = req.user.user_id;
        const user = yield User_1.User.findOne({ user_id: user_id });
        if (yield User_1.User.findOne({ username: username, user_id: { $ne: user_id } })) {
            res.status(400).json({ message: `Username taken: ${username}` });
            return;
        }
        ;
        if (!user) {
            res.status(404).json({ message: `User not found: ${user_id}` });
            return;
        }
        if (tags) {
            if (user.tags.includes(tags)) {
                yield User_1.User.findOneAndUpdate({ user_id: user_id }, {
                    $pull: { tags: tags }
                }, { new: true });
            }
            else {
                yield User_1.User.findOneAndUpdate({ user_id: user_id }, {
                    $push: { tags: { $each: [tags] } }
                }, { new: true });
            }
        }
        const updatedUser = yield User_1.User.findOneAndUpdate({ user_id: user_id }, {
            $set: {
                username: username,
                bio: bio,
                pronouns: pronouns,
                picture: picture,
                settings: settings
            }
        }, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(500).json({ error: 'Error editing profile' });
    }
}));
/**
 * @route GET /self
 * @desc Get the user's information
 * @access Private
 *
 * This endpoint allows an authorized user to obtain their information
 *
 * Request User:
 * - req.user.user_id: The current user's user ID.
 *
 * Response:
 * - 200: User information was retrieved successfully.
 * - 401: Unauthorized.
 */
router.get('/self', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const user = yield User_1.User.findOne({ user_id: req.user.user_id });
        res.status(200).json(user);
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
/**
 * @route GET /all
 * @desc Get all user's information except self
 * @access Private
 *
 * This endpoint allows an authorized user to retrieve information of all users except self by
 * querying the users in the database.
 *
 * Request User:
 * - currentUser: The user of the request
 *
 * Responses:
 * - 200: All user information retrieved successfully.
 * - 401: Unauthorized.
 */
router.get('/all', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = req.user;
        console.log("currentser", currentUser);
        if (!currentUser) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const users = yield User_1.User.find({ user_id: { $ne: currentUser === null || currentUser === void 0 ? void 0 : currentUser.user_id } });
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
}));
/**
 * @route GET /history
 * @desc View user's history
 * @access Private
 *
 * Allows an authenticated user to view their viewed user history.
 *
 * Request User:
 * - req.user.user_id: The user's user ID
 *
 * Response:
 * - 200: Retrieved history data successfully.
 * - 400: No users were found in history.
 * - 401: Unauthorized
 * - 404: User not found
 * - 500: Internal server error
 */
router.get('/history', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    try {
        const user = yield User_1.User.findOne({ user_id: req.user.user_id });
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        const history = user === null || user === void 0 ? void 0 : user.viewedUsers;
        if (!history[0]) {
            res.status(400).json({ message: "No recently viewed users found" });
            return;
        }
        const viewedUsers = yield Promise.all(history.map(user_id => { return User_1.User.findOne({ user_id: user_id }); }));
        res.status(200).json(viewedUsers);
    }
    catch (err) {
        res.status(500).json({ err: "Error fetching user history" });
    }
}));
/**
 * @route PATCH /history/clear
 * @desc Allows user to clear history
 * @access Private
 *
 * This endpoint allows an authenticated user to clear their viewed user history.
 *
 * Request User:
 * - req.user.user_id: The user's user ID.
 *
 * Response:
 * - 200: The post history was clear successfully.
 * - 401: Unauthorized.
 * - 404: User was not found.
 * - 500: Internal server error
 */
router.patch('/history/clear', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ message: "Not authorized" });
        return;
    }
    try {
        const user_id = req.user.user_id;
        const result = yield User_1.User.findOneAndUpdate({ user_id: user_id }, { $set: { viewedUsers: [] } }, { new: true });
        if (!result) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User history cleared successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Error clearing user history" });
    }
}));
exports.default = router;
