let crypto = require('crypto');

module.exports  = {
    md5Encrypt (encryptString) {
        var hasher = crypto.createHash("md5");
        hasher.update();
        encryptString = hasher.digest('hex');
        return encryptString;
    }
}
