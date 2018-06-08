let express = require('express');

let user = require('../controls/user');
let job = require('../controls/job')
let download = require('../controls/download')
let education = require('../controls/education')
let privilege = require('../controls/privilege')
let skill = require('../controls/skill')
let student = require('../controls/student')
let study = require('../controls/study')
let work = require('../controls/work')
let upload = require(('../controls/upload'))
let wechat = require(('../controls/wechat'))

let api = require('../api');


let router = express.Router();

// user
router.post(api.userList, user.fetchAll);
router.get(api.userLogout, user.logout);
router.get(api.userAutoLogin, user.autoLogin); // 自动登录

router.post(api.userAdd, user.addOne);
router.post(api.userDelete, user.deleteOne);
router.post(api.userDeleteMulti, user.deleteMulti);
router.post(api.userLogin, user.login); // 登录
router.post(api.userChangeRole, user.controlVisit, user.changeRole); // 更改权限


// job
router.post(api.jobList, job.fetchAll);
router.post(api.jobDetail, job.fetchById);
router.post(api.jobAdd, job.addOne);
router.post(api.jobDelete, job.deleteOne);
router.post(api.jobDeleteMulti, job.deleteMulti);
router.post(api.jobUpdate, job.updateOne);


// education
router.post(api.educationList, education.fetchAll);
router.post(api.educationItem, education.fetchById);
router.post(api.educationAdd, education.addOne);
router.post(api.educationDelete, education.deleteOne);
router.post(api.educationDeleteMulti, education.deleteMulti);
router.post(api.educationUpdate, education.updateOne);


// work
router.post(api.workList, work.fetchAll);
router.post(api.workItem, work.fetchById);
router.post(api.workAdd, work.addOne);
router.post(api.workDelete, work.deleteOne);
router.post(api.workDeleteMulti, work.deleteMulti);
router.post(api.workUpdate, work.updateOne);


// skill
router.post(api.skillList, skill.fetchAll);
router.post(api.skillItem, skill.fetchById);
router.post(api.skillAdd,  skill.addOne);
router.post(api.skillDelete, skill.deleteOne);
router.post(api.skillDeleteMulti, skill.deleteMulti);
router.post(api.skillUpdate, skill.updateOne);


// student
router.post(api.studentList, student.fetchAll);
router.post(api.studentItem, student.fetchByWxId);
router.post(api.studentAdd, student.addOne);
router.post(api.studentDelete, student.deleteOne);
router.post(api.studentDeleteMulti, student.deleteMulti);
router.post(api.studentUpdate, student.updateOne);


// study
router.post(api.studyList, study.fetchAll);
router.post(api.studyAdd, study.addOne);
router.post(api.studyDelete, study.deleteOne);
router.post(api.studyDeleteMulti, study.deleteMulti);
router.post(api.studyUpdate, study.updateOne);


// privilege
router.post(api.privilegeList, privilege.fetchAll);
router.post(api.privilegeAdd, privilege.addOne);
router.post(api.privilegeDelete, privilege.deleteOne);
router.post(api.privilegeDeleteMulti, privilege.deleteMulti);
router.post(api.privilegeUpdate, privilege.updateOne);


// download
router.post(api.downloadList, download.fetchAll);
router.post(api.downloadAdd, download.addOne);
router.post(api.downloadDelete, download.deleteOne);
router.post(api.downloadDeleteMulti, download.deleteMulti);
router.post(api.downloadUpdate, download.updateOne);


// upload
router.post(api.uploadImg, upload.uploadImgOne, upload.handleRes);
router.post(api.uploadExcel, upload.uploadExcelOne, upload.handleRes);


// wechat
router.post(api.wxSession, wechat.requestSessionKey);


module.exports = router;
