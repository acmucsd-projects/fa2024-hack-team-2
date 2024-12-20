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
// Callback route for Google OAuth
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Successful authentication, redirects to index
    res.redirect('/');
});
router.get('/protected', isLoggedIn, (req, res) => {
    res.send('protected route');
});
exports.default = router;
