const fs = require('fs');

/* ***********************************************************************************
    Synchronous way of read and write files, it uses buffer
    which are not asynchronous, therefore, this can be blocking
    if the file beign readed is too large.
    

    fs.readFile('./assets/doguinho.jpg', (error, buffer) => {
        console.log(buffer);
    
        fs.writeFile('./assets/doguinho-clone-1.jpg', buffer, (error) => {
            console.log('Image was written...');
        });
    });
* ***********************************************************************************/


// Using Streams to read and write files in a asynchronous way
fs.createReadStream('./assets/doguinho.jpg')
    .pipe(fs.createWriteStream('./assets/doguinho-clone-2.jpg'))
    .on('finish', () => {
        console.log('Doguinho clone was written successfuly...')
    });