//this is the users_controller.js file
var bcrypt = require('bcryptjs');
var express = require('express');
var router = express.Router();
var user = require('../models/user.js');
var connection = require('../config/connection.js');
var request = require('request');
var mongojs = require('mongojs');
var databaseUrl = 'mongodb://heroku_1s58mqrh:dd2tj60b0ev8v1k914lasgslvr@ds145415.mlab.com:45415/heroku_1s58mqrh';
var collections = ["users"];



var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});



//this is the users_controller.js file


router.get('/userlogedin',function(req,res){
	res.json(req.session)
});

 //in with the wrong password or email tell them that on the page
router.post('/login', function(req, res) {

	var email = req.body.email;
	var condition = "email = '" + email + "'";
	user.findOne(condition, function(user){
		if (user){
			bcrypt.compare(req.body.password, user[0].password, function(err, result) {
					if (result == true){

						req.session.logged_in = true;
						req.session.user_id = user[0].userId;
						req.session.user_username = user[0].username;
						req.session.user_email = user[0].email;

						res.redirect('/');
					}else{
            res.send('You put in the wrong password.')
          }
			});
		}else{
			res.send('an account with this email does not exist - please sign up')
		}
	});
});


router.post('/register', function(req,res) {
	var queryString = "select * from users where email = '" + req.body.email + "'";

	connection.query(queryString, function(err, users) {
			if (err) throw err;

			if (users.length > 0){
				res.send('we already have an email or username for this account');
			}else{
				bcrypt.genSalt(10, function(err, salt) {


						bcrypt.hash(req.body.password, salt, function(err, hash) {
              user.createUser(['fullname','username', 'email', 'password'], [req.body.fullname, req.body.username, req.body.email, hash], function(user){

                req.session.username = req.body.username;//we need to grab the username from the form because we don't get it back from MySQL. If we wanted to grab it, then we'd have to do another sql query but it's unnecessary since we already have it here.
                req.session.user_email = req.body.email; //we need to grab the email from the form because we don't get it back from MySQL. If we wanted to grab it, then we'd have to do another sql query but it's unnecessary since we already have it here.
                req.session.logged_in = true;
                req.session.user_id = user.insertId; //the MySQL npm package returns the id of the record inserted with a key of insertId.






              var bog = {name: req.body.email, array:[{_id: "Plan 1", title:"Plan 1", res: []}]};


              db.users.insert(bog, function(err, found) {
			      if (err) {
			        console.log(err);
			      } else {
			      	console.log(found)
			      	console.log('successfull')
			      }
			  });
                res.redirect('/')
            	});
						});
				});
			}
	});
});

module.exports = router;

// router.get('/profile/:id', function(req, res){
//
//   var queryString = "select * from users "
//   queryString += "left join orders on orders.user_id = users.id "
//   queryString += "where users.id = " + req.params.id;
//   console.log(queryString)
//   connection.query(queryString, function(err, userAndShops) {
//       if (err) throw err;
//
//       //uncomment this to see what the data gets returned like
//       //res.send(userAndCats)
//       res.render('users/show', {userAndShops: userAndShops})
//
//   });
// });
