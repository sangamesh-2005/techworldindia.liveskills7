const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host:     process.env.DB_HOST || 'localhost',
  user:     process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'techworld',
  port:     process.env.DB_PORT || 3306
});

db.connect(err => {
  if (err) console.error('DB connection error:', err);
  else console.log('DB connected');
});

module.exports = db;
