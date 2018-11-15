let nodemailer = require('nodemailer');
let mailTransport = nodemailer.createTransport({
    service: 'smtp.163.com',
    host: "smtp.163.com",
    port:465,
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth : {
        user : 'lgzzcjb@163.com',
        pass : 'Lgzhongzhuan1994'
    },
});

let sendEmail = {
    sendEmail(hr_email, job_name,student_name, student_id){
        var options = {
            from        : '"龙岗中专" <lgzzcjb@163.com>',
            to          : `"周立钊" <${hr_email}>`,
            // cc         : ''  //抄送
            // bcc      : ''    //密送
            subject        : '一封来自龙岗中专的求职邮件',
            text          : '一封来自龙岗中专的求职邮件',
            html           : '<h1>你好，这是一封来自龙岗中专的邮件！</h1><p>'+student_name+'申请贵公司的'+ job_name+'职位。简历请参阅附件，谢谢！ </p>',
            attachments :
                [
                    {
                        filename: `龙岗中专学生${student_name}的简历.pdf`,            // 改成你的附件名
                        path: 'https://www.xxx.xxx.com/resume/'+ student_id + '.pdf',  // 改成你的附件路径
                        cid : '00000001'                 // cid可被邮件使用
                    },
                    /*{
                        filename: 'img2.png',            // 改成你的附件名
                        path: 'public/images/img2.png',  // 改成你的附件路径
                        cid : '00000002'                 // cid可被邮件使用
                    },*/
                ]
        };
        return new Promise((resolve, reject) => {
            mailTransport.sendMail(options, function(err, msg){
                if (err) {
                    throw new Error(err)
                    return console.log(err);
                }
                resolve(msg)
            });
        }).catch((err) => {
            console.error(err);
        })
    }
}

module.exports = sendEmail;
