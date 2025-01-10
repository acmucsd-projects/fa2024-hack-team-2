import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
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
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        // console.log(profile);
        let user = await User.findOne({ user_id: profile.id });
        
        if (!user) {
          // Create and save a new user with only googleID and username
          let baseUsername = (profile.displayName || profile.name?.givenName || 'Unknown_User').toLowerCase().replace(/\s+/g, '_');
          let username = baseUsername;
          let counter = 1

          while (await User.findOne({ username: username })){
            username = `${baseUsername}_${counter}`
            counter++;
          }

          user = new User({
            user_id: profile.id,
            username: username || profile.name?.givenName || 'Unknown User',
            picture: profile._json.picture
          });
          await user.save();
        }

        // Return the user for further processing
        return done(null, { user_id: user.user_id, username: user.username, picture: profile._json.picture });
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
