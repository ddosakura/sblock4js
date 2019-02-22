const MemoryAdapter = require('fs-adapters').MemoryAdapter
const unzip = require('./a_zip')

module.exports = function (raw, algorithm = "default") {
    // https://www.npmjs.com/package/fs-adapters
    const adapter = new MemoryAdapter()
    adapter.init()

    switch (algorithm) {
        case "origin":
        case "zip":
        case "default":
            unzip(raw, adapter)
            break
        default:
            return [null, new Error("Unknow Algorithm")]
    }

    return [adapter, null]
}
