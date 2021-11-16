-- David Dominguez & Salvador Rodriguez
-- 11/15/2021

-- Various cases where an attribute may need to be updated. 

-- Case 1: Edit post. 
UPDATE Posts
SET p_content = 'updated post.'
WHERE p_post_id = 2;
