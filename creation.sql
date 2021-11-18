-- Salvador Rodriguez & David Dominguez
-- 11/6/2021
--How to sign in etc
CREATE TABLE Users (
    u_user_id CHAR(50) NOT NULL,
    u_email CHAR(50) NOT NULL,
    u_password CHAR(50) NOT NULL
);

--Post content, pictures later
CREATE TABLE Posts (
    p_user_id CHAR(50) NOT NULL,
    p_content VARCHAR(500) NOT NULL,
    p_post_id INTEGER NOT NULL,
    p_type CHAR(50)
);

--Best selling cars based on year model etc
CREATE TABLE Best_Selling_Cars (
    b_id INTEGER NOT NULL,
    b_year year not null,
    b_model CHAR(50) NOT NULL,
    b_manufacturer CHAR(50) NOT NULL,
    b_amountSold INTEGER NOT NULL
);

--General comments on posts
CREATE TABLE Comments (
    c_user_id CHAR(50) NOT NULL,
    c_reply_post_id CHAR(50) NOT NULL,
    c_id CHAR(50) NOT NULL,
    c_content VARCHAR(500)
);

--Contains list of commenters, along with how many times commented
CREATE TABLE Commenters (
    cm_id CHAR(50) NOT NULL,
    cm_user_id CHAR(50) NOT NULL,
    cm_count INTEGER
);

--Contains features as chars
CREATE TABLE Features (
    f_id CHAR(50) NOT NULL,
    f_features CHAR(50) NOT NULL
);

CREATE TABLE SellingPost(
    s_post_id INTEGER NOT NULL
);



