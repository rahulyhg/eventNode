module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    saveSkills: function (req, res) {
        if (req.body) {
            ResumeDetails.saveSkills(req.body, function (err, data) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });

                } else {
                    req.session.resumeDetails = data;
                    console.log("Resume Data", req.session.resumeDetails);
                    res.json({
                        value: true,
                        data: data
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    saveResumeDetails: function (req, res) {
        if (req.body) {
            ResumeDetails.saveResumeDetails(req.body, function (err, data) {
                if (err) {
                    res.json({
                        value: false,
                        data: err
                    });

                } else {
                    req.session.resumeDetails = data;
                    console.log("Resume Data", req.session.resumeDetails);
                    res.json({
                        value: true,
                        data: data
                    });
                }
            });
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    }


    // saveResumeDetails: function (req, res) {
    //     if (req.body) {
    //         ResumeDetails.saveResumeDetails(req.body, function (err, data) {
    //             if (err) {
    //                 res.json({
    //                     value: false,
    //                     data: err
    //                 });

    //             } else {
    //                 req.session.resumeDetails = data;
    //                 console.log("Resume Data", req.session.resumeDetails);
    //                 res.json({
    //                     value: true,
    //                     data: data
    //                 });
    //             }
    //         });
    //     } else {
    //         res.json({
    //             value: false,
    //             data: "Invalid Request"
    //         });
    //     }
    // },


    // updateResumeDetailsFirst: function (req, res) {
    //     if (req.body && req.body.accessToken) {
    //         ResumeDetails.updateResumeDetailsFirst(req.body, res.callback);
    //     } else {
    //         res.callback("Please provide Valid AccessToken", null);
    //     }
    // },

    // updateResumeDetailsOne: function (req, res) {
    //     if (req.body && req.body.accessToken) {
    //         ResumeDetails.updateResumeDetailsOne(req.body, res.callback);
    //     } else {
    //         res.callback("Please provide Valid AccessToken", null);
    //     }
    // },


    // updateResumeDetailsTwo: function (req, res) {
    //     if (req.body && req.body.accessToken) {
    //         ResumeDetails.updateResumeDetailsTwo(req.body, res.callback);
    //     } else {
    //         res.callback("Please provide Valid AccessToken", null);
    //     }
    // },



    // login: function (req, res) {
    //     if (req.body && req.body.name && req.body.name !== '' && req.body.password && req.body.password !== '') {
    //         ResumeDetails.doLogin(req.body, res.callback);
    //     } else {
    //         res.json({
    //             value: false,
    //             data: {
    //                 message: "Invalid Request"
    //             }
    //         });
    //     }
    // },




















    // saveMailData: function (data, callback) {
    //     async.waterfall([
    //         function (cbWaterfall) {
    //             ResumeDetails.saveData(data, function (err, complete) {
    //                 if (err) {
    //                     cbWaterfall(err, null);
    //                 } else {
    //                     if (_.isEmpty(complete)) {
    //                         cbWaterfall(null, []);
    //                     } else {
    //                         console.log("complete", complete);
    //                         cbWaterfall(null, complete);
    //                     }
    //                 }
    //             });
    //         },
    //         function (complete, cbWaterfall1) {
    //             var emailData = {};
    //             console.log("data: ", data);
    //             emailData.name = data.name;
    //             emailData.lastname = data.lastname;
    //             emailData.username = data.username;
    //             emailData.portfolioLink = data.portfolioLink;
    //             emailData.address = data.address;
    //             emailData.email = data.email;
    //             emailData.contactNo = data.contactNo;
    //             emailData.professionalDesignation = data.professionalDesignation;
    //             emailData.languageProficiency = data.languageProficiency;
    //             emailData.education = data.education;
    //             emailData.experience = data.experience;
    //             emailData.certificate = data.certificate;
    //             emailData.typeOfSkill = data.typeOfSkill;
    //             emailData.clientRate = data.clientRate;
    //             emailData.estimatedRate = data.estimatedRate;
    //             emailData.availabiltyStatus = data.availabiltyStatus;
    //             emailData.email = "sayali.ghule@wohlig.com";
    //             emailData.from = data.email;
    //             emailData.filename = "resume.ejs";
    //             emailData.subject = "User resume Details";
    //             console.log("emaildata", emailData);

    //             Config.email(emailData, function (err, emailRespo) {
    //                 if (err) {
    //                     console.log(err);
    //                     cbWaterfall1(null, err);
    //                 } else if (emailRespo) {
    //                     cbWaterfall1(null, emailRespo);
    //                 } else {
    //                     cbWaterfall1(null, "Invalid data");
    //                 }
    //             });
    //         },
    //     ],
    //         function (err, data2) {
    //             if (err) {
    //                 console.log(err);
    //                 callback(null, []);
    //             } else if (data2) {
    //                 if (_.isEmpty(data2)) {
    //                     callback(null, []);
    //                 } else {
    //                     callback(null, data2);
    //                 }
    //             }
    //         });
    // }


};
module.exports = _.assign(module.exports, controller);