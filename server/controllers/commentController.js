var Comment = require('../models/comment');


exports.commentFromBlogPost_get = (req,res,next) => {
    
  //TODO
    blogpost.findById(req.params.id)
    .populate('author')
    .exec((err,post)=>{
        if(err){
            return next(err)
        } 
        
        res.send(post); 
    });
   
    
}; 

exports.canPostCommentTest = (req, res, next) => {

    var test = {}; 
    test.canPostComment = req.canPostComment; 
    test.title = "I am a test"; 
    res.send(test); 
};

exports.comment_post = (req, res, next) => {
   // console.log("we made it to comment_post " + JSON.stringify(req.body));
    var com = new Comment({
        text: req.body.text,
        author: req.user._id,
        blogpost: req.body.blogpost,
    });
    com.save((function (err) {
        if (err) {
            return next(err)
        }
        console.log('New comment: ' + com);
        req.body.comment = com; 
        next();   
    })); 
   
};

exports.testComment = (req, res, next) => {
    console.log(req); 
};