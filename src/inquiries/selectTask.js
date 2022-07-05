const inquirer = require('inquirer')
const createDevice = require('./createDevice')
const createNewHeidolphCoreGateway = require('./createHeidolphCoreGateway')
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
        }, {
          name: 'Create a new Heidolph Core Gateway Device',
          value: 'createHeidolphCoreGateway',
        }],
      },
    ]).then(({ task }) => {
      switch (task) {
        case 'createDevice':
          console.log(`%c${clippy('it looks like you are trying to create a device')}`, 'font-family: monospace');
          inquirer.registerPrompt('createDevice', createDevice());
          break;
        case 'createHeidolphCoreGateway':
          console.log(`%c${clippy('it looks like you are trying to create a heidolph core gateway device')}`, 'font-family: monospace');
          inquirer.registerPrompt('createHeidolphCoreGateway', createNewHeidolphCoreGateway());
          break;
        default:
          break;
      }
    }));
}

module.exports = selectTask
