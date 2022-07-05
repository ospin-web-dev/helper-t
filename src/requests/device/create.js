const nexus = require('@ospin/nexus')

async function createNewDevice(userInput) {
  const {
    success, errorMsg, data,
  } = await nexus.device.create({
    ...userInput,
    isVirtual: false,
  });
  console.log(`Device ${data.name} has been created`);

  if (!success) {
    throw new Error(`Could not create device: ${errorMsg}`);
  }

  return data;
}

module.exports = createNewDevice
