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
const router = express_1.default.Router();
const User_1 = require("../models/User");
// This gets the current user's information, as of now just user_id
router.get('/self', (req, res, next) => {
    if (req.user) {
        res.json(req.user.user_id); // Send the user's name (or 'username' field)
    }
    else {
        res.status(401).send('Unauthorized');
    }
});
// This gets all users except the current user, useful for messaging feature
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
