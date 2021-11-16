-- David Dominguez & Salvador Rodriguez
-- 11/15/2021

-- Various cases where an attribute may need to be updated. 

-- Case 1: Edit post. 
UPDATE Posts
SET p_content = 'updated post.'
WHERE p_post_id = 2;

-- Case : Updating commenters count
UPDATE Commenters
SET cm_count = cm_count + 1
WHERE cm_user_id = 'user1';

-- Case : Drop 