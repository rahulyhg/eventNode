var schema = new Schema({
    userType: {
        type: Schema.Types.ObjectId,
        ref: "UserType",
        index: "true"
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        validate: validators.isEmail(),
        unique: true
    },
    password: {
        type: String,
        required: true,
        default: ""
    },
    country: {
        type: String
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Users', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);