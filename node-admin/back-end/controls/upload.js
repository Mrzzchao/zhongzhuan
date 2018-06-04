/**
 * Created by zhangzc on 2018/6/4
 **/

const fs = require('fs')
const express = require('express')
const multer  = require('multer')

const app = express()

// 创建目录
const createFolder = function (folder) {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
    return folder
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
    const uploadFolder = createFolder(`${type}/`)
    const storage = createStorage(uploadFolder)
    const upload = multer({ storage })
    return upload
}

const imgUpload = uploadFactory('img')
const excelUpload = uploadFactory('excel')

module.exports = {
    imgUpload,
    excelUpload
}

