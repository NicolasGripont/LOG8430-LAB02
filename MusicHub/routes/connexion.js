var express = require('express');
var router = express.Router();
var user = require('../models/user');

router.post('/signup', function(req, res, next) {
	//TODO
});

router.post('/signin', function(req, res, next) {
	//tests des paramètres a ajouter
	var email = req.body.email | "";
	var password = req.body.password | "";
	user.find({email:email, password:password}, function(err, foundUser) {
		if(foundUser) {
			req.session.email = email;
			return res.redirect('views/index');
		}
		res.json({error:"bad email or password"});
	});
});

router.get('/signout', function(req, res, next) {
	//TODO
});

module.exports = router;
