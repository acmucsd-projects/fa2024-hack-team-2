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
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
router.get('/users/test', (req, res, next) => {
    res.send('users route');
});
// Find user by user_id
router.get('/users/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ user_id: req.params.user_id }); // Use findOne for custom user_id
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
        const newUser = new User_1.default({
            user_id,
            username,
            bio,
            pronouns,
            tags,
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
exports.default = router;
