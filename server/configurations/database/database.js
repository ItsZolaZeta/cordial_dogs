var mongoose = require('mongoose');


//require('dotenv').config(); 

const host = process.env.DB_HOST;
mongoose.connect(host,  {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));