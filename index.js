
const { resolve } = require('path');
const { readdir, writeFile} = require('fs').promises;

let dir = __dirname + '\\Folder' // Folder example

async function recursiveSearch(dir) {

    const directoryContents = await readdir(dir, { withFileTypes: true });
    let folder = 0
    let file = 0 // Set the value to one if you want the json file to be counted too

    writeFile(dir + '\\info.json', JSON.stringify({dir : dir, file : file, folder : folder }),(err) => {console.log(err)})
    console.log(`A new info.json file has been created on the path: ${dir + '\\info.json'}`)

    directoryContents.map((filePath) => {
        const res = resolve(dir, filePath.name);

        if(filePath.isDirectory()) folder += 1
        if(filePath.isFile()) file += 1

        writeFile(dir + '\\info.json', JSON.stringify({dir : dir, file : file, folder : folder }),(err) => {console.log(err)})

        if(!filePath.isDirectory()) {
            return res
        } else {
            return recursiveSearch(res)
        }
    });
} 

recursiveSearch(dir)

