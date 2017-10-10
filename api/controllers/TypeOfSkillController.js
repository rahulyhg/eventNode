module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

    // saveSkills: function (req, res) {
    //     if (req.body) {
    //         TypeOfSkillController.saveSkills(req.body, function (err, data) {
    //             if (err) {
    //                 res.json({
    //                     value: false,
    //                     data: err
    //                 });

    //             } else {
    //                 req.session.typeOfSkillController = data;
    //                 console.log("Skills", req.session.typeOfSkillController);
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
};
module.exports = _.assign(module.exports, controller);