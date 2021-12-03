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

	// postCount() {
	// 	let sql = `SELECT COUNT(p_user_id) as count FROM Posts`;
	// 	this.db.each(sql, [], (err, row) => {
	// 		if (err) {
	// 			return console.error(err.message)
	// 		}
	// 		_pID = `${row.count}`
	// 		_pID++;
	// 	})
		
	// }

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
			"SELECT p_user_id as User_ID, p_content as Content, p_post_id as Post_ID, p_stype as Selling_Post FROM Posts", []
		)
	}
	
	allComments() { 
		return this.all(
			"SELECT c_user_id as User_ID, c_reply_post_id as In_Reply_To_Post_ID, c_id as Comment_ID, c_content as Content FROM Comments", []
		)
	}

	postIDs() {
		return this.all( 
			"SELECT p_post_id FROM Posts", []
		)
	}

	insertComment(_prID, _cCounter, _content) {
		++_cCounter;
		return this.all(
			"INSERT INTO Comments(c_user_id, c_reply_post_id, c_id, c_content) " + 
			" VALUES ('anonymous', ? , ?, ?)", [_prID, _cCounter, _content]
		)
	}

	insertPost(_content, _pID, _sPost) {
		++_pID;
		return this.all(
			"INSERT INTO Posts(p_user_id, p_content, p_post_id, p_stype) " +
			" VALUES ('anonymous', ? , ? , ?)", [_content, _pID, _sPost]
		)
	}

};
module.exports = Cars
