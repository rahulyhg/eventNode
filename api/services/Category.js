var schema = new Schema({
    name: {
        type: String,
        required: true
    },
    template: {
        type: Schema.Types.ObjectId,
        ref: 'Template',
        index: true
    }
});

schema.plugin(deepPopulate, {
    Populate: {
        'template': {
            select: '_id name'
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Category', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "template", "template"));
var model = {};
module.exports = _.assign(module.exports, exports, model);