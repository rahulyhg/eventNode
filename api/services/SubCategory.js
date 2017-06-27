var schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        index: true
    }
});

schema.plugin(deepPopulate, {
    Populate: {
        'category': {
            select: '_id name'
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('SubCategory', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "category", "category"));
var model = {};
module.exports = _.assign(module.exports, exports, model);