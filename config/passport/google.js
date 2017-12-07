// global["GoogleKey"] = "AIzaSyDMgwXi6D38isibUfShc9C2mJyaHZZ2LpE";
// global["GoogleclientId"] = "529279279497-hdm2ul03erq4kitk7qlqbf41h6pl8f7p.apps.googleusercontent.com";
// global["GoogleclientSecret"] = "nNZiqXW5U2364QI9--sVIR8B";


global["GoogleKey"] = "AIzaSyDMgwXi6D38isibUfShc9C2mJyaHZZ2LpE";
global["GoogleclientId"] = "634210333967-kdlb0m2l41nov648b5airo141nbs4ff7.apps.googleusercontent.com";
global["GoogleclientSecret"] = "i9OOssC2eIEMzGNq0hgFU40P";

// passport.use(new GoogleStrategy({
//         clientId: GoogleclientId,
//         clientSecret: GoogleclientSecret,
//         callbackURL: global["env"].realHost + "/api/user/loginGoogle",
//         accessType: "offline"
//     },
//     function (accessToken, refreshToken, profile, cb) {
//         profile.googleAccessToken = accessToken;
//         profile.googleRefreshToken = refreshToken;
//         return cb(profile);
//     }


passport.use(new GoogleStrategy({
        clientId: GoogleclientId,
        clientSecret: GoogleclientSecret,
        callbackURL: global["env"].realHost + "/api/User/loginGoogle",
        accessType: "offline"
    },
    function (accessToken, refreshToken, profile, cb) {
        profile.AccessToken = accessToken;
        profile.RefreshToken = refreshToken;
        console.log("profile11",profile);
        return cb(profile);
    }
));