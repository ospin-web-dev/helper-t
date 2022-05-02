import fs from 'fs'
import FileSystemUtils from '../utils/FileSystemUtils.js'
import getCert from './device/certs/get.js'
const AMAZON_ROOT_CA_LOCATION = './certs/AmazonRootCA1.pem'

const FILE_NAMES ={
  certificatePem: 'deviceCertificate.crt',
  privateKey: 'privateKey.key',
  publicKey: 'publicKey.key'
}


function generateJSON(deviceId) {
  return JSON.stringify({deviceId})
}


function saveCertsToFilesystem({deviceId,deviceName,data}) {
  const folder = `./out/${deviceName}`
  fs.mkdirSync(folder, { recursive: true })

  Object.entries(data).map(([key,value]) => {
    FileSystemUtils.writeToFile(`${folder}/${FILE_NAMES[key]}`,value)
  })

  FileSystemUtils.writeToFile(`${folder}/deviceId.json`,generateJSON(deviceId))
  FileSystemUtils.copyFile(AMAZON_ROOT_CA_LOCATION,`${folder}/AmazonRootCA1.crt`)
}


export default async function getAndSaveCertificate({deviceId,deviceName}){
  const data = await getCert(deviceId)
  saveCertsToFilesystem({deviceId,deviceName,data})

}
