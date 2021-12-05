// David Dominguez & Salvador Rodriguez
const sqlite3 = require('sqlite3')
const Promise = require('bluebird')

class Cars {
	constructor(dbFilePath) {
		this.db = new sqlite3.Database(dbFilePath, (err) => {	
			if (err) {
			console.log('Could not connect to database.', err)
			}
			else {
			console.log('Successfully connected to database.')
			}
		})
	}


	all(sql, params = []) {
		return new Promise((resolve, reject) => {
			this.db.all(sql, params, (err, rows) => {
				if (err) {
					console.log('Error running sql: ' + sql)
					console.log(err)
					reject(err)
				} else {
					resolve(rows)
				}
			})
		})
	}

	insertUser(_userID, _email, _password) {
		return this.all(
			"INSERT INTO Users(u_user_id, u_email, u_password) VALUES (? , ? , ? )", [_userID, _email, _password]
		)
	}
	
	allUsers() {
		return this.all(
			"SELECT u_user_id as User_ID, u_email as User_Email, u_password as Passwords FROM Users", []
		)
	}

	userCheck(_userID) {
		return this.all(
			"SELECT u_user_id FROM Users WHERE u_user_id = ?", [_userID]
		)
	}

	userLogin(_email, _password) {
		return this.all(
			"SELECT u_user_id FROM Users WHERE u_email = ? AND u_password = ?", [_email, _password]
		)
	}

	updateUser(_newUserID, _oldUserID) {
		return this.all(
			"UPDATE Users SET u_user_id = ? WHERE u_user_id = ?", [_newUserID, _oldUserID]
		)
	}

};
module.exports = Cars
