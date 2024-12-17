import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


// GOOGLE_CALLBACK_URL is currently "http://localhost:3000/auth/google/callback"
passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log('User profile:', profile);
        done(null, profile);
      }
    )
  );

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
});