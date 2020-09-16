/* ***********************************************************************************
    Synchronous way of read and write files, it uses buffer
    which are not asynchronous, therefore, this can be blocking
    if the file beign readed is too large.
    
    const fs = require('fs');

    fs.readFile('./assets/doguinho.jpg', (error, buffer) => {
        console.log(buffer);
    
        fs.writeFile('./assets/doguinho-clone-1.jpg', buffer, (error) => {
            console.log('Image was written...');
        });
    });
* ***********************************************************************************/

const fs = require('fs');
const path = require('path');

module.exports = (imagePath, fileName, callBackCreatedImage) => {
    // Using Streams to read and write files in a asynchronous way
    const validTypes = ['jpg', 'png', 'jpeg'];
    const type = path.extname(imagePath);
    const typeIsValid = validTypes.indexOf(type.substring(1)) !== -1;

    if(!typeIsValid) {
        const errorMessage = `Invalid image type: ${type}`;
        return callBackCreatedImage(errorMessage, null)
    }

    const newPath = `./assets/images/${fileName}${type}`;

    fs.createReadStream(imagePath)
        .pipe(fs.createWriteStream(newPath))
        .on('finish', () => callBackCreatedImage(null, newPath));
}
