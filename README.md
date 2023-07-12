# Employee_Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [License](#license)

## Description

The Employee Tracker is a command-line application designed to help businesses manage their employee database. It utilizes MySQL as the database management system and provides functionality to update, view, and delete departments, employees, and roles. Additionally, it can display the budget for each department.

## Installation

First, search for repository on Github called Employee_Tracker. Then, on the top-right corner, click 'Code' and copy the link. Afterwards, go to VSCode and open the local terminal from the desired parent repostory where you desire to install the Employee_Tracker. Then, write 'git clone (paste link here)'. Finally, you'll notice the repository has been installed for your convenience. Before making any changes, make sure that the propper dependencies have been downloaded to prevent bugs or functionality issues.

## Usage

First, right-click on the parent repository called Employee_Tracker  and select "Open integrated terminal". Download all dependencies(write npm i inquirer@8.2.4 on the terminal). As a rule, since we have a db folder with the files containing schema.sql and seeds.sql, we should always remember to run the MySql terminal by writing  "mysql -u root -p", write your password and then source each file file writing "source schema.sql; and source seeds.sql;" to write those files on the databases and display tables. Make sure you select the correct database by writing "Select * from <Database name>". Finally, write 'node index.js' on the terminal. At this point, prompts should start and you can select your options to view, edit and delete what you desire.

I. Main menu:
<br>![](./assets/images/Node%20index.png)<br>
a. How to view employees:
<br>![](./assets/images/View%20all%20Employees.png)<br>
b. How to view roles:
<br>![](./assets/images/View%20all%20roles.png)<br>
c. How to view departments:
<br>![](./assets/images/View%20all%20depts.png)<br>
d. How to view employees by department:
<br>![](./assets/images/View%20employees%20by%20dept.png)<br>
e. How to view employees by manager:
<br>![](./assets/images/View%20employees%20by%20manager.png)<br>
f. How to update employee role:
<br>![](./assets/images/Update%20employee%20role.png)<br>
g. How to delete a department:
<br>![](./assets/images/Delete%20department.png)<br>
h. How to delete an employee:
<br>![](./assets/images/Delete%20employee.png)<br>
i. How to delete a role:
<br>![](./assets/images/Delete%20role.png)<br>
j. How to add an employee:
<br>![](./assets/images/Add%20an%20employee.png)<br>
k. How to add a department:
<br>![](./assets/images/Add%20Department.png)<br>
l. How to add a role:
<br>![](./assets/images/Add%20a%20role.png)<br>
m. How to view budget by department:
<br>![](./assets/images/View%20department's%20budget.png)<br>


## Contributing

If you would like to contribute as a developer, you can submit a pull request. Before starting any substantial work, it's recommended to open an issue to discuss your proposed changes with the lead developer.

## Tests

No tests were performed for this app.

## Questions

For any questions, please contact me:

- GitHub: [QuitoMusic](https://github.com/QuitoMusic)
- Email: f86gonzalez@outlook.com

## License

This project is licensed under the MIT License.
