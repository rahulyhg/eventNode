// LINKEDIN_API_KEY='81c6un6l8xgz4i';
// LINKEDIN_SECRET_KEY = 'B7eJ59CDKVQSM8HW';


LINKEDIN_API_KEY='815l2gpm4d4y8z';
LINKEDIN_SECRET_KEY = 'FSOOOZaeDh3x4ZRO';

passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_API_KEY,
    consumerSecret: LINKEDIN_SECRET_KEY,
    callbackURL: global["env"].realHost + '/api/User/loginLinkedIn',
    profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
  },
  function(token, tokenSecret, profile, done) {
    profile.AccessToken = token;
    profile.RefreshToken = tokenSecret;
    return done(profile);
  }
));