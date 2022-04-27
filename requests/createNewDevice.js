import nexus from '@ospin/nexus'

export default async function createNewDevice(userInput) {
  const { name } = userInput
  const { success, errorMsg, status, data } = await nexus.device.create({
    name,
    isVirtual: false
  })

  if (!success) {
    throw new Error(`Could not create device: ${errorMsg}`)
  }

  return data


}
