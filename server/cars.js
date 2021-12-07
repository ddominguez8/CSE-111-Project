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

	allCommenters() { 
		return this.all(
			"SELECT cm_id as Comment_ID, cm_user_id as Commenters_User_ID, cm_count as Commenters_Count FROM Commenters " +
			"ORDER BY Commenters_Count DESC", []
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

	editPost(_newContent, _postID) {
		return this.all(
			"UPDATE Posts SET p_content = ? WHERE p_post_id = ?", [_newContent, _postID]
		)
	}

	editPostUserID(_oldUserID, _newUserID) {
		return this.all(
			"UPDATE Posts SET p_user_id = ? WHERE p_user_id = ?", [_newUserID, _oldUserID]
		)
	}

	editCommentUserID(_oldUserID, _newUserID) {
		return this.all(
			"UPDATE Comments SET c_user_id = ? WHERE c_user_id = ?", [_newUserID, _oldUserID]
		)
	}

	editCommenterUserID(_oldUserID, _newUserID) {
		return this.all(
			"UPDATE Commenters SET cm_user_id = ? WHERE cm_user_id = ?", [_newUserID, _oldUserID]
		)
	}

	incCommenterUserID(_UserID) {
		return this.all(
			"UPDATE Commenters SET cm_count = cm_count +1 WHERE cm_user_id = ?", [_UserID]
		)
	}

	decCommenterUserID(_UserID) {
		return this.all(
			"UPDATE Commenters SET cm_count = cm_count -1 WHERE cm_user_id = ?", [_UserID]
		)
	}

	delPostID(_postID) {
		return this.all(
			"DELETE FROM Posts WHERE p_post_id = ?", [_postID]
		)
	}

	delPostUser(_UserID) {
		return this.all(
			"DELETE FROM Posts WHERE p_user_id = ?", [_UserID]
		)
	}

	delCommentID(_commentID) {
		return this.all(
			"DELETE FROM Comments WHERE c_id = ?", [_commentID]
		)
	}

	cleanupPost() {
		return this.all(
			"DELETE FROM Comments " +
			"WHERE c_reply_post_id NOT IN " +
				"(SELECT p_post_id FROM Posts)" , []
		)
	}

	cleanupCommenters() {
		return this.all(
			"DELETE FROM Commenters " +
			"WHERE cm_count = 0" , []
		)
	}

	postIDQueryInfo(_postIDQ) {
		return this.all(
			"SELECT c_user_id as Comment_User_ID, c_id as Comment_ID, p_post_id as Post_ID, cm_count as Comment_Count " +
			"FROM Commenters, Comments, Posts " +
			"WHERE cm_user_id = c_user_id " +
			"AND c_reply_post_id = p_post_id " +
			"AND p_post_id = ? " +
			"GROUP BY c_user_id", [_postIDQ]
		)
	}

};
module.exports = Cars
