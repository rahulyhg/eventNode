var schema = new Schema({
    description: {
        type: String
    },

    quote: {
        type: Number
    },
    deadline: {
        type: Date
    },

    stagefront: {
        type: Number
    },

    sizeSpecification: {
        type: String
    },
    stageHeight: {
        type: Number
    },

    backdropHeight: {
        type: Number
    },

    sizeWings: {
        type: Boolean
    },

    screen: {
        type: Boolean
    },

    steps: {
        type: String
    },

    colorCombination: {
        type: Number
    },

    otherRequirment: [{
        registrationDesk: {
            type: String,

        },
        ambienceProps: {
            type: String
        },
        foodCounter: {
            type: String
        },
        pointOfPurchaseDesign: {
            type: String,
        },
        seatingLayout: {
            type: String,
        },
        customiseRequire: {
            type: String,
        }
    }],
    clientLogo: {
        type: String
    },
    referenceImages: [{
        refImage: {
            type: String,
        }
    }],
    discussion: [{
        name: {
            type: String,
        },
        image: {
            type: String,
        },
        text: {
            type: String,
        }
    }],

    amount: {
        type: Number
    },
    allottedDate: {
        type: Date
    }

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('JobBriefDetails', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);