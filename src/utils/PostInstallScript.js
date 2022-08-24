const fs = require('fs')
const https = require('https')

function postInstallScript() {
  if (!fs.existsSync('./amazonRootCA')) {
    fs.mkdirSync('./amazonRootCA', { recursive: true });
  }

  const file = fs.createWriteStream('./amazonRootCA/AmazonRootCA1.pem');
  console.log('Downloading the Amazon Root CA 1');
  const request = https.get('https://www.amazontrust.com/repository/AmazonRootCA1.pem', (response) => {
    response.pipe(file);

    // after download completed close filestream
    file.on('finish', () => {
      file.close();
      console.log('Download Completed');
    });
  });
}

postInstallScript();
