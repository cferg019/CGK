DROP DATABASE IF EXISTS watchlist;
CREATE DATABASE watchlist;
USE watchlist;

CREATE TABLE NewMedia (
	id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    mediaType VARCHAR(100) NOT NULL, 
    watched BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);
