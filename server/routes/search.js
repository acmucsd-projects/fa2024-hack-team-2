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
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = require("../models/User");
const levenshtein_edit_distance_1 = require("levenshtein-edit-distance");
const router = express_1.default.Router();
/**
 * @route GET /posts
 * @desc Search for a post
 * @access Public
 *
 * Allows a user regardless of authorization to search for posts. The search feature
 * has some degree of fuzziness to offer posts similar to the search. It has sorting
 * and filtering depending on selected tags and relevance. The default sort is by likes (high to low).
 *
 * Request Query:
 * - query: The name of the search.
 * - tags: The desired tags to filter by.
 * - relevance: The desired sorting of searches.
 *
 * Response:
 * - 200: Search was successfully completed and retrieved posts.
 * - 400: No post was found with the desired inputs or no search specified.
 * - 500: Internal server error.
 */
router.get('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.query) {
        res.status(400).json({ message: 'Search not specified' });
        return;
    }
    ;
    try {
        const query = req.query.query;
        const tags = req.query.tags ? req.query.tags.split(',') : null;
        const relevance = req.query.relevance;
        const sortOptions = {
            'priceHigh': { Price: -1 },
            'priceLow': { Price: 1 },
            'recent': { date: -1 },
            'oldest': { date: 1 },
            'likes': { likes: -1 }
        };
        let sortBy;
        let results = yield Post_1.default.find().sort({ likes: -1 });
        if (!query && !tags && !relevance) {
            res.status(200).json(results);
            return;
        }
        if (relevance && relevance in sortOptions) {
            sortBy = sortOptions[relevance];
        }
        else {
            sortBy = sortOptions['likes']; // If no specified relevance, then default to likes
        }
        if (tags) {
            results = yield Post_1.default.aggregate([
                {
                    $match: {
                        tags: { $in: tags }
                    }
                },
                {
                    $addFields: {
                        matchCount: {
                            $size: {
                                $setIntersection: [
                                    "$tags", tags
                                ]
                            }
                        }
                    }
                },
                {
                    $sort: Object.assign({ matchCount: -1 }, (relevance && relevance in sortOptions
                        ? sortOptions[relevance]
                        : { likes: -1 }))
                },
                {
                    $project: {
                        matchCount: 0
                    }
                }
            ]);
        }
        else {
            results = yield Post_1.default.find().sort(sortBy);
        }
        if (query) {
            results = results === null || results === void 0 ? void 0 : results.filter(post => {
                return (0, levenshtein_edit_distance_1.levenshteinEditDistance)(query, post.title) <= 4;
            });
        }
        ;
        if (!results[0]) {
            res.status(400).json({ message: 'No posts found' });
            return;
        }
        const postsWithBase64Images = results.map(post => (Object.assign(Object.assign({}, post === null || post === void 0 ? void 0 : post.toObject()), { images: post === null || post === void 0 ? void 0 : post.images.map(image => ({
                contentType: image.contentType,
                data: image.data.toString('base64')
            })) })));
        res.status(200).json(postsWithBase64Images);
    }
    catch (err) {
        res.status(500).json({ error: 'Error searching for posts' });
    }
}));
/**
 * @route GET /users
 * @desc Search for users.
 * @access Public
 *
 * Allows a user regardless of authorization to search for users by their username. Some degree of fuzziness
 * is implemented. Users need to input '@' at the beginning to search for users instead of posts. If no search
 * is specified, all users will be shown. The results are sorted by number of followers (high to low).
 *
 * Response:
 * - 200: Search was successful.
 * - 400: No user found or no search specified.
 * - 500: Internal server error.
 */
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.query) {
        res.status(400).json({ message: 'Search not specified' });
        return;
    }
    ;
    try {
        const allUsers = yield User_1.User.find().sort({ followers: -1 });
        if (!req.query.query) {
            res.status(200).json(allUsers);
            return;
        }
        const query = req.query.query.replace('@', '').replace(/\s/g, "").toLowerCase();
        const results = allUsers.filter(user => {
            return (0, levenshtein_edit_distance_1.levenshteinEditDistance)(query, user.username.toLowerCase()) <= 3;
        });
        if (!results[0]) {
            res.status(400).json({ message: `No user found: ${query}` });
            return;
        }
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500).json({ error: 'Error searching for users' });
    }
}));
exports.default = router;
