-- David Dominguez & Salvador Rodriguez
-- 11/15/2021

-- Various cases where an attribute may need to be updated/queried. 

-- Case: Edit post. 
--7
UPDATE Posts
SET p_content = 'updated post.', p_stype = 'Yes'
WHERE p_post_id = 2;

-- Case: Updating commenters count, when new comment is set
--need it wont update if you insert a statement that has already been used
--8
INSERT INTO Comments(c_user_id, c_reply_post_id, c_content) VALUES ('user7', 7, 'hesfllo');

UPDATE Commenters
SET cm_count = cm_count + 1
WHERE cm_user_id = 'user7';


-- Case: Updating commenters count, when comment is deleted
--9 -- keep count if youre removing some queries then remove
--that set count
UPDATE Commenters
SET cm_count = cm_count - 1
WHERE cm_user_id = 'user2';

--10
-- Update user_id. 
UPDATE Users
SET u_user_id = 'new_username'
WHERE 'new_username' NOT IN 
	(SELECT u_user_id
	FROM Users)
AND u_email = 'user1@protonmail.com';

--11 update user id for other tables
UPDATE Posts
SET p_user_id = 'new_username'
WHERE p_user_id = 'user1';

--12 update user id for comments
UPDATE Comments
SET c_user_id = 'new_username'
WHERE c_user_id = 'user1';

--13 update user id for commenters
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