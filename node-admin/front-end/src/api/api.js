let path = 'https://www.lgzzcjb.com/api';
// let path = 'http://localhost:9999/api';

module.exports = {


    // user
    userList: path + '/user/list',
    userDetail: path + '/user/detail',
    userByName: path + '/user/oneByName',
    userAdd: path + '/user/add',
    userDelete: path + '/user/delete',
    userDeleteMulti: path + '/user/delete-multi',
    userUpdate: path + '/user/update',
    userLogin: path + '/user/login',
    userLogout: path + '/user/logout',
    userAutoLogin: path + '/user/auto-login',
    userChangeRole: path + '/user/change-role',


    // job
    jobList: path + '/job/list',
    jobDetail: path + '/job/detail',
    jobByName: path + '/job/oneByName',
    jobAdd: path + '/job/add',
    jobDelete: path + '/job/delete',
    jobDeleteMulti: path + '/job/delete-multi',
    jobUpdate: path + '/job/update',

    // education
    educationList: path + '/education/list',
    educationItem: path + '/education/one',
    educationOfStu: path + '/education/student',
    educationAdd: path + '/education/add',
    educationDelete: path + '/education/delete',
    educationDeleteMulti: path + '/education/delete-multi',
    educationUpdate: path + '/education/update',

    // skill
    skillList: path + '/skill/list',
    skillItem: path + '/skill/one',
    skillOfStu: path + '/skill/student',
    skillAdd: path + '/skill/add',
    skillDelete: path + '/skill/delete',
    skillDeleteMulti: path + '/skill/delete-multi',
    skillUpdate: path + '/skill/update',

    // work
    workList: path + '/work/list',
    workItem: path + '/work/one',
    workOfStu: path + '/work/student',
    workAdd: path + '/work/add',
    workDelete: path + '/work/delete',
    workDeleteMulti: path + '/work/delete-multi',
    workUpdate: path + '/work/update',

    // student
    studentList: path + '/student/list',
    studentListWithWork: path + '/student/listWithWork',
    studentItem: path + '/student/one',
    studentDetail: path + '/student/detail',
    studentByName: path + '/student/oneByName',
    studentByTypes: path + '/student/multiByTyps',
    studentByTypesWithWork: path + '/student/multiByTypsWithWork',
    studentAdd: path + '/student/add',
    studentDelete: path + '/student/delete',
    studentDeleteMulti: path + '/student/delete-multi',
    studentUpdate: path + '/student/update',

    // study
    studyList: path + '/study/list',
    studyAdd: path + '/study/add',
    studyDelete: path + '/study/delete',
    studyDeleteMulti: path + '/study/delete-multi',
    studyUpdate: path + '/study/update',

    // privilege
    privilegeList: path + '/privilege/list',
    privilegeAdd: path + '/privilege/add',
    privilegeDelete: path + '/privilege/delete',
    privilegeDeleteMulti: path + '/privilege/delete-multi',
    privilegeUpdate: path + '/privilege/update',

    // download
    downloadList: path + '/download/list',
    downloadDetail: path + '/download/detail',
    downloadByName: path + '/download/oneByName',
    downloadAdd: path + '/download/add',
    downloadDelete: path + '/download/delete',
    downloadDeleteMulti: path + '/download/delete-multi',
    downloadUpdate: path + '/download/update',

    // upload
    uploadImg: path + '/upload/img',
    uploadExcel: path + '/upload/excel',
    uploadStudy: path + '/upload/study',

    //wechat
    wxSession: path + '/wechat/session'

};
