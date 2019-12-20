const fs = require('fs');

function getJsonFile(filename) {
    let rawdata = fs.readFileSync(filename);
    return JSON.parse(rawdata);
}

function writeToJsonFile(jsonObject, filename) {
    let data = JSON.stringify(jsonObject, null, 2);
    fs.writeFileSync(filename, data);
}

module.exports = {
    getJsonFile,
    writeToJsonFile
}