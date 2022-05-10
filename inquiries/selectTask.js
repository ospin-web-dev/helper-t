import inquirer from 'inquirer'
import createDevice from './createDevice.js';
import createNewHeidolphCoreGateway from './createHeidolphCoreGateway.js';
import clippy from '../clippy.js'

export default function selectTask() {
  return (inquirer
  .prompt([
    {
      name: 'task',
      type: 'list',
      choices: [{
        name: 'Create a new device',
        value: 'createDevice'
      },{
        name: 'Create a new Heidolph Core Gateway Device',
        value: 'createHeidolphCoreGateway'
      }]
    },
]).then(({task}) =>{
  console.log(task);
  switch (task) {
    case 'createDevice':
      console.log(`%c${clippy('it looks like you are trying to create a device')}`,"font-family: monospace")
      inquirer.registerPrompt('createDevice',createDevice())
      break;
    case 'createHeidolphCoreGateway':
      console.log(`%c${clippy('it looks like you are trying to create a heidolph core gateway device')}`,"font-family: monospace")
      inquirer.registerPrompt('createHeidolphCoreGateway',createNewHeidolphCoreGateway())
      break
    default:
      break;
  }

}))
}
