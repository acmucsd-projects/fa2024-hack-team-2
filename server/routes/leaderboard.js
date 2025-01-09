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
 * @route GET /leaderboard
 * @desc Retrieve the leaderboard
 * @access Public
 *
 * This endpoint allows users to retrieve the leaderboard, which lists users (up to 7) sorted by their total likes in descending order.
 *
 * Response:
 * - 200: Leaderboard retrieved successfully.
 *   - The response includes the list of users sorted by total likes.
 * - 500: Internal server error.
 *   - The response includes an error message indicating the failure to fetch the leaderboard.
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leaderboard = yield User_1.User.find({}, 'picture user_id username totalLikes').sort({ totalLikes: -1 }).limit(7);
        res.status(200).json(leaderboard);
    }
    catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Error fetching leaderboard' });
    }
}));
exports.default = router;
