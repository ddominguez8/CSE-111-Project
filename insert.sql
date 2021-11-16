-- David Dominguez & Salvador Rodriguez
-- We have separate SQL scripts to improve readability and simplicity rather than just 
-- overloading one file with all the SQL scripts.

-- Insertion of sample users into table.
INSERT INTO Users(u_user_id, u_email, u_password) VALUES ('admin', 'email@protonmail.com', 'password');
INSERT INTO Users(u_user_id, u_email, u_password) VALUES ('user1', 'user1@protonmail.com', 'passworduser1');
INSERT INTO Users(u_user_id, u_email, u_password) VALUES ('user2', 'user2@protonmail.com', 'passworduser2');
INSERT INTO Users(u_user_id, u_email, u_password) VALUES ('user3', 'user3@protonmail.com', 'passworduser3');
INSERT INTO Users(u_user_id, u_email, u_password) VALUES ('user4', 'user4@protonmail.com', 'passworduser4');
INSERT INTO Users(u_user_id, u_email, u_password) VALUES ('user5', 'user5@protonmail.com', 'passworduser5');

-- Insertion of sample posts into table.
INSERT INTO Posts(p_user_id, p_content, p_post_id) VALUES ('admin', 'Hi everyone welcome to our CSE-111 Project!', 1);
INSERT INTO Posts(p_user_id, p_content, p_post_id) VALUES ('user2', 'yo trying to connect with people', 2);
INSERT INTO Posts(p_user_id, p_content, p_post_id) VALUES ('user3', 'Who has a cool car?', 3);
INSERT INTO Posts(p_user_id, p_content, p_post_id) VALUES ('user4', 'Looking to buy a new car, tips?', 4);
INSERT INTO Posts(p_user_id, p_content, p_post_id) VALUES ('admin', 'Car club looking for members', 5);

-- Insertion of sample comments into table.
INSERT INTO Comments(c_user_id, c_reply_post_id, c_id, c_content) VALUES ('admin', 1, 1, 'Sample comment.');
INSERT INTO Comments(c_user_id, c_reply_post_id, c_id, c_content) VALUES ('user1', 2, 2, 'yo');
INSERT INTO Comments(c_user_id, c_reply_post_id, c_id, c_content) VALUES ('user2', 2, 3, 'yo whats up');

-- Insertion of Commenters. 
INSERT INTO Commenters(cm_id, cm_user_id, cm_count) VALUES (1, 'admin', 1);
INSERT INTO Commenters(cm_id, cm_user_id, cm_count) VALUES (2, 'user1', 1);
INSERT INTO Commenters(cm_id, cm_user_id, cm_count) VALUES (3, 'user2', 1);


-- Insertion of Features.
INSERT INTO Features(f_id, f_features) VALUES (1, 'Leather Seats');
INSERT INTO Features(f_id, f_features) VALUES (2, 'Navigation sys/carplay');
INSERT INTO Features(f_id, f_features) VALUES (3, 'Sunroof');
INSERT INTO Features(f_id, f_features) VALUES (4, 'auto/manual transmission');

-- Insertion of Best Selling Cars.
