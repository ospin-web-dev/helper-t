import nexus from '@ospin/nexus'

export default async function createNewDevice(userInput) {
  const { success, errorMsg, status, data } = await nexus.device.createHeidolphCoreGateway({
    ...userInput,
    isVirtual: false
  })

  console.log( { success, errorMsg, status, data });

  if (!success) {
    throw new Error(`Could not create device: ${errorMsg}`)
  }

  return data.devices
}
