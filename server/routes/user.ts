import express, { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/User';

const router = express.Router();

/**
 * @route GET /
 * @desc Get user information
 * @access Private
 * 
 * This endpoint allows an authenticated user to view a user's information.
 * 
 * Request Body:
 * - user_id: The ID of the user. (required)
 * 
 * Response:
 * - 200: The user was successfully found and their information was retrieved.
 * - 404: The specified user was not found.
 * - 500: Internal server error.
 */

router.get('/', async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ user_id: req.body.user_id }); 
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
  
/**
 * WIP
 */

router.post('/new', async (req: Request, res: Response) => {
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

/**
 * @route POST /follow
 * @desc Follow a user
 * @access Private
 * 
 * This endpoint allows authenticated users to follow other users on the site. If they
 * are already following the user, it will allow them to unfollow.
 * 
 * Request Body:
 * - follow_user_id: The desired user's ID.
 * 
 * Request User:
 * - req.user.user_id: The current user's ID.
 * 
 * Response:
 * - 200: The user followed/unfollowed successfully.
 * - 401: Unauthorized
 * - 404: Error finding a user.
 * - 500: Internal server error.
 */
router.post('/follow', async (req: Request, res: Response) => {
  if(!req.user){
    res.status(401).json({message: `Unauthorized`});
    return;
  }
  try {
    const currUser = (req.user as IUser).user_id;
    const { follow_user_id } = req.body;

    const user_to_follow = await User.findOne({user_id: follow_user_id });
    const user = await User.findOne({ user_id: currUser });

    if(!user){
      res.status(404).json({ message: `Curr user not found: ${currUser}` });
      return;
    }

    if (!user_to_follow){
      res.status(404).json({ message: `User to follow not found: ${follow_user_id}`});
      return;
    }

    if(user.followList.includes(follow_user_id)){
      await user.updateOne({$set:{followList: user.followList.filter(id => id !== follow_user_id)}});

      await user.updateOne({ $inc: {following: -1 }});
      await user_to_follow.updateOne({ $inc: {followers: -1 }});

    } else {
      await user.updateOne({ $inc: {following: 1} });
      await user_to_follow?.updateOne({ $inc : {followers: 1} });
      
      user.followList.push(follow_user_id);
    }

    await user.save(), user_to_follow.save()
    
    res.status(200).json({user, user_to_follow});
  } catch (err){
    res.status(500).json({ message: 'Following error occurred:', err});
  }
});

/**
 * @route PATCH /profile
 * @desc Edit profile
 * @access Private
 * 
 * This endpoint allows the user to edit their profile.
 * 
 * Request Body:
 * - username: The user's desired username. (required)
 * - bio: The user's biography. (optional)
 * - tags: Categories the user is interested in. (optional)
 * - pronouns: The user's pronouns. (optional)
 * - picture: The user's profile picture. (optional)
 * - settings The user's desired account settings. (optional)
 * 
 * Responses:
 * - 200: The profile was updated successfully.
 * - 400: Username was taken.
 * - 401: Unauthorized.
 * - 404: The user was not found.
 * - 500: Internal server error.
 * 
 */
router.patch('/profile', async (req, res) => {
  if(!req.user){
    res.status(401).json({message: `Unauthorized`});
    return;
  }
  try {
    const {username, bio, tags, pronouns, picture, settings} = req.body;

    const user_id = (req.user as IUser).user_id;
    const user = await User.findOne({user_id: user_id});

    if (await User.findOne({username: username, user_id: {$ne: user_id}})){
      res.status(400).json({message: `Username taken: ${username}`});
      return;
    };
    if(!user){
      res.status(404).json({message: `User not found: ${user_id}`});
      return;
    }

    if (tags){
      if(user.tags.includes(tags)){
        await User.findOneAndUpdate({user_id: user_id},{
          $pull: {tags: tags}
        }, {new: true});
      } else{
        await User.findOneAndUpdate({user_id: user_id},{
          $push: {tags: {$each: [tags]}}
        }, {new: true})
      }
    }
    const updatedUser = await User.findOneAndUpdate({user_id: user_id},{
      $set: {
        username: username,
        bio: bio,
        pronouns: pronouns,
        picture: picture,
        settings: settings
      }
    }, {new: true});

    res.status(200).json(updatedUser);
  } catch (err){
    res.status(500).json({error: 'Error editing profile'});
  }
});

/**
 * @route GET /self
 * @desc Get the user's information
 * @access Private
 * 
 * This endpoint allows an authorized user to obtain their information
 * 
 * Request User:
 * - req.user.user_id: The current user's user ID.
 * 
 * Response:
 * - 200: User information was retrieved successfully.
 * - 401: Unauthorized.
 */

router.get('/self', async (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    const user = await User.findOne({ user_id: (req.user as IUser).user_id});
    res.status(200).json(user);  
  } else {
    res.status(401).send('Unauthorized');
  }
});

/**
 * @route GET /all
 * @desc Get all user's information except self 
 * @access Private
 * 
 * This endpoint allows an authorized user to retrieve information of all users except self by
 * querying the users in the database.
 * 
 * Request User:
 * - currentUser: The user of the request
 * 
 * Responses:
 * - 200: All user information retrieved successfully.
 * - 401: Unauthorized.
 */

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentUser = req.user as IUser | undefined;
    console.log("currentser", currentUser)

    if (!currentUser) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const users = await User.find({ user_id: { $ne: currentUser?.user_id } });
    res.status(200).json(users);
  } catch (error) {
    next(error); 
  }
});

export default router;
