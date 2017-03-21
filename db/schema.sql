CREATE TABLE users
(
   userId int NOT NULL AUTO_INCREMENT,
   fullname varchar(255) NOT NULL,
   username varchar(255) NOT NULL,
   email varchar(255) NOT NULL,
   password varchar(255) NOT NULL,
   date TIMESTAMP,
   PRIMARY KEY (userId)
);
