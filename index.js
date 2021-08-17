/**
 * Module interface
 */
const JsonFactory = require('./src/JsonFactory')

module.exports = {
  parseFile: (fileUrl, headers) => {
    const jf = new JsonFactory()
    return jf.getData(fileUrl, headers)
  }
}
