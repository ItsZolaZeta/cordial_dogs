const User = require('../models/user');
const passport = require("passport");
const bcrypt = require('bcryptjs'); 


// login and signup posts

exports.login_post = passport.authenticate("local",
    {
        successRedirect: "/user/success",
        failureRedirect: "/user/failure"
    });

// No dogs or comments initialization. Users logically won't have any comments before signing up, 
// and they'll have to add a dog after signing up as well (we could do it in one go, but might as well have a two pages form)
exports.sign_up_post = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10, (err, hashed_password) => {
        if(err) {
            next(err); 
        }
        var user = new User({
            username: req.body.username,
            hashed_password: hashed_password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            date_of_birth: req.body.date_of_birth,
        });
        user.save((err) => {
            if (err) return console.log("Couldn't save the user");
        });
     
    })
    res.send({ message: "User successfully saved" }); 
    
    
    
};

// passportjs logout function
exports.logout = (req, res, next) => {
    req.logout();
    res.send({ "I am": "logged out" })
};

// get every comment of a user
exports.userComment_get = (req, res, next) => {
    res.send({test:req.user.comment});
};

// delete a comment of a user (just the reference) ---- TODO

exports.userComment_deleteRef = (req, res, next) => {
    console.log(req.body.comment._id)
};

// post comment (just the reference)

exports.userComment_postRef = (req, res, next) => {
    
    User.findByIdAndUpdate(req.user._id, {$push : {comments: req.body.comment._id}}, (err, result)=>{
        if(err) return next(err); 
        next(); 
    });
    
    
};