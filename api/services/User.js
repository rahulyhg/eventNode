var generator = require('generate-password');
var schema = new Schema({
    // name: {
    //     type: String,
    //     required: true,
    //     excel: true,
    // },
    // email: {
    //     type: String,
    //     validate: validators.isEmail(),
    //     excel: "User Email",
    //     unique: true
    // },
    // dob: {
    //     type: Date,
    //     excel: {
    //         name: "Birthday",
    //         modify: function (val, data) {
    //             return moment(val).format("MMM DD YYYY");
    //         }
    //     }
    // },
    // photo: {
    //     type: String,
    //     default: "",
    //     excel: [{
    //         name: "Photo Val"
    //     }, {
    //         name: "Photo String",
    //         modify: function (val, data) {
    //             return "http://abc/" + val;
    //         }
    //     }, {
    //         name: "Photo Kebab",
    //         modify: function (val, data) {
    //             return data.name + " " + moment(data.dob).format("MMM DD YYYY");
    //         }
    //     }]
    // },
    // password: {
    //     type: String,
    //     default: ""
    // },
    // forgotPassword: {
    //     type: String,
    //     default: ""
    // },
    // mobile: {
    //     type: String,
    //     default: ""
    // },
    // otp: {
    //     type: String,
    //     default: ""
    // },
    // accessToken: {
    //     type: [String],
    //     index: true
    // },
    // googleAccessToken: String,
    // googleRefreshToken: String,
    // oauthLogin: {
    //     type: [{
    //         socialId: String,
    //         socialProvider: String
    //     }],
    //     index: true
    // },
    // accessLevel: {
    //     type: String,
    //     default: "User",
    //     enum: ['User', 'Admin']
    // }
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    country: {
        type: String
    },
    userType: {
        type: Schema.Types.ObjectId,
        ref: "UserType",
        index: "true"
    },


    accessToken: {
        type: [String],
        index: true
    },
    socialAccessToken: String,
    socialRefreshToken: String,
    oauthLogin: {
        type: [{
            socialId: String,
            socialProvider: String
        }],
        index: true
    },
    accessLevel: {
        type: String,
        default: "User",
        enum: ['User', 'Admin']
    },
    loginProvider:String
});

