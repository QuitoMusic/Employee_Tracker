const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Michelle1990@',
  database: 'employee_management',
});

// Connect to the database
db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the Employee database.');
  
    // Prompt user with main menu questions
    promptMainMenu();
  });
  
  // Function to prompt the main menu
  function promptMainMenu() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'View employees by manager',
            'View employees by department',
            'Delete a department',
            'Delete a role',
            'Delete an employee',
            'View total utilized budget of a department',
            'Quit',
          ],
        },
      ])
      .then((answers) => {
        switch (answers.action) {
          case 'View all departments':
            viewDepartments();
            break;
          case 'View all roles':
            viewRoles();
            break;
          case 'View all employees':
            viewEmployees();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Update an employee role':
            updateEmployeeRole();
            break;
          case 'View employees by manager':
            viewEmployeesByManager();
            break;
          case 'View employees by department':
            viewEmployeesByDepartment();
            break;
          case 'Delete a department':
            deleteDepartment();
            break;
          case 'Delete a role':
            deleteRole();
            break;
          case 'Delete an employee':
            deleteEmployee();
            break;
          case 'View total utilized budget of a department':
            viewDepartmentBudget();
            break;
          case 'Quit':
            console.log('Good bye!');
           // End database connection
            db.end(); 
            break;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }