var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DogSchema = new Schema(
  {
    name: {type: String, required: true, maxLength: 20},
    breed: {type: String, enum:["Good boy","Berger Blanc Suisse"], default:"Good boy"},
    date_of_birth: {type: Date, required: false},
    behaviour_problem: {type: String, enum:["Agressivity","Fear"], default:"Fear"},
    problems_description: {type: String, required: false, maxLength: 500},
  }
);

// Virtual for author's URL
DogSchema
.virtual('url')
.get(function () {
  return '/dog/' + this._id;
});

//Export model
module.exports = mongoose.model('Dog', DogSchema);

