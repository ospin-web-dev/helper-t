const inquirer = require('inquirer')
const nexus = require('@ospin/nexus')
const FileSystemUtils = require('../utils/FileSystemUtils')
const createDevice = require('../requests/device/create')
const requestAndSaveCerts = require('../requests/requestAndSaveCerts')

function sanitizeDevicename(name) {
  return name.replace(/\s/g, '-');
}

function generatePromptsFromManufacturerList(data) {
  return {
    name: 'manufacturerId',
    message: 'Please confirm the manufacturer',
    type: 'list',
    choices: data.map((manufacturer) => ({ name: manufacturer.name, value: manufacturer.id })),
  };
}

function generatePromptsFromModelList(data) {
  return {
    name: 'manufacturerDeviceTypeId',
    message: 'Please confirm the model of the device',
    type: 'list',
    choices: data.map((model) => ({ name: model.name, value: model.id })),
  };
}

async function createNewDeviceFlow() {
  const { success, errorMsg, data } = await nexus.device.manufacturer.list();
  if (!success) {
    throw new Error(`Could not fetch Manufacturer List: ${errorMsg}`);
  }

  return (inquirer
    .prompt([
      {
        name: 'name',
        message: 'What would you like the devices to be called',
        validate(input) {
          if (!input && input.length <= 53) {
            throw new Error('Invalid Device Name, please enter a name with less than 53 characters');
          }
          return true;
        },
      },
      generatePromptsFromManufacturerList(data),

    ]).then(async ({ name, manufacturerId }) => {
      const { success, errorMsg, data } = await nexus
        .device.manufacturer.deviceType.list({ manufacturerId });
      if (!success) {
        throw new Error(`Could not fetch Manufacturer List: ${errorMsg}`);
      }
      inquirer.prompt([generatePromptsFromModelList(data)])
        .then(async ({ manufacturerDeviceTypeId }) => {
          if (!FileSystemUtils.isFolderEmpty('./out/')) {
            console.log('OutFolder still contains files,remove these and restart');
            process.exit(0);
          }
          const deviceData = await createDevice({
            name,
            manufacturerDeviceTypeId,
          });
          await requestAndSaveCerts({ deviceId: deviceData.id, deviceName: sanitizeDevicename(deviceData.name) });
        });
    }));
}

module.exports = createNewDeviceFlow
