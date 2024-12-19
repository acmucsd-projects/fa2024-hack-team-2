import { google } from "googleapis";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: process.env.REDIRECT_URI || '',
      },
      (accessToken, refreshToken, profile, done) => {
        console.log('Google profile:', profile);
        done(null, profile);
      }
    )
  );
  
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user as Express.User);
});
