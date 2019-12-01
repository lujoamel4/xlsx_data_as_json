/**
 * Module interface
 */
const JsonFactory = require('./JsonFactory')

module.exports = {
  parseFile: (fileUrl, headers) => {
    const jf = new JsonFactory()
    return jf.getData(fileUrl, headers)
  }
}
