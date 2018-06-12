const upload = require('../utils/upload')
const domain = 'https://www.yukisa.com'

module.exports = {
    uploadImgOne(req, res, next) {
        let uploadObj = upload.imgUpload.single('file')
        return uploadObj(req, res, function (err) {
            if(err) {
                console.error('上传错误', err)
            }
            next()
        })
    },
    uploadImgMulti(req, res) {
        const upload = upload.imgUpload.array('file', 10)
        return upload(req, res, function (err) {
            if(err) {
                console.error('上传错误', err)
            }
            return
        })
    },
    uploadExcelOne(req, res) {
        const upload = upload.excelUpload.single('file')
        return upload(req, res, function (err) {
            if(err) {
                console.error('上传错误', err)
            }
            return
        })
    },
    uploadExcelMulti(req, res) {
        const upload = upload.excelUpload.array('file', 10)
        return upload(req, res, function (err) {
            if(err) {
                console.error('上传错误', err)
            }
            return
        })
    },

    uploadStudyOne(req, res, next) {
        let uploadObj = upload.studyUpload.single('file')
        return uploadObj(req, res, function (err) {
            if(err) {
                console.error('上传错误', err)
            }
            next()
        })
    },

    handleRes(req, res) {
        const url = `${domain}/${req.file.destination}/${req.file.filename}`
        if(url) {
            res.json({
                code: 100,
                msg: 'success',
                url
            })
        }
    }
}
