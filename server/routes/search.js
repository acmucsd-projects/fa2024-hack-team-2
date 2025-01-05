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
const levenshtein_edit_distance_1 = require("levenshtein-edit-distance");
const router = express_1.default.Router();
// GET: Find posts by name
router.get('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.query;
        const tags = req.query.tags ? req.query.tags.split(',') : null;
        const relevance = req.query.relevance;
        let results = yield Post_1.default.find().sort({ likes: -1 });
        if (!query && !tags && !relevance) {
            res.json(results);
            return;
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
                    $sort: {
                        likes: -1,
                        matchCount: -1
                    }
                },
                {
                    $project: {
                        matchingTagsCount: 0
                    }
                }
            ]);
        }
        if (query) {
            results = results === null || results === void 0 ? void 0 : results.filter(post => {
                return (0, levenshtein_edit_distance_1.levenshteinEditDistance)(query, post.title) <= 2;
            });
        }
        ;
        res.json(results);
    }
    catch (err) {
        res.status(500).json({ error: 'Error searching' });
    }
}));
exports.default = router;
