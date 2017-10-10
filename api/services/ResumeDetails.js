var schema = new Schema({
    name: {
        type: String

    },
    lastName: {
        type: String

    },
    username: {
        type: String

    },
    portfolioLink: {
        type: String
    },
    address: {
        type: String

    },
    email: {
        type: String

    },
    contactNo: {
        type: Number

    },
    professionalDesignation: {
        type: String

    },
    languageProficiency: {
        type: String

    },
    education: [{
        schoolName: {
            type: String
        },
        dateAttended: {
            type: String
        },
        professionalDesignation: {
            type: String
        },
        areaOfStudy: {
            type: String
        },
        description: {
            type: String
        }
    }],
    experience: [{
        lor: {
            type: String
        },
        dateAttendedFrom: {
            type: Date
        },
        dateAttendedTo: {
            type: Date
        },
        location: {
            type: String
        },
        jobTitle: {
            type: String
        },
        description: {
            type: String
        }
    }],
    certificate: [{
        lor: {
            type: String
        },
        companyName: {
            type: String
        }
    }],

    typeOfSkill: [{
        type: Schema.Types.ObjectId,
        ref: 'TypeOfSkill',
        index: true
    }],
    clientRate: {
        type: Number
    },
    estimatedRate: {
        type: Number
    },
    availabiltyStatus: {
        type: String,
        enum: ["available", "Not Available"]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: "true"
    },

});



