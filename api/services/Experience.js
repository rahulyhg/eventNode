var schema = new Schema({
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
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Experience', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);