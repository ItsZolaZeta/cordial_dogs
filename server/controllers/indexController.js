var blogpost = require('../models/blog_post');

exports.home_get = (req,res,next) => {
    var blog = {}; 
    blogpost.find()
    .populate('author')
    .exec((err,posts)=>{
        if(err){
            return next(err)
        } 
        blog.posts = posts; 
        blog.title = "Cordial Dog";
        console.log(blog);
        res.send(blog); 
    });
    
}; 




