import fs from 'fs'
import FileSystemUtils from '../utils/FileSystemUtils.js'
import nexus from '@ospin/nexus'

const AMAZON_ROOT_CA_LOCATION = './certs/AmazonRootCA1.pem'

const FILE_NAMES ={
  certificatePem: 'deviceCertificate.crt',
  privateKey: 'privateKey.key',
  publicKey: 'publicKey.key'
}

async function getCert(deviceId) {
  const {
    success,
    data,
    status,
    errorMsg,
  } = await nexus.device.certificate.get(deviceId)
  if (!success) {
    throw new Error(`Something went wrong: ${errorMsg}`)
  }
  return data
}

function generateClientIdJSONData(clientId) {
   return JSON.stringify({clientId})
}


function saveCertsToFilesystem(deviceId, certs) {
  const folder = `./out/${deviceId}`
  fs.mkdirSync(folder, { recursive: true })

  Object.entries(certs).map(([key,value]) => {
    const path = `${folder}/${FILE_NAMES[key]}`
    FileSystemUtils.writeToFile(path,value)
  })

  FileSystemUtils.writeToFile(`${folder}/clientId.json`,generateClientIdJSONData(deviceId))
  FileSystemUtils.copyFile(AMAZON_ROOT_CA_LOCATION,`${folder}/AmazonRootCA1.crt`)
}

export default async function getAndSaveCertificate(deviceId){
  const data = await getCert(deviceId)
  saveCertsToFilesystem(deviceId, data)
}
