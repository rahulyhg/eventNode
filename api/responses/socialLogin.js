
module.exports = function (profile) {
    var req = this.req;
    var res = this.res;
    var sails = req._sails;
    if (_.isEmpty(profile)) {
        console.log(profile);
        res.callback("Error fetching profile in Social Login", profile);
        // res.serverError();
    } else {
        console.log('In Else', profile);
//for returnUrl//
if(req.session.returnUrl=="http://localhost:8080/#!/login")
{
    // req.session.returnUrl="http://localhost:8080/#/parampage?firstName="+profile._json.first_name+"&lastName="+profile._json.last_name+"&email="+profile._json.email;

req.session.returnUrl="http://localhost:8080/#/parampage?name="+profile.name.givenName+"&lastName="+profile.name.familyName+"&emailId="+profile.emails[0].value;

    console.log("res in returnurl",req.session.returnUrl);
}
else if(req.session.returnUrl=="http://event.wohlig.co.in/#!/login")
{

req.session.returnUrl="http://event.wohlig.co.in/#/parampage?name="+profile.name.givenName+"&lastName="+profile.name.familyName+"&emailId="+profile.emails[0].value;

console.log("res in returnurl",req.session.returnUrl);
}
//for returnUrl end//

        console.log("req.session.returnUrl", req.session.returnUrl)
        if (req.session.returnUrl) {
            console.log(profile);
            User.existsSocial(profile, function (err, data) {
                if (err || !data) {
                    res.callback(err, data);
                } else {
                    // if (data.accessLevel != "Admin") {
                    //     data.accessToken[0] = "AccessNotAvailable";
                    // }
                    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",req.session.returnUrl + "/" + data.accessToken[0]);
                 //   console.log(req.session.returnUrl + "/" + data.accessToken[0]);
                    // res.redirect("http://localhost:8080/#/skills");
                    res.redirect(req.session.returnUrl);
                    req.session.destroy(function () {});
                }
            });
        } else {
            User.existsSocial(profile, res.callback);
        }
    }
};


