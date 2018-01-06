var schema = new Schema({
    isProfile: {
        type: Boolean
    },
    isBasicDetails: {
        type: Boolean,
        default: false
    },
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
        present: {
            type: String
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

    skillName: {
        type: Schema.Types.ObjectId,
        ref: "Skills",
        index: true
    },


    resumeId: {
        type: Schema.Types.ObjectId,
        ref: "Skills",
        index: true
    },

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
        enum: ["yes", "no"]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true
    },

    img: {
        type: String,
    }
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



    findSomeValuesResume: function (data, callback) {
    console.log("inside api findSomeValuesResume ",data)
        ResumeDetails.findOne({
            userId: data.user                          

        }).deepPopulate("").exec(function (err, found) {
            if (err) {
                console.log('**** error at findOneUser of ResumeDetails.js ****', err);
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback(null, 'noDataFound');
            } else {
                callback(null, found);
            }
        });
    },



};


module.exports = _.assign(module.exports, exports, model);