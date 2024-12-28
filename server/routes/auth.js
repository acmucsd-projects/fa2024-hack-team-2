"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
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
exports.default = router;
