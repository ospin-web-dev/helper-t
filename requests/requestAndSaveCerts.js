import fs from 'fs'
import FileSystemUtils from '../utils/FileSystemUtils.js'
import getCert from './device/certs/get.js'
const AMAZON_ROOT_CA_LOCATION = './certs/AmazonRootCA1.pem'

const FILE_NAMES ={
  certificatePem: 'deviceCertificate.crt',
  privateKey: 'privateKey.key',
  publicKey: 'publicKey.key'
}


function generateClientIdJSONData(clientId) {
  return JSON.stringify({clientId})
}


function saveCertsToFilesystem(deviceId, certs) {
  const folder = `./out/${deviceId}`
  fs.mkdirSync(folder, { recursive: true })

  Object.entries(certs).map(([key,value]) => {
    FileSystemUtils.writeToFile(`${folder}/${FILE_NAMES[key]}`,value)
  })

  FileSystemUtils.writeToFile(`${folder}/clientId.json`,generateClientIdJSONData(deviceId))
  FileSystemUtils.copyFile(AMAZON_ROOT_CA_LOCATION,`${folder}/AmazonRootCA1.crt`)
}


export default async function getAndSaveCertificate(deviceId){
  const data = await getCert(deviceId)
  saveCertsToFilesystem(deviceId, data)

}
