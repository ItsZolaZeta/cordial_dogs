var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BlogPostSchema = new Schema(
  {
    title: {type: String, required: true, maxLength: 100},
    text: {type: String, required: true},
    date: {type: Date, default: Date.now},
    author: {type: Schema.Types.ObjectId, ref:"User", required: true},
    comments: [{type: Schema.Types.ObjectId, ref:"Comment", required: false}]
  }
);

// Virtual for author's URL
BlogPostSchema
.virtual('url')
.get(function () {
  return '/blogpost/' + this._id;
});

//Export model
module.exports = mongoose.model('BlogPost', BlogPostSchema);

//