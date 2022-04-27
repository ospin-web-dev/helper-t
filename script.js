import login from './inquiries/login.js'
import inquirer from 'inquirer'

inquirer.registerPrompt('login',login())
