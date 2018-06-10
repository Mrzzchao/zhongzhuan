let nodemailer = require('nodemailer');
let mailTransport = nodemailer.createTransport({
    host : 'smtp.qq.com',
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth : {
        user : '84930537@qq.com',
        pass : 'rjbyqgzjiblhcbcc'
    },
});

let sendEmail = {
    sendEmail(hr_email, job_name,student_name, student_id){
        var options = {
            from        : '"龙岗中专" <84930537@qq.com>',
            to          : '"周立钊" <43¬7153171@qq.com>',
            // cc         : ''  //抄送
            // bcc      : ''    //密送
            subject        : '一封来自龙岗中专的求职邮件',
            text          : '一封来自龙岗中专的求职邮件',
            html           : '<h1>你好，这是一封来自龙岗中专的邮件！</h1><p>'+student_name+'申请贵公司的'+ job_name+'职位。简历请参阅附件，谢谢！ </p>',
            attachments :
                [
                    {
                        filename: 'student_id.pdf',            // 改成你的附件名
                        path: '../resume/'+ student_id + '.pdf',  // 改成你的附件路径
                        cid : '00000001'                 // cid可被邮件使用
                    },
                    /*{
                        filename: 'img2.png',            // 改成你的附件名
                        path: 'public/images/img2.png',  // 改成你的附件路径
                        cid : '00000002'                 // cid可被邮件使用
                    },*/
                ]
        };

        mailTransport.sendMail(options, function(err, msg){
            if(err){
                console.log(err);
                // res.render('index', { title: err });
            }
            else {
                console.log(msg);
                // res.render('index', { title: "已接收："+msg.accepted});
            }
        });
    }
}


exports.sendEmail =  function () {
    var options = {
        from        : '"龙岗中专" <84930537@qq.com>',
        to          : '"周立钊" <437153171@qq.com>',
        // cc         : ''  //抄送
        // bcc      : ''    //密送
        subject        : '一封来自测试的邮件',
        text          : '一封来自测试的邮件',
        html           : '<h1>你好，这是一封来自测试的邮件！</h1><p>图片你大爷，刚才填错了</p>',
        attachments :
            [
                {
                    filename: 'test.pdf',            // 改成你的附件名
                    path: 'C:\\\\Users\\\\monitor\\\\WebstormProjects\\\\untitled3\\\\test.pdf',  // 改成你的附件路径
                    cid : '00000001'                 // cid可被邮件使用
                },
                /*{
                    filename: 'img2.png',            // 改成你的附件名
                    path: 'public/images/img2.png',  // 改成你的附件路径
                    cid : '00000002'                 // cid可被邮件使用
                },*/
            ]
    };

    mailTransport.sendMail(options, function(err, msg){
        if(err){
            console.log(err);
            // res.render('index', { title: err });
        }
        else {
            console.log(msg);
            // res.render('index', { title: "已接收："+msg.accepted});
        }
    });

}

