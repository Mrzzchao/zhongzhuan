/**
 * Created by zhangzc on 2018/6/4
 **/

const fs = require('fs')
const multer  = require('multer')
const moment = require('moment')
const path = require('path')

// 创建目录
const createFolder = function (folder) {
    let t = moment().format('YYYY-M-D');
    let distPath = `uploads`;
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath);
    }
    distPath = distPath + `/${folder}`
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath);
    }
    distPath = distPath + `/${t}`
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath);
    }
    return distPath
}

// 创建存储模式
const createStorage = function (uploadFolder) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadFolder)
        },
        filename: (req, file, cb) => {
            let ext = path.extname(file.originalname);
            cb(null, file.fieldname + '-' + Date.now() + ext)
        }
    })

    return storage
}

// 上传对象工厂
const uploadFactory = function (type) {
    const uploadFolder = createFolder(`${type}`)
    const storage = createStorage(uploadFolder)
    const upload = multer({ storage })
    return upload
}

const imgUpload = uploadFactory('images')
const excelUpload = uploadFactory('excels')
const studyUpload = uploadFactory('study')

module.exports = {
    imgUpload,
    excelUpload,
    studyUpload
}
