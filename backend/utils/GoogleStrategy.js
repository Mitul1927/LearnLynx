const { LoginWithGoogle } = require("../Controller/userController");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

exports.GoogleProvider = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  },
  async function (accessToken, refreshToken, profile, cb) {
    // cb(null, profile);
    await LoginWithGoogle(profile, cb);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
);
