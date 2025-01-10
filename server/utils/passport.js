"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
dotenv_1.default.config();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Check if the user already exists in the database
        // console.log(profile);
        let user = yield User_1.User.findOne({ user_id: profile.id });
        if (!user) {
            // Create and save a new user with only googleID and username
            let baseUsername = (profile.displayName || ((_a = profile.name) === null || _a === void 0 ? void 0 : _a.givenName) || 'Unknown_User').toLowerCase().replace(/\s+/g, '_');
            let username = baseUsername;
            let counter = 1;
            while (yield User_1.User.findOne({ username: username })) {
                username = `${baseUsername}_${counter}`;
                counter++;
            }
            user = new User_1.User({
                user_id: profile.id,
                username: username || ((_b = profile.name) === null || _b === void 0 ? void 0 : _b.givenName) || 'Unknown User',
                picture: profile._json.picture
            });
            yield user.save();
        }
        // Return the user for further processing
        return done(null, { user_id: user.user_id, username: user.username, picture: profile._json.picture });
    }
    catch (err) {
        return done(err);
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
exports.default = passport_1.default;
