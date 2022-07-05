const inquirer = require('inquirer')
const login = require('./inquiries/login')

inquirer.registerPrompt('login', login());
