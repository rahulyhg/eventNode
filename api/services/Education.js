var schema = new Schema({
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
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Education', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);