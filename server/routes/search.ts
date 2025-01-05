import express, {Request, Response} from 'express';
import Post from '../models/Post';
import {levenshteinEditDistance} from 'levenshtein-edit-distance';

const router = express.Router();

// GET: Find posts by name
router.get('/posts', async (req, res) => {
    try {
        const query = req.query.query;
        const tags = req.query.tags ? (req.query.tags as string).split(','):null;
        const relevance = req.query.relevance;
        let results = await Post.find().sort({likes: -1});
        
        if (!query && !tags && !relevance){
            res.json(results);
            return;
        }
        
        if(tags){
            results = await Post.aggregate([
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
                    $sort:{
                        likes: -1,
                        matchCount: -1,
                    }
                },
                {
                    $project: {
                        matchingTagsCount: 0
                    }
                }
            ]);
        }

        if (query){
            results = results?.filter(post => {
                return levenshteinEditDistance(query as string, post.title) <= 2;
            });
        };
        

        res.json(results);
    } catch (err){
        res.status(500).json({ error: 'Error searching' });
    }
})

export default router;