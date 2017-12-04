// var FACEBOOK_APP_ID = '387547795014120';
// var FACEBOOK_APP_SECRET = 'bba8f6f663f5c2484ad2d6f66da570f0';
var FACEBOOK_APP_ID = '524845611226910';
var FACEBOOK_APP_SECRET = '9b238c24e9cef9d05840de0aef5c285f';


passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    profileFields: ['id', 'emails', 'name','displayName'],
    callbackURL: global["env"].realHost + "/api/User/loginFacebook" 
  },
  function(accessToken, refreshToken, profile, cb) {
  
    profile.AccessToken = accessToken;
    profile.RefreshToken = refreshToken;
    return cb(profile);
    
  }
));