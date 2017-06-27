var schema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    portfolioLink: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: validators.isEmail(),
        unique: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    professionalDesignation: {
        type: String,
        required: true
    },
    languageProficiency: {
        type: String,
        required: true
    },
    education: [{
        schoolName: {
            type: String,
            required: true
        },
        dateAttended: {
            type: Date,
            required: true
        },
        professionalDesignation: {
            type: String,
            required: true
        },
        areaOfStudy: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }],
    experience: [{
        lor: {
            type: String,
            required: true
        },
        dateAttendedFrom: {
            type: Date
        },
        dateAttendedTo: {
            type: Date
        },
        location: {
            type: String,
            required: true
        },
        jobTitle: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }],
    certificate: [{
        lor: {
            type: String,
            required: true
        },
        companyName: {
            type: String,
            required: true
        }
    }],
    typeOfSkill: {
        type: Schema.Types.ObjectId,
        ref: 'TypeOfSkill',
        index: true
    },
    clientRate: {
        type: Number,
        required: true
    },
    estimatedRate: {
        type: Number,
        required: true
    },
    availabiltyStatus: {
        type: String,
        enum: ["available", "Not Available"]
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
var model = {};
module.exports = _.assign(module.exports, exports, model);