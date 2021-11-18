-- Case: Delete post. 
--15
DELETE FROM Posts
WHERE p_post_id = 1;


--16 case when a post is deleted you must also delete the comments
DELETE FROM Comments
WHERE c_reply_post_id NOT IN 
    (
        SELECT p_post_id
        FROM Posts
    );

--17
-- Case: Delete comment. 
DELETE FROM Comments
WHERE c_id = 2;


--18
-- Case: Delete tuple from Commenters table if user_id has cm_count of 0.
DELETE FROM Commenters
WHERE cm_count = 0;

--19 --deleting user --user input
DELETE FROM Users
WHERE u_user_id = 'user2';

--20 --deleting users from post
DELETE FROM Posts
WHERE p_user_id = 'user2';

--21 --deleting users from comment
DELETE FROM Comments
WHERE c_user_id = 'user2';

--22 --deleting users from commenter
DELETE FROM Commenters
WHERE cm_user_id = 'user2';