schema.plugin(deepPopulate, {
    Populate: {
        'userType': {
            select: '_id name'
        },

        // 'resumeId': {
        //     select: ''
        // }

    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('User', schema);
var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "userType", "userType"));
var model = {

    existsSocial: function (user, callback) {
        var Model = this;
        var userEmail = '';
        Model.findOne({
        
            "oauthLogin.socialId": user.id,
            "oauthLogin.socialProvider": user.provider,
        }).exec(function (err, data) {
            if (err) {
                callback(err, data);
            } else if (_.isEmpty(data)) {
                if (user.emails && user.emails.length > 0) {
                    userEmail = user.emails[0].value;
                 
                }
                Model.findOne({'emailId':userEmail},function(err,userData){
                             if(err){
                            console.log(err);
                             }
                          if(_.isEmpty(userData)){
                            var modelUser = {
                                name: user.name.givenName,
                                lastName: user.name.familyName,
                                emailId: userEmail,
                                accessToken: [uid(16)],
                                loginProvider:user.provider,
                                oauthLogin: [{
                                    socialId: user.id,
                                    socialProvider: user.provider,
                                }]
                            };
                            
                            modelUser.socialAccessToken = user.AccessToken;
                            modelUser.socialRefreshToken = user.RefreshToken;
                            if (user.image && user.image.url) {
                                modelUser.photo = user.image.url;
                            }
                            Model.saveData(modelUser, function (err, data2) {
                                if (err) {
                                    callback(err, data2);
                                } else {
                                    data3 = data2.toObject();
                                    delete data3.oauthLogin;
                                    delete data3.password;
                                    delete data3.forgotPassword;
                                    delete data3.otp;
                                    callback(err, data3);
                                }
                            });
                          }else{
                              console.log(userData.oauthLogin);
                            userData.oauthLogin.push({socialId:user.id, socialProvider: user.provider});
                            userData.loginProvider = user.provider;
                            userData.socialAccessToken = user.AccessToken;
                            userData.socialRefreshToken = user.RefreshToken;
                            userData.save(function(err, savedData){
                                delete savedData.oauthLogin;
                                delete savedData.password;
                                delete savedData.forgotPassword;
                                delete savedData.otp;
                                callback(err,savedData);
                            });
                          }   
                });

                
            } else {
                delete data.oauthLogin;
                delete data.password;
                delete data.forgotPassword;
                delete data.otp;

                console.log(" ============ user.googleAccessToken",user.AccessToken);
                data.loginProvider = user.provider;
                data.socialAccessToken = user.AccessToken;
                data.save(function () {});
                callback(err, data);
            }
        });
    },

// existsSocial: function (user, callback) {
//         var Model = this;
//         var userEmail = '';
//         Model.findOne({
//             "oauthLogin.socialId": user.id,
//             "oauthLogin.socialProvider": user.provider,
//         }).exec(function (err, data) {
//             if (err) {
//                 callback(err, data);
//             } else if (_.isEmpty(data)) {
//                 if (user.emails && user.emails.length > 0) {
//                     userEmail = user.emails[0].value;
//                 }
//                 Model.findOne({
//                     'email': userEmail
//                 }, function (err, userData) {
//                     if (err) {
//                         console.log(err);
//                     }
//                     if (_.isEmpty(userData)) {
//                         var modelUser = {
//                             name: user.displayName,
//                             email: userEmail,
//                             accessToken: [uid(16)],
//                             loginProvider: user.provider,
//                             oauthLogin: [{
//                                 socialId: user.id,
//                                 socialProvider: user.provider,
//                             }]
//                         };
//                         if (user.emails && user.emails.length > 0) {
//                             modelUser.email = user.emails[0].value;
//                             var envEmailIndex = _.indexOf(env.emails, modelUser.email);
//                             if (envEmailIndex >= 0) {
//                                 modelUser.accessLevel = "Admin";
//                             }
//                         }
//                         modelUser.socialAccessToken = user.AccessToken;
//                         modelUser.socialRefreshToken = user.RefreshToken;
//                         if (user.image && user.image.url) {
//                             modelUser.photo = user.image.url;
//                         }
//                         Model.saveData(modelUser, function (err, data2) {
//                             if (err) {
//                                 callback(err, data2);
//                             } else {
//                                 data3 = data2.toObject();
//                                 delete data3.oauthLogin;
//                                 delete data3.password;
//                                 delete data3.forgotPassword;
//                                 delete data3.otp;
//                                 callback(err, data3);
//                             }
//                         });
//                     } else {
//                         console.log(userData.oauthLogin);
//                         userData.oauthLogin.push({
//                             socialId: user.id,
//                             socialProvider: user.provider
//                         });
//                         userData.loginProvider = user.provider;
//                         userData.socialAccessToken = user.AccessToken;
//                         userData.socialRefreshToken = user.RefreshToken;
//                         userData.save(function (err, savedData) {
//                             delete savedData.oauthLogin;
//                             delete savedData.password;
//                             delete savedData.forgotPassword;
//                             delete savedData.otp;
//                             callback(err, savedData);
//                         });
//                     }
//                 });
//             } else {
//                 delete data.oauthLogin;
//                 delete data.password;
//                 delete data.forgotPassword;
//                 delete data.otp;
//                 console.log(" ============ user.googleAccessToken", user.AccessToken);
//                 data.loginProvider = user.provider;
//                 data.socialAccessToken = user.AccessToken;
//                 data.save(function () {});
//                 callback(err, data);
//             }
//         });
//     },




    profile: function (data, callback, getGoogle) {
        var str = "name email photo mobile accessLevel loginProvider";
        if (getGoogle) {
            str += " googleAccessToken googleRefreshToken";
        }
        User.findOne({
            accessToken: data.accessToken
        }, str).exec(function (err, data) {
            if (err) {
                callback(err);
            } else if (data) {
                callback(null, data);
            } else {
                callback("No Data Found", data);
            }
        });
    },
    updateAccessToken: function (id, accessToken) {
        User.findOne({
            "_id": id
        }).exec(function (err, data) {
            data.googleAccessToken = accessToken;
            data.save(function () {});
        });
    },

    getUser: function (data, callback) {

        User.find({
            name: data.name
        }).exec(function (err, found) {
            console.log("Found: ", found);
            if (err) {
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback(null, "noDataound");
            } else {

                callback(null, found);
            }

        });
    },


   
   
   
    saveUserData: function (data, callback) {
        async.waterfall([
                function (cbWaterfall) {
                    data.accessToken = generator.generate({
                        length: 16,
                        numbers: true
                    })
                    User.saveData(data, function (err, complete) {
                        if (err) {
                            cbWaterfall(err, null);
                        } else {
                            if (_.isEmpty(complete)) {
                                cbWaterfall(null, []);
                            } else {
                                console.log("complete", complete);
                                cbWaterfall(null, complete);
                            }
                        }
                    });
                },
                function (complete, cbWaterfall1) {
                    var emailData = {};
                    console.log("data: ", data);
                    emailData.email = data.emailId;
                    emailData.from = "eventsrising@gmail.com";
                    emailData.filename = "verification.ejs";
                    emailData.subject = "Account Verification Mail";
                     emailData._id =complete._id;
                    console.log("emaildata", emailData);

                    Config.email(emailData, function (err, emailRespo) {
                        if (err) {
                            console.log(err);
                            cbWaterfall1(null, err);
                        } else if (emailRespo) {
                            cbWaterfall1(null, emailRespo);
                        } else {
                            cbWaterfall1(null, "Invalid data");
                        }
                    });
                },
            ],
            function (err, data2) {
                if (err) {
                    console.log(err);
                    callback(null, []);
                } else if (data2) {
                    if (_.isEmpty(data2)) {
                        callback(null, []);
                    } else {
                        callback(null, data2);
                    }
                }
            });
    },
    loginToken: function (data, callback) {
        async.waterfall([
            function (callback) {
                User.findOne({
                    emailId: data.emailId,
                    password: data.password,
                }).exec(function (err, found) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else if (found) {
                        console.log("found", found);
                        if (_.isEmpty(found.accessToken) || found.accessToken == " ") {
                            data.tokenExist = false;
                            callback(null, data);
                        } else {
                            data.tokenExist = true;
                            callback(null, data);
                        }

                    }
                });
            },
            function (data, callback) {
                if (data.tokenExist == false) {
                    var token = generator.generate({
                        length: 16,
                        numbers: true
                    })
                    var matchToken = {
                        $set: {
                            accessToken: token
                        }
                    }
                    User.update({
                        emailId: data.emailId,
                        password: data.password,
                    }, matchToken).exec(function (err, data3) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                        } else if (data3) {
                            console.log("value :", data3);
                            callback(null, data3);
                        }
                    });
                } else {
                    var data3 = data;
                    callback(null, data3);
                }
            },
            function (data3, callback) {
                console.log(data);
                User.findOne({
                    emailId: data.emailId,
                    password: data.password
                }).exec(function (err, found) {
                    if (err) {
                        callback(err, null);
                    } else if (_.isEmpty(found)) {
                        callback("Incorrect Login Details", null);
                    } else {
                        console.log("found", found);
                        callback(null, found);
                    }
                });
            }
        ], function (err, found) {
            if (found) {
                callback(null, found);
            } else {
                callback("Incorrect Login Details", null);
            }
        });

    },

    login: function (data, callback) {
        User.loginToken(data, function (err, complete) {
            if (err) {
                callback(err, null);
            } else {
                if (_.isEmpty(complete)) {
                    callback(null, "Data not found");
                } else {
                    callback(null, complete);
                }
            }
        });
    },


};
module.exports = _.assign(module.exports, exports, model);