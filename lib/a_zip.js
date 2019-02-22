// About zip/unzip:
//     https://www.cnblogs.com/IT-OnLine/p/6489245.html
//     https://github.com/archiverjs/node-archiver
//     https://github.com/cthackers/adm-zip
// About Stream/Buffer:
//     https://blog.csdn.net/vieri_32/article/details/48376547
//     https://www.cnblogs.com/xiaoniuzai/p/7223151.html
//     http://nodejs.cn/api/buffer.html
//     http://nodejs.cn/api/fs.html

const AdmZip = require('adm-zip')
const Duplex = require('stream').Duplex

module.exports = function (raw, fs) {
    const zip = new AdmZip(Buffer.from(raw, "binary"))
    const zipEntries = zip.getEntries()
    zipEntries.forEach(function (zipEntry) {
        const b = zipEntry.getData()
        const r = new Duplex()
        r.push(b)
        r.push(null)

        const w = fs.createWriteStream(zipEntry.entryName)
        r.pipe(w)
    })
}
