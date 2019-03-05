/**
 * Module interface
 */
const jsonFactory = require("./JsonFactory");

//var exports = module.exports = {};

module.exports = {
    parseFile : (fileUrl, headers) => {
        const jf = new jsonFactory();
        return jf.getData(fileUrl, headers);
    }
}