var createError = require('http-errors');
var express = require('express');
//const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var passport = require('passport');

const MongoStore = require('connect-mongo');

require('dotenv').config();
const connection = require('./configurations/database/database');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//authentication -------------------------------------
require("./configurations/authentication/passport");
//

const sessionStore = MongoStore.create({ mongoUrl: process.env.DB_HOST});

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
  }
}));
app.use(passport.initialize());
app.use(passport.session());

//------------------------------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//test
app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
}); 






// Routes managing ----------------

var indexRouter = require('./routes/index');
var userRouter = require('./routes/userRoute');
var blogpostRouter = require('./routes/blogpostRoute'); 
var commentRouter = require('./routes/commentRoute');

app.use('/home', indexRouter);
app.use('/user', userRouter);
app.use('/blogpost', blogpostRouter); 
app.use('/comment', commentRouter); 




//------------------------------------------------------------


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
