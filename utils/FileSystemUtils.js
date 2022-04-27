import fs from 'fs'

class FileSystemUtils {

  static isFolderEmpty(path) {
    if (!fs.existsSync(path)){
      fs.mkdirSync(path, { recursive: true });
    }
    return fs.readdirSync(path).length === 0;
  }

  static writeToFile(fullPath,data){
    return fs.writeFile(fullPath, data, function (err) {
      if (err) return console.log(err);
      console.log(`${fullPath} has been created`)
    })
  }

  static copyFile(sourcepath, destinationPath) {
    return fs.createReadStream(sourcepath).pipe(fs.createWriteStream(destinationPath))
   }

}

export default FileSystemUtils
