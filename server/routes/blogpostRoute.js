var express = require('express');
var router = express.Router();
var controller = require("../controllers/blogpostController");
//var isAuth = require('../configurations/authentication/authMidd').isAuth;
//var isAdmin = require('../configurations/authentication/authMidd').isAdmin;


// TODO
// 1. Delete blogpost
// 2. Modify blogpost
// 3. Add comment to blogpost
//

router.get('/:id', controller.blogpost_get);


module.exports = router;
//