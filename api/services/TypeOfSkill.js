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
var model = {

    // saveSkills: function (data, callback) {
    //     console.log(data);
    //     var TypeOfSkillController = this(data);
    //     if (data._id) {
    //         this.findOneAndUpdate({
    //             _id: data._id
    //         }, data).exec(function (err, updated) {
    //             if (err) {
    //                 console.log(err);
    //                 callback(err, null);
    //             } else if (updated) {
    //                 callback(null, updated);
    //             } else {
    //                 callback(null, {});
    //             }
    //         });
    //     } else {
    //         console.log("hiii");
    //         TypeOfSkillController.save(function (err, created) {
    //             if (err) {
    //                 callback(err, null);
    //             } else if (created) {
    //                 callback(null, created);
    //             } else {
    //                 callback(null, {});
    //             }
    //         });
    //     }
    // },



findInSkilltype: function (data, callback) {
    console.log("inside api findInSkilltype ",data)
        TypeOfSkill.find({_id: data._id}).deepPopulate("typeOfSkill").exec(function (err, found) {
            console.log('**** found', found);
            if (err) {
                console.log('**** error at findInSkilltype of Dashboard.js ****', err);
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