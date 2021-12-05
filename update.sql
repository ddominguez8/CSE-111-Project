-- David Dominguez & Salvador Rodriguez
-- 11/15/2021

-- Various cases where an attribute may need to be updated/queried. 

-- Case: Edit post. 
--8
UPDATE Posts
SET p_content = 'updated post.', p_stype = 'Yes'
WHERE p_post_id = 2;

-- Case: Updating commenters count, when new comment is set
--need it wont update if you insert a statement that has already been used

INSERT INTO Comments(c_user_id, c_reply_post_id, c_content) VALUES ('user7', 7, 'hesfllo');
--9
UPDATE Commenters
SET cm_count = cm_count + 1
WHERE cm_user_id = 'user7';

.headers off
SELECT u_user_id FROM Users WHERE u_email = 'email@protonmail.com' AND u_password = 'password';

INSERT INTO Users(u_user_id, u_email, u_password) VALUES ('user10', 'email@email.com', 'yo');

DELETE FROM Users WHERE u_email = 'email@email.com'

SELECT u_user_id FROM Users WHERE u_user_id = 'admin'
SELECT u_user_id as User_ID, u_email as User_Email, u_password as Passwords FROM Users

-- Case: Updating commenters count, when comment is deleted
--10-- keep count if youre removing some queries then remove
--that set count
UPDATE Commenters	
SET cm_count = cm_count - 1
WHERE cm_user_id = 'user2';

--11
-- Update user_id. 
UPDATE Users
SET u_user_id = 'admin'
WHERE 'admin' NOT IN 
	(SELECT u_user_id
	FROM Users)
AND u_user_id = 'admin2';

--12 update user id for other tables
UPDATE Posts
SET p_user_id = 'new_username'
WHERE p_user_id = 'user1';

--13 update user id for comments
UPDATE Comments
SET c_user_id = 'new_username'
WHERE c_user_id = 'user1';

--14 update user id for commenters
UPDATE Commenters
SET cm_user_id = 'new_username'
WHERE cm_user_id = 'user1';


-- Case: Find user id along with their comments on a certain post
-- and total comment count.
-- Utilizes 3 tables as requested.
-- SELECT c_user_id, c_id, p_post_id, cm_count
-- FROM Commenters, Comments, Posts
-- WHERE cm_user_id = c_user_id 
-- AND c_reply_post_id = p_post_id
-- AND p_post_id = 2
-- GROUP BY p_post_id;