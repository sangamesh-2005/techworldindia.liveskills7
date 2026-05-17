-- ============================================================
--  techworldindia.liveskills2026  –  MySQL Database Schema
--  Run this file once to set up the database:
--    mysql -u root -p < database.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS techworldindia;
USE techworldindia;

-- ── Users ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(150)  NOT NULL UNIQUE,
  password    VARCHAR(255)  NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ── Questions ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS questions (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  question  TEXT         NOT NULL,
  options   JSON         NOT NULL,          -- stored as JSON array
  answer    VARCHAR(255) NOT NULL,
  category  VARCHAR(50)  DEFAULT 'general', -- e.g. aptitude, dsa, web
  created_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

-- ── Scores ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS scores (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  user_id      INT           NULL,           -- NULL for guest attempts
  guest_name   VARCHAR(100)  DEFAULT 'Guest',
  score        INT           NOT NULL,
  total        INT           NOT NULL,
  percentage   INT           NOT NULL,
  submitted_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ── Practice Problems ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS practice_problems (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  description TEXT,
  difficulty  ENUM('Easy','Medium','Hard') DEFAULT 'Easy',
  category    VARCHAR(50)  DEFAULT 'general',
  solution    TEXT,
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ── Hackathons ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hackathons (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  title             VARCHAR(200) NOT NULL,
  description       TEXT,
  date              DATE         NOT NULL,
  location          VARCHAR(100) DEFAULT 'Online',
  prize             VARCHAR(100),
  registration_link VARCHAR(255),
  created_at        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ── Contact Messages ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL,
  message    TEXT         NOT NULL,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
--  SEED DATA
-- ============================================================

-- Questions
INSERT INTO questions (question, options, answer, category) VALUES
('What is a data structure?',
 '["Way of organizing data","Programming language","Operating system","Database"]',
 'Way of organizing data', 'dsa'),

('Which data structure is used for recursion?',
 '["Queue","Array","Stack","Linked List"]',
 'Stack', 'dsa'),

('Which data structure follows FIFO?',
 '["Stack","Queue","Tree","Graph"]',
 'Queue', 'dsa'),

('Which data structure follows LIFO?',
 '["Queue","Array","Stack","Graph"]',
 'Stack', 'dsa'),

('Which algorithm is used in Quick Sort?',
 '["Divide and Conquer","Greedy","Dynamic Programming","Backtracking"]',
 'Divide and Conquer', 'dsa'),

('What is the full form of HTML?',
 '["Hyper Text Markup Language","High Text Machine Language","Hyper Transfer Markup Language","Hyper Tool Markup Language"]',
 'Hyper Text Markup Language', 'web'),

('What is the full form of CSS?',
 '["Cascading Style Sheets","Creative Style Sheets","Colorful Style Sheets","Computer Style Sheets"]',
 'Cascading Style Sheets', 'web'),

('Which language is primarily used for web development?',
 '["C","Java","JavaScript","Python"]',
 'JavaScript', 'web'),

('Which company developed JavaScript?',
 '["Google","Microsoft","Netscape","Apple"]',
 'Netscape', 'web'),

('Which HTML tag is used for images?',
 '["img","image","src","pic"]',
 'img', 'web'),

('10 + 20 = ?',
 '["10","20","30","40"]',
 '30', 'aptitude'),

('15 - 5 = ?',
 '["5","10","15","20"]',
 '10', 'aptitude'),

('12 × 2 = ?',
 '["12","24","36","48"]',
 '24', 'aptitude'),

('100 / 5 = ?',
 '["10","15","20","25"]',
 '20', 'aptitude'),

('Which data structure is used in BFS?',
 '["Stack","Queue","Tree","Graph"]',
 'Queue', 'dsa'),

('Which data structure is used in DFS?',
 '["Queue","Stack","Array","Linked List"]',
 'Stack', 'dsa'),

('Which tree balances itself automatically?',
 '["Binary Tree","AVL Tree","Heap","Graph"]',
 'AVL Tree', 'dsa'),

('Which sorting algorithm is generally the fastest?',
 '["Bubble Sort","Selection Sort","Quick Sort","Insertion Sort"]',
 'Quick Sort', 'dsa'),

('Which company owns GitHub?',
 '["Google","Amazon","Microsoft","Meta"]',
 'Microsoft', 'general'),

('Node.js is mainly used for?',
 '["Frontend","Backend","Database","Design"]',
 'Backend', 'web'),

('MongoDB is a?',
 '["Programming Language","Database","Framework","Browser"]',
 'Database', 'web'),

('React is a?',
 '["Frontend Library","Database","OS","Browser"]',
 'Frontend Library', 'web'),

('Which method prints output to the console in JavaScript?',
 '["console.log()","print()","echo()","write()"]',
 'console.log()', 'web'),

('Which keyword declares a variable in JavaScript?',
 '["var","float","number","loop"]',
 'var', 'web'),

('Which HTML tag creates a heading?',
 '["h1","p","div","span"]',
 'h1', 'web'),

('Which CSS property changes text color?',
 '["font","background","color","style"]',
 'color', 'web'),

('Which command installs packages in Node.js?',
 '["npm install","node install","npm start","install node"]',
 'npm install', 'web'),

('Which database is NoSQL?',
 '["MongoDB","MySQL","Oracle","PostgreSQL"]',
 'MongoDB', 'web'),

('What does CPU stand for?',
 '["Central Processing Unit","Computer Personal Unit","Central Program Unit","Control Processing Unit"]',
 'Central Processing Unit', 'general'),

('Which operator is used for multiplication in most languages?',
 '["+","-","*","/"]',
 '*', 'aptitude');


-- Practice Problems
INSERT INTO practice_problems (title, description, difficulty, category) VALUES
('Reverse a String', 'Write a function that reverses a given string without using built-in reverse functions.', 'Easy', 'dsa'),
('Find the Maximum Element', 'Find the maximum element in an array of integers.', 'Easy', 'dsa'),
('Check Palindrome', 'Determine if a given string is a palindrome.', 'Easy', 'dsa'),
('FizzBuzz', 'Print numbers 1-100. For multiples of 3 print Fizz, multiples of 5 print Buzz, both print FizzBuzz.', 'Easy', 'aptitude'),
('Fibonacci Sequence', 'Generate the first N numbers of the Fibonacci sequence.', 'Easy', 'dsa'),
('Binary Search', 'Implement binary search on a sorted array.', 'Medium', 'dsa'),
('Linked List Reversal', 'Reverse a singly linked list.', 'Medium', 'dsa'),
('Balanced Parentheses', 'Check if a string of parentheses is balanced using a stack.', 'Medium', 'dsa'),
('Two Sum Problem', 'Given an array and a target, find two numbers that add up to the target.', 'Medium', 'dsa'),
('Level Order Tree Traversal', 'Traverse a binary tree level by level (BFS).', 'Medium', 'dsa'),
('Longest Common Subsequence', 'Find the length of the longest common subsequence between two strings.', 'Hard', 'dsa'),
('Merge K Sorted Lists', 'Merge K sorted linked lists into one sorted linked list.', 'Hard', 'dsa'),
('Build a REST API', 'Create a simple REST API with CRUD operations using Node.js and Express.', 'Medium', 'web'),
('Responsive Navbar', 'Build a responsive navigation bar using HTML, CSS, and JavaScript.', 'Easy', 'web'),
('SQL Joins Practice', 'Write SQL queries using INNER JOIN, LEFT JOIN, and RIGHT JOIN.', 'Medium', 'database');


-- Hackathons
INSERT INTO hackathons (title, description, date, location, prize, registration_link) VALUES
('CodeSprint 2026', '24-hour national coding hackathon for engineering students.', '2026-06-15', 'Bangalore, Karnataka', '₹1,00,000', 'https://example.com/codesprint'),
('HackIndia 2026', 'Pan-India hackathon focused on AI and ML solutions.', '2026-07-10', 'Delhi, India', '₹2,00,000', 'https://example.com/hackindia'),
('WebWave Hackathon', 'Build innovative web applications in 48 hours.', '2026-08-05', 'Online', '₹50,000', 'https://example.com/webwave'),
('SmartIndia Hackathon', 'Government-backed hackathon solving real national problems.', '2026-09-20', 'Multiple Cities', '₹5,00,000', 'https://sih.gov.in'),
('TechWorld BuildFest', 'Our own community hackathon — open to all students!', '2026-10-01', 'Belagavi, Karnataka', '₹25,000', 'https://example.com/buildfest');
