var schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    skills: {
        type: Schema.Types.ObjectId,
        ref: 'Skills',
        index: true
    }
});

schema.plugin(deepPopulate, {
    Populate: {
        'skills': {
            select: '_id name'
        }

    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('TypeOfSkill', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "skills", "skills"));
var model = {};
module.exports = _.assign(module.exports, exports, model);