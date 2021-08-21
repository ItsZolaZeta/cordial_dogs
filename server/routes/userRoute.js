const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");
const isAuth = require('../configurations/authentication/authMidd').isAuth;
const isAdmin = require('../configurations/authentication/authMidd').isAdmin;


// TODO
// 1. CRUD dog, comment, blogpost
// loads to do

//---------------------------------------------
// Login get (for production), logout and post

router.get('/login', function (req, res, next) {
  res.render('login', {});
});

router.get('/logout', controller.logout);

router.post('/login', controller.login_post);

//---------------------------------------------
// Sign up get (for production) and post

router.get('/signup', function (req, res, next) {
  res.render('signup', {}); 
});


router.post('/signup', controller.sign_up_post); 

//---------------------------------------------

//get every comment of a user
router.get('/comment', isAuth, controller.userComment_get);



//---------------------------------------------

router.get('/testAuth', isAuth, function (req, res, next) {
  res.send(req.user);
});



module.exports = router;
