var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
  {
    text: {type: String, required: true},
    date: {type: Date, default: Date.now},
    author: {type: Schema.Types.ObjectId, ref:"User", required: false},
    blogpost: {type: Schema.Types.ObjectId, ref:"BlogPost", required: false},
  }
);

// Virtual for author's URL
CommentSchema
.virtual('url')
.get(function () {
  return '/comment/' + this._id;
});

//Export model
module.exports = mongoose.model('Comment', CommentSchema);

