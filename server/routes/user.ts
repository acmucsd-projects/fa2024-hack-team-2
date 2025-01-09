import express, { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/User';
import Post from '../models/Post';
const router = express.Router();

/**
 * @route GET /
 * @desc Get user information
 * @access Private
 * 
 * This endpoint allows a user to view another user's information.
 * 
 * Request Body:
 * - user_id: The ID of the user to view. (required)
 * 
 * Response:
 * - 200: The user was successfully found and their information was retrieved.
 * - 404: The specified user was not found.
 * - 500: Internal server error.
 */

router.get('/', async (req: Request, res: Response) => {
    try {
      const user_id = req.params.user_id;
      const user = await User.findOne({ user_id: user_id }); 
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      if(req.user){
        const currUser = await User.findOne({user_id: (req.user as IUser).user_id});

        await currUser?.updateOne(
          {$pull: {viewedUsers: user_id}}
        )

        await currUser?.updateOne(
          {$push: {
            viewedUsers: {$each: [user_id], $position: 0}
          }}
        );

        await currUser?.save();
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Error fetching user' });
    }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username }); 
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // if(req.user){
    //   const currUser = await User.findOne({user_id: (req.user as IUser).user_id});

    //   await currUser?.updateOne(
    //     {$pull: {viewedUsers: username}}
    //   )

    //   await currUser?.updateOne(
    //     {$push: {
    //       viewedUsers: {$each: [user_id], $position: 0}
    //     }}
    //   );

    //   await currUser?.save();
    // }
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
 * @route PATCH /follow
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
router.patch('/follow', async (req: Request, res: Response) => {
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
    const user = await (req.user as IUser).user_id;
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

/**
 * @route GET /history
 * @desc View user's history
 * @access Private
 * 
 * Allows an authenticated user to view their viewed user history.
 * 
 * Request User:
 * - req.user.user_id: The user's user ID
 * 
 * Response:
 * - 200: Retrieved history data successfully.
 * - 201: No users were found in history.
 * - 401: Unauthorized
 * - 404: User not found
 * - 500: Internal server error
 */

router.get('/history', async(req, res) => {
  if (!req.user){
    res.status(401).json({error: 'Unauthorized'});
    return;
  }

  try {
    const user = await User.findOne({user_id: (req.user as IUser).user_id});
    if(!user){
      res.status(401).json({message: "User not found"});
      return;
    }
    const history = user?.viewedUsers;

    if(!history[0]){
      res.status(201).json({message: "No recently viewed users found"});
      return;
    }

    const viewedUsers = await Promise.all(
      history.map(user_id => {return User.findOne({user_id: user_id})})
    )

    res.status(200).json(viewedUsers);
  } catch (err){
    res.status(500).json({err: "Error fetching user history"});
  }
})

/**
 * @route PATCH /history/clear
 * @desc Allows user to clear history
 * @access Private
 * 
 * This endpoint allows an authenticated user to clear their viewed user history.
 * 
 * Request User:
 * - req.user.user_id: The user's user ID.
 * 
 * Response:
 * - 200: The post history was clear successfully.
 * - 401: Unauthorized.
 * - 404: User was not found.
 * - 500: Internal server error
 */

router.patch('/history/clear', async(req, res) => {
  if (!req.user){
    res.status(401).json({message: "Not authorized"});
    return;
  }

  try{
    const user_id = (req.user as IUser).user_id;
    const result = await User.findOneAndUpdate(
      {user_id: user_id},
      {$set: {viewedUsers: []}},
      {new: true}
    );

    if(!result){
      res.status(404).json({message: "User not found"});
      return;
    }
    res.status(200).json({message: "User history cleared successfully"});
  } catch (error){
    res.status(500).json({error: "Error clearing user history"});
  }
})

/**
 * @route GET /feed
 * @desc Create feed for the user.
 * @access Private
 * 
 * This endpoint creates a randomized feed for the user. If the user views a post, it will
 * not show up in the feed.
 * 
 * Request:
 * - user: The authenticated user.
 * - user.user_id: The ID of the authenticated user.
 * 
 * Response:
 * - 200: Successfully retrieved the next random post.
 * - 201: No unseen posts were found.
 * - 401: Not authenticated.
 * - 500: Internal server error.
 */

router.get('/feed', async(req, res) => {
  if(!req.user){
    res.status(401).json({message: "Unauthorized"});
    return;
  }
  try {
    const user_id = (req.user as IUser).user_id;
    const user = await User.findOne({ user_id: user_id });

    const randomPost = await Post.aggregate([
      {
        $match: {
          _id: {$nin: user?.viewedPosts}  // temporarily editing this for testing purposes
        }
      },
      {$sample: {size: 1}}
    ]);

    if(!randomPost[0]){
      res.status(201).json({message: "No unseen posts found"});
      return;
    }
``
    await User.findOneAndUpdate({user_id: user_id}, {$push: {viewedPosts: randomPost[0]._id}});

    res.status(200).json(randomPost[0])
  } catch(error){
    res.status(500).json({message: "Error retrieving post feed"});
  }
})
export default router;
