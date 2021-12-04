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

	insertUser() {
		return this.all(
			"INSERT INTO Users(u_user_id, u_email, u_password) VALUES ('user10', 'email@email.com', 'yo')", []
		)
	}
	
	allUsers() {
		return this.all(
			"SELECT * FROM Users", []
		)
	}

};
module.exports = Cars
