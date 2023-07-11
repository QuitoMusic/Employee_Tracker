const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Michelle1990@',
  database: 'employee_management',
});