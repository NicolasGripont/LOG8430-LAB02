var DbUser = require('../models_db/user');

class User {
	constructor(email, password) {
		this._email = email;
		this._password = password;
	}
	
	logIn(cb) {
		DbUser.find({email:this.email, password:this.password}, function(err, foundUser) {
			if(foundUser) {
				return cb(true);
			}
			return cb(false);
		});
	}
	
	save(cb) {
		var DbUser = new DbUser({
			email : this.email,
			password : this.password
		});
		DbUser.save(function (err) {
			return cb(err);
		});
	}
	
	get email() {
		return this._email;
	}
	
	get password() {
		return this._password;
	}
	
}

module.exports = User;