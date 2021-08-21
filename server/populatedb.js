#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var User = require('./models/user')
var Dog = require('./models/dog')
var BlogPost = require('./models/blog_post')
var Comment = require('./models/comment')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var dogs = []
var blogposts = []
var comments = []

// first dog, then user, then blogpost, then comment

function dogCreate(name, breed, d_birth, behaviour_problem, problems_description, cb) {


    var dog = new Dog({ name: name, breed: breed, date_of_birth: d_birth, behaviour_problem: behaviour_problem, problems_description: problems_description });

    dog.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Dog: ' + dog);
        dogs.push(dog)
        cb(null, dog)
    });
}

function userCreate(username, hashed_password, first_name, last_name, date_of_birth, isAdmin, dogs, cb) {

    var user = new User({ username: username, hashed_password: hashed_password, first_name: first_name, last_name: last_name, date_of_birth: date_of_birth, isAdmin: isAdmin, dogs: dogs });

    user.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New User: ' + user);
        users.push(user)
        cb(null, user);
    });
}

function blogpostCreate(title, text, date, author, cb) {
    blogpostdetail = {
        title: title,
        text: text,
        author: author,
        date: date
    }

    var blogpost = new BlogPost(blogpostdetail);

    blogpost.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New BlogPost: ' + blogpost);
        blogposts.push(blogpost)
        cb(null, blogpost)
    });
}


function commentCreate(text, date, author, blogpost, cb) {

    commentdetail = {
        text: text,
        date: date,
        author: author,
        blogpost: blogpost,
    }

    var comment = new Comment(commentdetail);

    comment.save(function (err) {
        if (err) {
            console.log('ERROR CREATING comment: ' + comment);
            cb(err, null)
            return
        }
        console.log('New comment: ' + comment);
        comments.push(comment)
        cb(null, comment)
    });
}


function createDogs(cb) {
    async.parallel([
        function (callback) {
            dogCreate("Zuka", "Berger Blanc Suisse", '1932-11-08', "Fear", "I am scared", callback);
        },
        function (callback) {
            dogCreate("Simba", "Good boy", '2020-07-12', "Fear", "I am scared", callback);
        },
    ],
        // optional callback
        cb);
}


function createUsers(cb) {
    async.parallel([
        function (callback) {
            userCreate("Contra", "password", "Tatiana", "Tuor", '1997-04-07', true, [dogs[0]],callback);
        },
        function (callback) {
            userCreate("Passo", "password", "Tianjia", "T", '1996-03-08', true, dogs,callback);
        },
    ],
        // optional callback
        cb);
}


function createBlogPosts(cb) {
    async.parallel([
        function (callback) {
            blogpostCreate("Blog Post 1", "I am blog post 1 text blah blah written by tatiana/contra", "2021-07-31", users[0], callback);
        },
        function (callback) {
            blogpostCreate("Blog Post 2", "I am blog post 2 text blah blah written by tianja/passo", "2021-07-31", users[1], callback);
        },
    ],
        // Optional callback
        cb);
}

function createComments(cb) {
    async.parallel([
        function (callback) {
            commentCreate("blah blah you nasty comment 1 by tianjia/passo on post 1", "2021-06-03", users[1], blogposts[0], callback);
        },
        function (callback) {
            commentCreate("blah blah asldf comment 2 by tatiana/contra on Blog Post 2", "2021-07-15", users[0], blogposts[1], callback);
        },
    ],
        // Optional callback
        cb);
}



async.series([
    createDogs,
    createUsers,
    createBlogPosts,
    createComments,
],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log("All Done!");

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });
