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
				if(err) {
					console.log('Error running sql: ' + sql) 
					console.log(err) 
					reject(err)
				} else {
					resolve(rows)
				}
			})
		})
	}

	allPosts() {
		return this.all(
			"SELECT * FROM Posts", []
		)
	}
	
	allComments() { 
		return this.all(
			"SELECT * FROM Comments", []
		)
	}

	postIDs() {
		return this.all( 
			"SELECT p_post_id FROM Posts", []
		)
	}

	insertComment(_pID, _content) {
		return this.all(
			"INSERT INTO Comments(c_user_id, c_reply_post_id, c_id, c_content) " + 
			" VALUES ('anonymous', ? , 11, ?)", [_pID, _content]
		)
	}

	insertPost(_content) {
		return this.all(
			"INSERT INTO Posts(p_user_id, p_content, p_post_id, p_stype) " +
			" VALUES ('anonymous', ? , 11, 'No')", [_content]
		)
	}

};
module.exports = Cars
