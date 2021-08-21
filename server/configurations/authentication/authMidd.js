//middleware that will determine if a user is autheticated. It will be called on every request.

module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
};

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource because you are not an admin.' });
    }
};

module.exports.canPostComment = (req, res, next) => {
    if(req.isAuthenticated()) {
        req.canPostComment = true; 
    } else {
        req.canPostComment = false;
    }
    next(); 
}