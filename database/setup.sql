DROP TABLE IF EXISTS diary_entry;
DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) UNIQUE NOT NULL,
    user_password CHAR(60) NOT NULL, 
    PRIMARY KEY (user_id)
);

CREATE TABLE diary_entry (
    diary_entry_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL,
    category VARCHAR (100) NOT NULL,
    date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    author_id INT NOT NULL,
    PRIMARY KEY (diary_entry_id),
    FOREIGN KEY (author_id) REFERENCES user_account("user_id")
);

