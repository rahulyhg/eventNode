var schema = new Schema({
    imageName: {
        type: String,

    },
    //     subCategory:{
    // type: Schema.Types.ObjectId,
    //         ref: 'SubCategory',
    //         index: true
    //     },
    description: {
        type: String,

    },
    imageId: {
        type: Number
    },
    copyRightInfo: {
        type: String,

    },
    sizeInPixel: {
        type: String,

    },
    sizeInCm: {
        type: String,

    },
    image1: {
        type: String,
    },
    image2: {
        type: String,

    },
    sizeType: {
        type: String,
        enum: ["Small", "Medium", "Large"]
    },
    price: {
        type: Number
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('SubCategoryDetail', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);