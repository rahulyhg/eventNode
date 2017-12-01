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
    },



findSomeValuesResume: function (req, res) {
        if (req.body) {
            ResumeDetails.findSomeValuesResume(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: {
                    message: "Invalid Request"
                }
            });
        }
    },




    

};
module.exports = _.assign(module.exports, controller);