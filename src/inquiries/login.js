const inquirer = require('inquirer')
const nexus = require('@ospin/nexus')
const FileSystemUtils = require('../utils/FileSystemUtils')
const selectTask = require('./selectTask')

function login() {
  if (!FileSystemUtils.isFolderEmpty('./out/')) {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.log('Warning: OutFolder still contains files proceed at your own risk!');
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  }

  return (inquirer
    .prompt([
      {
        type: 'list',
        name: 'stage',
        message: 'Select the stage?',
        choices: ['dev', 'staging', 'prod'],
      },

      {
        name: 'userName',
        message: 'Please enter your Ospin Username',
        validate(input) {
          if (!input) {
            throw new Error('Invalid Username, please provide a valid username');
          }
          return true;
        },
      },
      {
        name: 'password',
        type: 'password',
        message: 'Please enter your Ospin Password',
        validate(input) {
          if (!input) {
            throw new Error('Invalid Password, please provide a valid password');
          }
          return true;
        },
      },
    ]).then(async ({ stage, userName, password }) => {
      nexus.connect({
        ENV: stage,
      });
      const { success, data } = await nexus.auth.signIn(userName, password);
      if (!success) {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log('                   ACCESS DENIED                                 ');
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        process.exit(0);
      } else {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(`                   WELCOME BACK ${data.username.toUpperCase()}                                `);
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        inquirer.registerPrompt('selectTask', selectTask());
      }
    }));
}

module.exports = login