schema.plugin(deepPopulate, {
    Populate: {
        'typeOfSkill': {
            select: '_id name'
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('ResumeDetails', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "typeOfSkill", "typeOfSkill"));
var model = {

    saveSkills: function (data, callback) {
        console.log(data);
        var skillDetails = this(data);
        if (data._id) {
            this.findOneAndUpdate({
                _id: data._id
            }, data).exec(function (err, updated) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else if (updated) {
                    callback(null, updated);
                } else {
                    callback(null, {});
                }
            });
        } else {
            console.log("hiii");
            ResumeDetails.save(function (err, created) {
                if (err) {
                    callback(err, null);
                } else if (created) {
                    callback(null, created);
                } else {
                    callback(null, {});
                }
            });
        }
    },


    // saveResumeDetails: function (data, callback) {
    //     console.log(data);
    //     var ResumeDetails = this(data);
    //     if (data._id) {
    //         this.findOneAndUpdate({
    //             _id: data._id
    //         }, data).exec(function (err, updated) {
    //             if (err) {
    //                 console.log(err);
    //                 callback(err, null);
    //             } else if (updated) {
    //                 callback(null, updated);
    //             } else {
    //                 callback(null, {});
    //             }
    //         });
    //     } else {
    //         console.log("hiii");
    //         ResumeDetails.save(function (err, created) {
    //             if (err) {
    //                 callback(err, null);
    //             } else if (created) {
    //                 callback(null, created);
    //             } else {
    //                 callback(null, {});
    //             }
    //         });
    //     }
    // }



    // saveResumeDetails: function (data, callback) {
    //     console.log(data);
    //     var ResumeDetails = this(data);
    //     if (data._id) {
    //         this.findOneAndUpdate({
    //             _id: data._id
    //         }, data).exec(function (err, updated) {
    //             if (err) {
    //                 console.log(err);
    //                 callback(err, null);
    //             } else if (updated) {
    //                 callback(null, updated);
    //             } else {
    //                 callback(null, {});
    //             }
    //         });
    //     } else {
    //         console.log("hiii");
    //         ResumeDetails.save(function (err, created) {
    //             if (err) {
    //                 callback(err, null);
    //             } else if (created) {
    //                 callback(null, created);
    //             } else {
    //                 callback(null, {});
    //             }
    //         });
    //     }
    // },


    // updateResumeDetailsFirst: function (data, callback) {

    //     ResumeDetails.findOneAndUpdate({
    //         _id: mongoose.Types.ObjectId(data._id)
    //     }, {
    //         $set: {
    //             name: data.name,
    //             lastName: data.lastName,
    //             username: data.username,
    //             portfolioLink: data.portfolioLink,
    //             email: data.email,
    //             contactNo: data.contactNo,
    //             professionalDesignation: data.professionalDesignation,
    //             languageProficiency: data.languageProficiency,
    //         }
    //     }, {
    //         new: true
    //     }).exec(function (err, found) {
    //         if (err) {
    //             console.log("inside error");
    //             callback(err, null);
    //         } else if (_.isEmpty(found)) {

    //             callback(null, "noDataound");
    //         } else {
    //             console.log("found", found)
    //             callback(null, found);
    //         }

    //     });
    // },



    // updateResumeDetailsOne: function (data, callback) {

    //     ResumeDetails.findOneAndUpdate({
    //         _id: mongoose.Types.ObjectId(data._id)
    //     }, {
    //         $set: {
    //             schoolName: data.schoolName,
    //             dateAttended: data.dateAttended,
    //             professionalDesignation: data.professionalDesignation,
    //             areaOfStudy: data.areaOfStudy,
    //             description: data.description
    //         }
    //     }, {
    //         new: true
    //     }).exec(function (err, found) {
    //         if (err) {
    //             console.log("inside error");
    //             callback(err, null);
    //         } else if (_.isEmpty(found)) {

    //             callback(null, "noDataound");
    //         } else {
    //             console.log("found", found)
    //             callback(null, found);
    //         }

    //     });
    // },


    // updateResumeDetailsTwo: function (data, callback) {
    //     ResumeDetails.findOneAndUpdate({
    //         _id: mongoose.Types.ObjectId(data._id)
    //     }, {
    //         $set: {
    //             lor: data.lor,
    //             dateAttendedFrom: data.dateAttendedFrom,
    //             location: data.location,
    //             jobTitle: data.jobTitle,
    //             description: data.description
    //         }
    //     }, {
    //         new: true
    //     }).exec(function (err, found) {
    //         if (err) {
    //             console.log("inside error");
    //             callback(err, null);
    //         } else if (_.isEmpty(found)) {

    //             callback(null, "noDataound");
    //         } else {
    //             console.log("found", found)
    //             callback(null, found);
    //         }
    //     });
    // },

    // updateResumeDetailsThree: function (data, callback) {

    //     ResumeDetails.findOneAndUpdate({
    //         _id: mongoose.Types.ObjectId(data._id)
    //     }, {
    //         $set: {
    //             lor: data.lor,
    //             companyName: data.companyName
    //         }
    //     }, {
    //         new: true
    //     }).exec(function (err, found) {
    //         if (err) {
    //             console.log("inside error");
    //             callback(err, null);
    //         } else if (_.isEmpty(found)) {

    //             callback(null, "noDataound");
    //         } else {
    //             console.log("found", found)
    //             callback(null, found);
    //         }
    //     });
    // },

    // updateResumeDetailsFour: function (data, callback) {

    //     ResumeDetails.findOneAndUpdate({
    //         _id: mongoose.Types.ObjectId(data._id)
    //     }, {
    //         $set: {
    //             clientRate: data.clientRate,
    //             estimatedRate: data.estimatedRate

    //         }
    //     }, {
    //         new: true
    //     }).exec(function (err, found) {
    //         if (err) {
    //             console.log("inside error");
    //             callback(err, null);
    //         } else if (_.isEmpty(found)) {

    //             callback(null, "noDataound");
    //         } else {
    //             console.log("found", found)
    //             callback(null, found);
    //         }
    //     });
    // }
};











// updateResumeDetails: function (data, callback) {
//     var User = this(data);
//     if (data._id) {
//         this.findOneAndUpdate({
//             _id: data._id
//         }, data).exec(function (err, updated) {
//             if (err) {
//                 console.log(err);
//                 callback(err, null);
//             } else if (updated) {
//                 callback(null, updated);
//             } else {
//                 callback(null, {});
//             }
//         });
//     } else {
//         ResumeDetails.save(function (err, created) {
//             if (err) {
//                 callback(err, null);
//             } else if (created) {
//                 callback(null, created);
//             } else {
//                 callback(null, {});
//             }
//         });
//     }
// }

module.exports = _.assign(module.exports, exports, model);