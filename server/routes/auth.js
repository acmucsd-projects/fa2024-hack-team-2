"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
/**
 * @route GET /
 * @description Default route for authentication module.
 * @access Public
 */
router.get('/', (req, res) => {
    res.send('auth route');
});
/**
 * @route GET /google
 * @description Redirect user to Google OAuth for authentication.
 * @access Public
 */
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
/**
 * @route GET /google/callback
 * @description Google OAuth callback route.
 * @access Public
 */
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
/**
 * @route GET /logout
 * @description Logout route to end user session and redirect to home or login page.
 * @access Public
 */
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Error destroying session');
            }
            res.status(200).send('Logged out successfully');
        });
    });
});
exports.default = router;
