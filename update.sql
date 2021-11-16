-- David Dominguez & Salvador Rodriguez
-- 11/15/2021

-- Various cases where an attribute may need to be updated. 

-- Case: Edit post. 
UPDATE Posts
SET p_content = 'updated post.'
WHERE p_post_id = 2;

-- Case: Updating commenters count.
UPDATE Commenters
SET cm_count = cm_count + 1
WHERE cm_user_id = 'user1';

-- Case: Delete post. 
DELETE FROM Posts
WHERE p_post_id = 3;

-- Update user_id. 
UPDATE Users
SET u_user_id = 'new_username'
WHERE 'new_username' NOT IN 
	(SELECT u_user_id
	FROM Users)
AND u_email = 'user1@protonmail.com';

-- Case: Delete comment. 
DELETE FROM Comments
WHERE c_id = 2