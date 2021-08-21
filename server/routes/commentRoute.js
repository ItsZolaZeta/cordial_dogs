var express = require('express');
var router = express.Router();
var controller = require("../controllers/commentController");
var canPostComment = require('../configurations/authentication/authMidd').canPostComment;
var isAuth = require('../configurations/authentication/authMidd').isAuth;
var userComment_postRef = require('../controllers/userController').userComment_postRef;
var blogpostComment_postRef = require('../controllers/blogpostController').blogpostComment_postRef;  

// TODO : 
// 1. delete comment (admin + mod + comment author)
// 2. modify comment (admin + mod + comment author)
// 3. like comment (user) 


router.get('/blogpost/:id', function(req,res,next){
    res.render('commentForm'); 
});

// post comment (will be called when a new comment is posted)
router.post('/blogpost/:id', isAuth, controller.comment_post, userComment_postRef, blogpostComment_postRef); 

module.exports = router;
