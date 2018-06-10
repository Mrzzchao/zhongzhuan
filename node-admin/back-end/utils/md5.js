let crypto = require('crypto');

module.exports  = {
    md5Encrypt (encryptString) {
        const hasher = crypto.createHash("md5");
        hasher.update(encryptString);
        encryptString = hasher.digest('hex');
        return encryptString;
    },
    createMd5Hash(name) {
        const hash = crypto.createHash('md5').update(name).digest('hex')
        return hash
    }
}
