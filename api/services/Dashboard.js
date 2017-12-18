var schema = new Schema({
  
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Dashboard', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {


findInSkilltype: function (data, callback) {
    console.log("inside api findInSkilltype ",data)
        Dashboard.find().deepPopulate("typeOfSkill").exec(function (err, found) {
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