import express, {Request, Response} from 'express';
import Post from '../models/Post';
import { User } from '../models/User';
import {levenshteinEditDistance} from 'levenshtein-edit-distance';
import { SortOrder } from 'mongoose';
const router = express.Router();

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

router.get('/posts', async (req, res) => {
    if(!req.query.query){
        res.status(400).json({message: 'Search not specified'});
        return;
    };
    try {
        const query = req.query.query;
        const tags = req.query.tags ? (req.query.tags as string).split(','):null;
        const relevance = req.query.relevance as string;

        const sortOptions: {[key: string]: {[key:string]: SortOrder}} = {
            'priceHigh': {Price: -1},
            'priceLow': {Price: 1},
            'recent': {date: -1},
            'oldest': {date: 1},
            'likes': {likes: -1}
        };

        let sortBy;
        let results = await Post.find().sort({likes: -1});
        
        if (!query && !tags && !relevance){
            res.status(200).json(results);
            return;
        }

        if (relevance && relevance as string in sortOptions){
            sortBy = sortOptions[relevance];
        } else{
            sortBy = sortOptions['likes'] // If no specified relevance, then default to likes
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
                        matchCount: -1,
                        ...(relevance && relevance in sortOptions
                            ? sortOptions[relevance]
                            : {likes: -1}
                        )
                        
                    }
                },
                {
                    $project: {
                        matchCount: 0
                    }
                }
            ]);
        } else {
            results = await Post.find().sort(sortBy);
        }

        if (query){
            results = results?.filter(post => {
                return levenshteinEditDistance(query as string, post.title) <= 4;
            });
        };
        
        if(!results[0]){
            res.status(400).json({message: 'No posts found'});
            return;
        }

        res.status(200).json(results);
    } catch (err){
        res.status(500).json({ error: 'Error searching for posts' });
    }
})

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

router.get('/users', async(req, res) => {
    if(!req.query.query){
        res.status(400).json({message: 'Search not specified'});
        return;
    };
    try {
        const allUsers = await User.find().sort({followers: -1});

        if(!req.query.query){
            res.status(200).json(allUsers);
            return;
        }
        const query = (req.query.query as string).replace('@', '').replace(/\s/g, "").toLowerCase();

        const results = allUsers.filter(user => {
            return levenshteinEditDistance(query, user.username.toLowerCase()) <= 3;
        })

        if (!results[0]){
            res.status(400).json({message: `No user found: ${query}`});
            return;
        }
        res.status(200).json(results);
    } catch(err){
        res.status(500).json({error: 'Error searching for users'})
    }
})
export default router;