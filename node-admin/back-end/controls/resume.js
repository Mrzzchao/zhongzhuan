const createPdf  = require('../utils/createPdf')
const sendEmail  = require('../utils/sendEmail')

function formatData(rows) {
    return rows.map(row => {
        let dateC = moment(row.create_time || Date.now()).format('YYYY-MM-DD');
        let dateU = moment(row.update_time || Date.now()).format('YYYY-MM-DD');
        let obj = {};

        return Object.assign({}, row, {
            create_time: dateC,
            update_time: dateU
        }, obj);
    });
}


module.exports = {
    sendResume(req, res) {
        const student_id = req.body.student_id
        const job_id = req.body.job_id
        createPdf.fetchBaseData(student_id).then((stuData) => {
            createPdf.createPDFProtocolFile(student_id).then((data) => {
                createPdf.fetchJobDataById(job_id).then((jobData) => {
                    const hr_email = jobData.hr_email
                    const job_name = jobData.job_name
                    const student_name = stuData.real_name
                    sendEmail.sendEmail(hr_email, job_name, student_name, student_id).then((msg) => {
                        res.json({
                            code: 100,
                            msg: 'success',
                            data: msg
                        })
                    })
                })
            })
        })
    }

};
