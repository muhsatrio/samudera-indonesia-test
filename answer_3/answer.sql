-- DDL

CREATE TABLE User (
  Id varchar(100) PRIMARY KEY DEFAULT (UUID()),
  Nama varchar(100) DEFAULT NULL,
  Email varchar(100) DEFAULT NULL,
  telp int(100) DEFAULT NULL
);

CREATE TABLE Company (
  Id varchar(100) PRIMARY KEY DEFAULT (UUID()),
  User_id varchar(100) DEFAULT NULL,
  Company_code varchar(100) DEFAULT NULL,
  Company_name varchar(100) DEFAULT NULL,
  FOREIGN KEY (User_id) REFERENCES User(Id)
);

-- Query

SELECT User_id, Company.Id as Company_id, Nama, Email, telp as Telp, Company_code, Company_name FROM User INNER JOIN Company ON User.Id = Company.User_id;