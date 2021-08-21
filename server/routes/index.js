var express = require('express');
var router = express.Router();
var controller = require('../controllers/indexController');


// TODO


// Everything needed to show the home page (first lines of blog posts + titles)
router.get('/', controller.home_get);


module.exports = router;
