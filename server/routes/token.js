"use strict";
// import express, { Request, Response } from 'express';
// import { User } from '../models/User';
// import type { IUser } from '../models/User';
// const router = express.Router();
// function isLoggedIn(req: Request, res: Response, next: Function){
//     if (req.user){
//         next();
//     } else{
//         res.sendStatus(401);
//     }
// }
// router.get('/get-token', isLoggedIn, async (req, res) => {
//     try {
//         const user_id = (req.user as IUser).user_id;
//         const user = await User.findOne( {user_id: user_id});
//         if (!user){
//             res.sendStatus(404);
//             return;
//         }
//         res.json({token: user.token });
//     } catch (err){
//         console.error(err);
//         res.sendStatus(500);
//         return;
//     }
// })
// export default router;
