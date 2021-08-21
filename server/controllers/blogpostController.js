var BlogPost = require('../models/blog_post');


exports.blogpost_get = (req,res,next) => {
    
  
    BlogPost.findById(req.params.id)
    .populate('author')
    .exec((err,post)=>{
        if(err){
            return next(err)
        } 
        
        res.send(post); 
    });
   
    
}; 

// post comment (just the reference)

exports.blogpostComment_postRef = (req, res, next) => {
    
    BlogPost.findByIdAndUpdate(req.body.blogpostID, {$push : {comments: req.body.comment._id}}, (err, result)=>{
        if(err) return next(err); 
        res.send({test:"cool"}); 
    });
 
    
};

