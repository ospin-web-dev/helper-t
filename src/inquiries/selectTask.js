const inquirer = require('inquirer')
const createDevice = require('./createDevice')
const clippy = require('../utils/clippy')

function selectTask() {
  return (inquirer
    .prompt([
      {
        name: 'task',
        type: 'list',
        choices: [{
          name: 'Create a new device',
          value: 'createDevice',
        }],
      },
    ]).then(({ task }) => {
      switch (task) {
        case 'createDevice':
          console.log(`%c${clippy('it looks like you are trying to create a device')}`, 'font-family: monospace');
          inquirer.registerPrompt('createDevice', createDevice());
          break;
        default:
          break;
      }
    }));
}

module.exports = selectTask
