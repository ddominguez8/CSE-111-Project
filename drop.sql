-- Case: Delete post. 
--11
DELETE FROM Posts
WHERE p_post_id = 1;

--12
-- UPDATE Commenters
-- SET cm_count = cm_count - 1
-- FROM Comments
-- WHERE c_user_id = cm_user_id;

--12 case when a post is deleted you must also delete the comments
DELETE FROM Comments
WHERE c_reply_post_id NOT IN 
    (
        SELECT p_post_id
        FROM Posts
    );

--13
-- Case: Delete comment. 
DELETE FROM Comments
WHERE c_id = 2;


--14
-- Case: Delete tuple from Commenters table if user_id has cm_count of 0.
DELETE FROM Commenters
WHERE cm_count = 0;

--15
--