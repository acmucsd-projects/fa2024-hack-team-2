"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const LoginMiddleware_1 = __importDefault(require("../utils/LoginMiddleware"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
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
router.get('/protected', LoginMiddleware_1.default, (req, res) => {
    res.send('protected route');
});
// Logout route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            res.status(500).send('Error logging out');
        }
        req.session.destroy((err) => {
            if (err) {
                res.status(500).send('Error destroying session');
            }
            res.redirect('/'); // Redirect to home page or login page
        });
    });
});
exports.default = router;
