import inquirer from 'inquirer'
import createDevice from './createDevice.js';
import clippy from '../clippy.js'

export default function selectTask() {
  return (inquirer
  .prompt([
    {
      name: 'task',
      type: 'list',
      choices: [{
        name: 'Create new Devices',
        value: 'createDevice'
      }]
    }

]).then(({task}) =>{
  console.log(task);
  switch (task) {
    case 'createDevice':
      console.log(`%c${clippy}`,"font-family: monospace")
      inquirer.registerPrompt('createDevice',createDevice())
      break;

    default:
      break;
  }

}))
}
