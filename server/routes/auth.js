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
const passport_1 = __importDefault(require("passport"));
const User_1 = require("../models/User");
const router = express_1.default.Router();
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}
router.get('/', (req, res, next) => {
    res.send('auth route');
});
// Redirect user to Google OAuth
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
// Google OAuth callback route
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    if (req.user) {
        console.log('User authenticated successfully:', req.user);
        return res.redirect('http://localhost:3000'); // Correct redirection
    }
    else {
        console.log("User not authenticated.");
        return res.redirect('/login'); // Fallback if no user object
    }
});
router.get('/protected', isLoggedIn, (req, res) => {
    res.send('protected route');
});
/**
 * @route /get-token
 * @desc Gets the user's ID token
 * @access Private
 *
 * This endpoint retrieves the authenticated user's ID token from the database.
 *
 * Request User:
 * - req.user.user_id: The user's user ID.
 *
 * Response:
 * - 200: Token was sent successfully.
 * - 404: User was not found in the database.
 * - 500: Internal server error.
 */
router.get('/get-token', isLoggedIn, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.user.user_id;
        const user = yield User_1.User.findOne({ user_id: user_id });
        if (!user) {
            res.sendStatus(404);
            return;
        }
        res.status(200).json({ token: user.token });
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
        return;
    }
}));
exports.default = router;
