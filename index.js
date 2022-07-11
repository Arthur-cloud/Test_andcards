
const { resolve } = require('path');
const { readdir, writeFile} = require('fs').promises;

let dir = __dirname + '\\Folder' // Folder example

async function recursiveSearch(dir) {

    const directoryContents = await readdir(dir, { withFileTypes: true });
    let folder = 0
    let file = 0

    writeFile(dir + '\\info.json', JSON.stringify({dir : dir, file : file, folder : folder }),(err) => {console.log(err)})

    let result = await Promise.all(directoryContents.map((filePath) => {
        let res = resolve(dir, filePath.name);

        if(filePath.isDirectory()) folder += 1
        if(filePath.isFile()) file += 1

        writeFile(dir + '\\info.json', JSON.stringify({dir : dir, file : file, folder : folder }),(err) => {console.log(err)})

        if(!filePath.isDirectory()) {
            return res
        } else {
            return recursiveSearch(res)
        }
    }));
    return Array.prototype.concat(...result)
} 

recursiveSearch(dir)
    .then(result => console.log(result))
    .catch(err => console.log(err))

