import express, { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/User';

const router = express.Router();

router.get('/users/test', (req: Request, res: Response, next: NextFunction) => {
  res.send('users route');
});

// Find user by user_id
router.get('/users/:user_id', async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ user_id: req.params.user_id }); // Use findOne for custom user_id
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Error fetching user' });
    }
  });
  
// POST: Create a new user
router.post('/users', async (req: Request, res: Response) => {
  try {
    const { user_id, username, bio, pronouns, tags, picture, settings } = req.body;

    const newUser = new User({
      user_id,
      username,
      bio,
      pronouns,
      tags,
      followList: [],
      followers: 0,
      following: 0,
      wishlist: [],
      posts: [],
      liked: [],
      disliked: [],
      picture,
      settings,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: 'Error creating user', details: error });
  }
});

// POST: Follow user
router.post('/follow', async (req: Request, res: Response) => {
  if(!req.user){
    res.status(401).json({message: `Unauthorized`});
    return;
  }
  try {
    // Get IDs from req
    const currUser = (req.user as IUser).user_id;
    const { follow_user_id } = req.body;

    // Find users from database using IDs
    const user_to_follow = await User.findOne({user_id: follow_user_id });
    const user = await User.findOne({ user_id: currUser });

    // If either user doesn't exist, send an error
    if(!user){
      res.status(404).json({ message: `Curr user not found: ${currUser}` });
      return;
    }

    if (!user_to_follow){
      res.status(404).json({ message: `User to follow not found: ${follow_user_id}`});
      return;
    }

    // If user already follows, then unfollow
    if(user.followList.includes(follow_user_id)){
      // Remove the followed user from follow list
      await user.updateOne({$set:{followList: user.followList.filter(id => id !== follow_user_id)}});

      // Update fields accordingly
      await user.updateOne({ $inc: {following: -1 }});
      await user_to_follow.updateOne({ $inc: {followers: -1 }});

    } else {
      // If user isn't following, then follow
      await user.updateOne({ $inc: {following: 1} });
      await user_to_follow?.updateOne({ $inc : {followers: 1} });
      
      // Add user to follow to the follow list
      user.followList.push(follow_user_id);
    }

    // Save the new information of both users
    await user.save(), user_to_follow.save()
    
    res.status(200).json({ message: `Followed successfully. User's follows: ${user.following}. User to follow's followers: ${user_to_follow.followers}`});
  } catch (err){
    res.status(500).json({ message: 'Following error occurred:', err});
  }
});

// PATCH: Edit profile 
router.patch('/profile', async (req, res) => {
  if(!req.user){
    res.status(401).json({message: `Unauthorized`});
    return;
  }
  try {
    // Get profile fields from request
    const {bio, pronouns, tags, picture, settings} = req.body;

    // Find user in database
    const user_id = (req.user as IUser).user_id;
    const user = await User.findOne({user_id: user_id});

    if(!user){
      res.status(404).json({message: `User not found: ${user_id}`});
      return;
    }
    // Update user's profile fields to request values
    const updatedUser = await User.findOneAndUpdate({user_id: user_id}, {
      $set: {
        bio: bio,
        pronouns: pronouns,
        tags: tags,
        picture: picture,
        settings: settings
      }
    }, {new: true});
    res.status(200).json(updatedUser);
  } catch (err){
    res.status(500).json({error: 'Error editing profile'});
  }
})

export default router;
