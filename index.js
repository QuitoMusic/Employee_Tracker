const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
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

  // Function to view all departments
function viewDepartments() {
    const query = 'SELECT * FROM department';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error viewing departments:', err);
        promptMainMenu();
        return;
      }
      console.table(results);
      promptMainMenu();
    });
  }

  // Function to view all roles
function viewRoles() {
    const query = `
      SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      INNER JOIN department ON role.department_id = department.id
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error viewing roles:', err);
        promptMainMenu();
        return;
      }
      console.table(results);
      promptMainMenu();
    });
  }

  // Function to view all employees
function viewEmployees() {
    const query = `
      SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      INNER JOIN role ON employee.role_id = role.id
      INNER JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error viewing employees:', err);
        promptMainMenu();
        return;
      }
      console.table(results);
      promptMainMenu();
    });
  }

  // Function to add a department
function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the name of the department:',
          validate: (value) => value.trim() !== '',
        },
      ])
      .then((answers) => {
        const query = 'INSERT INTO department (name) VALUES (?)';
        db.query(query, [answers.name], (err) => {
          if (err) {
            console.error('Error adding department:', err);
            promptMainMenu();
            return;
          }
          console.log('Department added successfully!');
          promptMainMenu();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // Function to add a role
function addRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:',
          validate: (value) => value.trim() !== '',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary of the role:',
          validate: (value) => !isNaN(parseFloat(value)),
        },
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the department ID for the role:',
          validate: (value) => !isNaN(parseInt(value)),
        },
      ])
      .then((answers) => {
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        db.query(query, [answers.title, answers.salary, answers.departmentId], (err) => {
          if (err) {
            console.error('Error adding role:', err);
            promptMainMenu();
            return;
          }
          console.log('Role added successfully!');
          promptMainMenu();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

// Function to add an employee
function addEmployee() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "Enter the employee's first name:",
          validate: (value) => value.trim() !== '',
        },
        {
          type: 'input',
          name: 'lastName',
          message: "Enter the employee's last name:",
          validate: (value) => value.trim() !== '',
        },
        {
          type: 'input',
          name: 'roleId',
          message: "Enter the role ID for the employee:",
          validate: (value) => !isNaN(parseInt(value)),
        },
        {
          type: 'input',
          name: 'managerId',
          message: "Enter the manager ID for the employee (leave blank if none):",
          default: null,
          validate: (value) => value === '' || !isNaN(parseInt(value)),
        },
      ])
      .then((answers) => {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        db.query(query, [answers.firstName, answers.lastName, answers.roleId, answers.managerId], (err) => {
          if (err) {
            console.error('Error adding employee:', err);
            promptMainMenu();
            return;
          }
          console.log('Employee added successfully!');
          promptMainMenu();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // Function to update an employee role
function updateEmployeeRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the ID of the employee you want to update:',
          validate: (value) => !isNaN(parseInt(value)),
        },
        {
          type: 'input',
          name: 'roleId',
          message: 'Enter the new role ID for the employee:',
          validate: (value) => !isNaN(parseInt(value)),
        },
      ])
      .then((answers) => {
        const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
        db.query(query, [answers.roleId, answers.employeeId], (err) => {
          if (err) {
            console.error('Error updating employee role:', err);
            promptMainMenu();
            return;
          }
          console.log('Employee role updated successfully!');
          promptMainMenu();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // Function to view employees by manager
function viewEmployeesByManager() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'managerId',
          message: 'Enter the ID of the manager:',
          validate: (value) => !isNaN(parseInt(value)),
        },
      ])
      .then((answers) => {
        const query = `
          SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary
          FROM employee
          INNER JOIN role ON employee.role_id = role.id
          INNER JOIN department ON role.department_id = department.id
          WHERE employee.manager_id = ?
        `;
        db.query(query, [answers.managerId], (err, results) => {
          if (err) {
            console.error('Error viewing employees by manager:', err);
            promptMainMenu();
            return;
          }
          console.table(results);
          promptMainMenu();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      }); 
    }

    // Function to view employees by department
function viewEmployeesByDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the ID of the department:',
          validate: (value) => !isNaN(parseInt(value)),
        },
      ])
      .then((answers) => {
        const query = `
          SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary
          FROM employee
          INNER JOIN role ON employee.role_id = role.id
          INNER JOIN department ON role.department_id = department.id
          WHERE department.id = ?
        `;
        db.query(query, [answers.departmentId], (err, results) => {
          if (err) {
            console.error('Error viewing employees by department:', err);
            promptMainMenu();
            return;
          }
          console.table(results);
          promptMainMenu();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // Function to delete a department
function deleteDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the ID of the department you want to delete:',
          validate: (value) => !isNaN(parseInt(value)),
        },
      ])
      .then((answers) => {
        const query = 'DELETE FROM department WHERE id = ?';
        db.query(query, [answers.departmentId], (err) => {
          if (err) {
            console.error('Error deleting department:', err);
            promptMainMenu();
            return;
          }
          console.log('Department deleted successfully!');
          promptMainMenu();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  // Function to delete a role
  function deleteRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'roleId',
          message: 'Enter the ID of the role you want to delete:',
          validate: (value) => !isNaN(parseInt(value)),
        },
      ])
      .then((answers) => {
        const query = 'DELETE FROM role WHERE id = ?';
        db.query(query, [answers.roleId], (err) => {
          if (err) {
            console.error('Error deleting role:', err);
            promptMainMenu();
            return;
          }
          console.log('Role deleted successfully!');
          promptMainMenu();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  // Function to delete an employee
  function deleteEmployee() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the ID of the employee you want to delete:',
          validate: (value) => !isNaN(parseInt(value)),
        },
      ])
      .then((answers) => {
        const query = 'DELETE FROM employee WHERE id = ?';
        db.query(query, [answers.employeeId], (err) => {
          if (err) {
            console.error('Error deleting employee:', err);
            promptMainMenu();
            return;
          }
          console.log('Employee deleted successfully!');
          promptMainMenu();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    // Function to view the total utilized budget of a department
function viewDepartmentBudget() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the ID of the department:',
          validate: (value) => !isNaN(parseInt(value)),
        },
      ])
      .then((answers) => {
        const query = `
          SELECT department.id, department.name, SUM(role.salary) AS utilized_budget
          FROM employee
          INNER JOIN role ON employee.role_id = role.id
          INNER JOIN department ON role.department_id = department.id
          WHERE department.id = ?
        `;
        db.query(query, [answers.departmentId], (err, results) => {
          if (err) {
            console.error('Error viewing department budget:', err);
            promptMainMenu();
            return;
          }
          console.table(results);
          promptMainMenu();
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }