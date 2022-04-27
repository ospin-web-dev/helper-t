import nexus from '@ospin/nexus'
import inquirer from 'inquirer'
import createDevice from '../requests/device/create.js'
import getAndSaveCertificate from '../requests/requestAndSaveCerts.js'
import FileSystemUtils from '../utils/FileSystemUtils.js'

function generatePromptsFromManufacturerList(data){
  return {
    name: 'manufacturerId',
    message: 'Please confirm the manufacturer',
    type: 'list',
    choices: data.map(manufacturer =>  ({ name: manufacturer.name, value: manufacturer.id }))
  }
}

function generatePromptsFromModelList(data) {
  return {
    name: 'manufacturerDeviceTypeId',
    message: 'Please confirm the model of the device',
    type: 'list',
    choices: data.map(model =>  ({ name: model.name, value: model.id }))
  }
 }

export default async function createNewDeviceFlow() {

  const { success,errorMsg,data } = await nexus.device.manufacturer.list()
  if (!success) {
    throw new Error(`Could not fetch Manufacturer List: ${errorMsg}`)
  }

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
    },
    {
      name: 'baseName',
      message: 'What would you like the devices to be called',
      validate: function(input) {
        if (!input && input.length <= 53) {
          throw new Error('Invalid Device Name, please enter a name with less than 53 characters')
        }
        return true
      }
    },
    generatePromptsFromManufacturerList(data)

]).then(async ({numberOfDevices,baseName,manufacturerId}) =>{
  const { success,errorMsg,data } = await nexus
  .device.manufacturer.deviceType.list({ manufacturerId })
  if (!success) {
    throw new Error(`Could not fetch Manufacturer List: ${errorMsg}`)
  }
  inquirer.prompt([generatePromptsFromModelList(data)])
    .then(async({manufacturerDeviceTypeId}) => {
      if (!FileSystemUtils.isFolderEmpty('./out/')) {
        console.log('OutFolder still contains files,remove these and restart')
        process.exit(0)
      }
      for (let index = 0; index < numberOfDevices; index++) {
        const deviceData = await createDevice({
          name: `${baseName}_${index}`,
          manufacturerDeviceTypeId,
        })
        await getAndSaveCertificate(deviceData.id)
      }
  })
}))
}
