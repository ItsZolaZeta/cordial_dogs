var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    username: {type: String, required: true, maxLength: 30},
    hashed_password: {type: String, required: true},
    first_name: {type: String, required: false, maxLength: 20},
    last_name: {type: String, required: false, maxLength: 20},
    date_of_birth: {type: Date, required: false},
    isAdmin: {type: Boolean, default: false},
    dogs: [{type: Schema.Types.ObjectId, ref:"Dog"}],
    comments: [{type: Schema.Types.ObjectId, ref:"Comment"}]

  }
);

// Virtual for author's URL
UserSchema
.virtual('url')
.get(function () {
  return '/user/' + this._id;
});

//Export model
module.exports = mongoose.model('User', UserSchema);

