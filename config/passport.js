const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/User');

// Serialize/deserialize user (for session, not JWT)
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'GOOGLE_CLIENT_SECRET',
    callbackURL: '/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
            user = await User.create({
                username: profile.displayName.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random()*10000),
                email: profile.emails[0].value,
                profilePicture: profile.photos[0].value,
                password: Math.random().toString(36).slice(-8) // random password
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || 'GITHUB_CLIENT_ID',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'GITHUB_CLIENT_SECRET',
    callbackURL: '/api/auth/github/callback',
    scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // GitHub may not provide email directly
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.username}@github.com`;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                username: profile.username,
                email,
                profilePicture: profile.photos[0] ? profile.photos[0].value : 'default-avatar.png',
                password: Math.random().toString(36).slice(-8)
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID || 'FACEBOOK_CLIENT_ID',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'FACEBOOK_CLIENT_SECRET',
    callbackURL: '/api/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
            user = await User.create({
                username: profile.displayName.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random()*10000),
                email: profile.emails[0].value,
                profilePicture: profile.photos[0].value,
                password: Math.random().toString(36).slice(-8)
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

// Twitter OAuth Strategy
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY || 'TWITTER_CONSUMER_KEY',
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'TWITTER_CONSUMER_SECRET',
    callbackURL: '/api/auth/twitter/callback',
    includeEmail: true
}, async (token, tokenSecret, profile, done) => {
    try {
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.username}@twitter.com`;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                username: profile.username,
                email,
                profilePicture: profile.photos[0] ? profile.photos[0].value : 'default-avatar.png',
                password: Math.random().toString(36).slice(-8)
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

module.exports = passport; 