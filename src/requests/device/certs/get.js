const nexus = require('@ospin/nexus')

async function getCert(deviceId) {
  const {
    success, data, status, errorMsg,
  } = await nexus.device.certificate.get(deviceId);

  if (!success) {
    throw new Error(`Something went wrong: ${errorMsg}`);
  }

  return data;
}

module.exports = getCert
