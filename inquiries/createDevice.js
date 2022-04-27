import nexus from '@ospin/nexus'
import inquirer from 'inquirer'
import createNewDevice from '../requests/createNewDevice.js'
import getAndSaveCertificate from '../requests/requestAndSaveCerts.js'
import FileSystemUtils from '../utils/FileSystemUtils.js'

export default function createDevice() {
  return (inquirer
  .prompt([
    {
      name: 'numberOfDevices',
      type: 'number',
      message: 'How many Devices would you like to create today?',
      validate: function(input) {
        if (input > 0 && input <= 10) {
          return true
        }
        throw new Error('Invalid Number of Devices, please enter a number between 1 and 10')
      }
    },{
      name: 'baseName',
      message: 'What would you like the devices to be called',
      validate: function(input) {
        if (!input && input.length <= 53) {
          throw new Error('Invalid Device Name, please enter a name with less than 53 characters')
        }
        return true
      }
    }

]).then(async ({numberOfDevices,baseName,assignedPorts}) =>{
  if (!FileSystemUtils.isFolderEmpty('./out/')) {
    console.log('OutFolder still contains files,remove these and restart')
    process.exit(0)
  }
  for (let index = 0; index < numberOfDevices; index++) {
    const deviceData = { name: `${baseName}_${index}` }
    const data = await createNewDevice(deviceData)
    await getAndSaveCertificate(data.id)
  }
}))
}
