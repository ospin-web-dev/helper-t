import nexus from '@ospin/nexus'

export default async function createNewDevice(userInput) {
  const { success, errorMsg, status, data } = await nexus.device.create({
    ...userInput,
    isVirtual: false
  })
  console.log(`Device ${data.name} has been created`)

  if (!success) {
    throw new Error(`Could not create device: ${errorMsg}`)
  }

  return data
}
