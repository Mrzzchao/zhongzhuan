let pdf = require('html-pdf'); // html-pdf
let fs = require('fs');
let moment = require('moment');     // 数据处理
let htmlHandler = require('../utils/htmlHandler')
let resumeTpl = fs.readFileSync('./template/resume.html', 'utf8'); // 引入html模板
let template = fs.readFileSync('./template/index.html', 'utf8'); // 引入html模板

var swig  = require('swig');
const table = require('../configs/table');
let {SQL} = require('../sql/sql')
let SQLHandlerStudent = new SQL(table.STUDENT);
let SQLHandlerEducation = new SQL(table.EDUCATION_EXPERIENCE);
let SQLHandlerWork = new SQL(table.WORK_EXPERIENCE);
let SQLHandlerSkill = new SQL(table.SKILL_CERTIFICATION);
let SQLHandlerJob = new SQL(table.JOB_OFFERS);


function formatData(rows) {
    return rows.map(row => {
        let date = moment(row.create_time || '2018-06-09 17:49:09.305503').format('YYYY-MM-DD');
        let obj = {};

        return Object.assign({}, row, {
            create_time: date
        }, obj);
    });
}


let createPdf = {



//这里去数据库捞数据
    fetchBaseData(student_id) {
        return SQLHandlerStudent.queryByStudentId(student_id).then((rows) => {
            rows = formatData(rows)
            return rows[0];
        })
    },

    fetchEducationData(student_id) {
        return SQLHandlerEducation.queryByStudentId(student_id).then((rows) => {
            rows = formatData(rows)
            return rows;
        })
    },

    fetchJobDataById(id) {
        return SQLHandlerJob.queryById(id).then((rows) => {
            rows = formatData(rows)
            return rows[0];
        })
    },

    fetchWorkData(student_id) {
        return SQLHandlerWork.queryByStudentId(student_id).then((rows) => {
            rows = formatData(rows)
            return rows;
        })
    },

    fetchSkillData(student_id) {
        return SQLHandlerSkill.querySkillByStudentIdGroupBySkillid(student_id).then((rows) => {
            rows = formatData(rows)
            return rows;
        })
    },


    createResumeData(student_id) {
        const promiseArr = [createPdf.fetchBaseData(student_id), createPdf.fetchEducationData(student_id), createPdf.fetchWorkData(student_id)]
        return Promise.all(promiseArr).then((result) => {
            let [baseInfo, educationInfo, workInfo] = result

            workInfo.forEach((work) =>{
                var work_intro = decodeURIComponent(work.work_intro)
                var temp = work_intro.split('\n');
                /* temp.forEach((item) => {
                     item = "<p class='oid-detail'>" + decodeURIComponent(item) + "</p>";
                 });*/
                work.work_intro = temp;
            })
            return createPdf.fetchSkillData(student_id).then((skillInfo) => {
                skillInfo.forEach((skill) => {
                    var temp = skill.img_urls.split(';');
                    skill.img_urls = temp;
                })

                let resume = {
                    baseInfo: {
                        name: baseInfo.real_name,
                        sex: baseInfo.sexuality,
                        borndate: baseInfo.born_date,
                        highesteducation: baseInfo.highest_education,
                        mobile: baseInfo.mobile,
                        email: baseInfo.email
                    },
                    educationInfo: educationInfo,
                    workInfo: workInfo,
                    skillInfo: skillInfo
                }
                return resume;
            });
        })
    },

    createPDFProtocolFile(student_id) {
        let options  =  {
            "format": 'A4',
            "paginationOffset": 2,
            "header": {
                "height": "10mm",
                "contents": ''
            }
        };// 一些配置
        let filename = './resume/'+ student_id + '.pdf';
        let tplPath = './template/index.html'
        return createPdf.createResumeData(student_id).then((resumeData) => {
            let html = swig.renderFile(tplPath, resumeData);
            // html = htmlHandler.insertStr(template, '<!-- insert-resume -->', html)
            return new Promise((resolve, reject) => {
                pdf.create(html, options).toFile(filename, function (err, res) {
                    if (err) {
                        reject(err)
                        return console.log(err);
                    }
                    resolve(res)
                });
            }).catch((err) => {
                console.error(error);
            })
        })
    }
}

module.exports = createPdf;
