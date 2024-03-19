CREATE DATABASE qanda;

USE qanda;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT PRIMARY KEY
);

CREATE TABLE questions (
  id INT NOT NULL AUTO_INCREMENT,
  question_id INT PRIMARY KEY,
  product_id INT,
  question_body TEXT,
  question_date TIMESTAMP,
  asker_name VARCHAR(255),
  question_helpfulness INT,
  reported TINYINT,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE answers (
  id INT NOT NULL AUTO_INCREMENT,
  answer_id INT PRIMARY KEY,
  question_id INT,
  body TEXT,
  date TIMESTAMP,
  answerer_name VARCHAR(255),
  helpfulness INT,
  answer_reported TINYINT,
  FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

CREATE TABLE photos (
  id INT NOT NULL AUTO_INCREMENT,
  photo_id BIGINT PRIMARY KEY,
  answer_id INT,
  photo_url TEXT,
  FOREIGN KEY (answer_id) REFERENCES answers(answer_id)
);

/* mysql -u root < schema.sql */