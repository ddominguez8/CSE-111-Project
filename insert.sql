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
INSERT INTO Users(u_user_id, u_email, u_password) VALUES ('user6', 'user6@protonmail.com', 'passworduser6');
INSERT INTO Users(u_user_id, u_email, u_password) VALUES ('user7', 'user7@protonmail.com', 'passworduser7');
INSERT INTO Users(u_user_id, u_email, u_password) VALUES ('user8', 'user8@protonmail.com', 'passworduser8');
INSERT INTO Users(u_user_id, u_email, u_password) VALUES ('user9', 'user9@protonmail.com', 'passworduser9');

-- Insertion of sample posts into table.
INSERT INTO Posts(p_user_id, p_content, p_post_id, p_stype) VALUES ('admin', 'Hi everyone welcome to our CSE-111 Project!', 1, 'Yes');
INSERT INTO Posts(p_user_id, p_content, p_post_id, p_stype) VALUES ('user2', 'yo trying to connect with people', 2, 'No');
INSERT INTO Posts(p_user_id, p_content, p_post_id, p_stype) VALUES ('user3', 'Who has a cool car?', 3, 'No');
INSERT INTO Posts(p_user_id, p_content, p_post_id, p_stype) VALUES ('user4', 'Looking to buy a new car, tips?', 4, 'No');
INSERT INTO Posts(p_user_id, p_content, p_post_id, p_stype) VALUES ('admin', 'Car club looking for members', 5, 'No');
INSERT INTO Posts(p_user_id, p_content, p_post_id, p_stype) VALUES ('user7', 'Car club looking for members', 5, 'No');
INSERT INTO Posts(p_user_id, p_content, p_post_id, p_stype) VALUES ('user3', 'I wonder about the new Tesla', 6, 'No');
INSERT INTO Posts(p_user_id, p_content, p_post_id, p_stype) VALUES ('user8', 'Honda civic pic link', 7, 'Yes');
INSERT INTO Posts(p_user_id, p_content, p_post_id, p_stype) VALUES ('user5', 'comment your car here', 8, 'Yes');
INSERT INTO Posts(p_user_id, p_content, p_post_id, p_stype) VALUES ('user1', 'how is used market looking?', 9, 'No');
INSERT INTO Posts(p_user_id, p_content, p_post_id, p_stype) VALUES ('admin', 'red or black interior?', 10, 'No');

-- Insertion of sample comments into table.
INSERT INTO Comments(c_user_id, c_reply_post_id, c_id, c_content) VALUES ('admin', 1, 1, 'Sample comment.');
INSERT INTO Comments(c_user_id, c_reply_post_id, c_id, c_content) VALUES ('user1', 2, 2, 'yo');
INSERT INTO Comments(c_user_id, c_reply_post_id, c_id, c_content) VALUES ('user2', 2, 3, 'yo whats up');
INSERT INTO Comments(c_user_id, c_reply_post_id, c_id, c_content) VALUES ('admin', 1, 4, 'Sample comment.');
INSERT INTO Comments(c_user_id, c_reply_post_id, c_id, c_content) VALUES ('admin', 2, 5, 'yo');
INSERT INTO Comments(c_user_id, c_reply_post_id, c_id, c_content) VALUES ('user3', 4, 6, 'yo whats up');
INSERT INTO Comments(c_user_id, c_reply_post_id, c_id, c_content) VALUES ('admin', 1, 7, 'Please refer to rules.');
INSERT INTO Comments(c_user_id, c_reply_post_id, c_id, c_content) VALUES ('user5', 2, 8, 'yo');
INSERT INTO Comments(c_user_id, c_reply_post_id, c_id, c_content) VALUES ('user6', 5, 9, 'yo whats up');
INSERT INTO Comments(c_user_id, c_reply_post_id, c_id, c_content) VALUES ('user7', 7, 10, 'hello');


-- Insertion of Commenters. 
-- INSERT INTO Commenters(cm_id, cm_user_id, cm_count) VALUES (1, 'admin', 1);
-- INSERT INTO Commenters(cm_id, cm_user_id, cm_count) VALUES (2, 'user1', 1);
-- INSERT INTO Commenters(cm_id, cm_user_id, cm_count) VALUES (3, 'user2', 1);
-- INSERT INTO Commenters(cm_id, cm_user_id, cm_count) VALUES (1, 'user3', 1);
-- INSERT INTO Commenters(cm_id, cm_user_id, cm_count) VALUES (2, 'user4', 1);
-- INSERT INTO Commenters(cm_id, cm_user_id, cm_count) VALUES (3, 'user5', 1);
-- INSERT INTO Commenters(cm_id, cm_user_id, cm_count) VALUES (1, 'user6', 1);
-- INSERT INTO Commenters(cm_id, cm_user_id, cm_count) VALUES (2, 'user7', 1);
-- INSERT INTO Commenters(cm_id, cm_user_id, cm_count) VALUES (3, 'user8', 1);
-- INSERT INTO Commenters(cm_id, cm_user_id, cm_count) VALUES (3, 'user9', 1);

INSERT INTO Commenters 
    SELECT '1', c.c_user_id, '1'
    FROM Comments c
    WHERE c.c_user_id NOT IN
        (
            SELECT cm_user_id
            FROM Commenters
        );




-- Insertion of Features.
INSERT INTO Features(f_id, f_features) VALUES (1, 'Leather Seats');
INSERT INTO Features(f_id, f_features) VALUES (2, 'Navigation sys/carplay');
INSERT INTO Features(f_id, f_features) VALUES (3, 'Sunroof');
INSERT INTO Features(f_id, f_features) VALUES (4, 'auto/manual transmission');

    
-- Insertion of Best Selling Cars.
.mode "csv"
.headers off

.import '| tail -n +2 Best_Sell.csv' Best_Selling_Cars

-- Insert into carFeatures
INSERT INTO carFeatures
    SELECT b_id, abs(random() % 4) + 1
    FROM Best_Selling_Cars;

