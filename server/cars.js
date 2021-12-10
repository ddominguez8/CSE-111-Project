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
	// Selecting items for Posts.

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
			"SELECT cm_id as Commenter_ID, cm_user_id as Commenters_User_ID, cm_count as Commenters_Count FROM Commenters " +
			"ORDER BY Commenters_Count DESC", []
		)
	}

	sPosts() {
		return this.all(
			"SELECT * FROM Posts p, sellPost sp WHERE sp.p_id = p.p_post_id", []
		)
	}

	postIDs() {
		return this.all( 
			"SELECT p_post_id FROM Posts", []
		)
	}
	

	featureIDs(){
		return this.all( 
			"SELECT f_features FROM Features", []
		)
	}

	carSellAll(){
		return this.all(
			"SELECT bs.b_year as Year, bs.b_model as model, bs.b_manufacturer as manufacturer, b_amountSold as AmountSold, f.f_features as Features " +
			"FROM Features f, carFeatures cf, Best_Selling_Cars bs " +
			"WHERE bs.b_id = cf.b_id " +
			"AND cf.f_id = f.f_id " +
			"GROUP BY bs.b_year, bs.b_model, bs.b_manufacturer, bs.b_amountSold, f.f_features " +
			"ORDER BY bs.b_amountSold DESC " +
			"LIMIT 15", []
		)
	}

	carSells(_featureID){
		return this.all(
			"SELECT bs.b_year as Year, bs.b_model as model, bs.b_manufacturer as manufacturer, b_amountSold as AmountSold, f.f_features as Features " +
			"FROM Features f, carFeatures cf, Best_Selling_Cars bs " +
			"WHERE bs.b_id = cf.b_id " +
			"AND cf.f_id = f.f_id " +
			"AND f.f_features = ? " +
			"GROUP BY bs.b_year, bs.b_model, bs.b_manufacturer, bs.b_amountSold, f.f_features " +
			"ORDER BY bs.b_amountSold DESC " +
			"LIMIT 15", [_featureID]
		)
	}

	// Insertion for Posts.

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

	// Update values for Post.

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

	// Delete values for Post.

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
	// Selections for Users.

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

	// Insertions for Users.

	insertUser(_userID, _email, _password) {
		return this.all(
			"INSERT INTO Users(u_user_id, u_email, u_password) VALUES (? , ? , ? )", [_userID, _email, _password]
		)
	}

	// Update values for Users.

	updateUser(_newUserID, _oldUserID) {
		return this.all(
			"UPDATE Users SET u_user_id = ? WHERE u_user_id = ?", [_newUserID, _oldUserID]
		)
	}

	// Delete values for Users.
	
	delUser(_UserID) {
		return this.all(
			"DELETE FROM Users WHERE u_user_id = ?", [_UserID]
		)
	}

};
module.exports = Cars
