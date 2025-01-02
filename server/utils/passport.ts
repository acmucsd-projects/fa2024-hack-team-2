import passport from 'passport';
import { GoogleCallbackParameters, Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import {User} from '../models/User';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
    },
    async (accessToken:string, refreshToken:string, params:GoogleCallbackParameters,profile: Profile, done: VerifyCallback) => {
      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ user_id: profile.id });
        if (!user) {
          // Create and save a new user with only googleID and username
          user = new User({
            user_id: profile.id,
            username: profile.displayName || profile.name?.givenName || 'Unknown User',
            token: params.id_token
          })
          
          await user.save();
        }
        await user.updateOne({token: params.id_token});
        // Return the user for further processing
        return done(null, { user_id: user.user_id, username: user.username });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user as Express.User);
});

export default passport;
