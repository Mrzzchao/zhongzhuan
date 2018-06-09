let pdf = require('html-pdf'); // html-pdf
let fs = require('fs');
let html = fs.readFileSync('./tempplate/resume.html', 'utf8'); // 引入html模板
var swig  = require('swig');
const table = require('../configs/table');
let {SQL} = require('../sql/sql')
let SQLHandlerStudent = new SQL(table.STUDENT);
let SQLHandlerEducation = new SQL(table.EDUCATION_EXPERIENCE);
let SQLHandlerWork = new SQL(table.WORK_EXPERIENCE);
let SQLHandlerSkill = new SQL(table.SKILL_CERTIFICATION);





let createPdf = {



//这里去数据库捞数据
    fetchBaseData(student_id) {
        SQLHandlerStudent.queryByStudentId(student_id).then((rows) => {
            rows = formatData(rows)
            return rows[0];
        })
    },

    fetchEducationData(student_id) {
        SQLHandlerEducation.queryByStudentId(student_id).then((rows) => {
            rows = formatData(rows)
            return rows;
        })
    },

    fetchWorkData(student_id) {
        SQLHandlerWork.queryByStudentId(student_id).then((rows) => {
            rows = formatData(rows)
            return rows;
        })
    },

    fetchSkillData(student_id) {
        SQLHandlerSkill.querySkillByStudentIdGroupBySkillid(student_id).then((rows) => {
            rows = formatData(rows)
            return rows;
        })
    },


    createResumeData(student_id) {
        let baseInfo = fetchBaseData(student_id);
        let educationInfo = fetchEducationData(student_id);
        let workInfo = fetchWorkData(student_id);
        workInfo.forEach((work) =>{
            var temp = work.work_intro.split('%0A');
           /* temp.forEach((item) => {
                item = "<p class='oid-detail'>" + decodeURIComponent(item) + "</p>";
            });*/
            work.work_intro = temp;
        })
        let skillInfo = fetchSkillData(student_id);
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
    },

    createPDFProtocolFile(student_id) {
        let options  =  {
            "format": 'A4',
            "header": {
                "height": "10mm",
                "contents": ''
            }
        };// 一些配置
        let filename = '../resume/'+ student_id + '.pdf';
        let resumeData = createResumeData(student_id)
        html = swig.renderFile(html, resumeData);

        pdf.create(html, options).toFile(filename, function (err, res) {
            if (err) {
                return console.log(err);
            }
            console.log(res);
        });
    }
}

module.exports = createPdf;


