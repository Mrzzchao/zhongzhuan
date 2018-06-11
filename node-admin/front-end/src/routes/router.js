import Vue from "vue";
import Router from "vue-router";
import Admin from "../components/admin.vue";
import Login from "../components/common/login.vue";

import UserForm from "../components/user/user-form.vue";
import UserList from "../components/user/user-list.vue";

import StudentForm from "../components/student/student-form.vue";
import StudentList from "../components/student/student-list.vue";

import JobForm from "../components/job/job-form.vue";
import JobList from "../components/job/job-list.vue";


import StudyForm from "../components/study/study-form.vue";
import StudyList from "../components/study/study-list.vue";





Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/admin',
            redirect: '/admin/job-list',
            component: Admin,
            children: [

				  {
                    path: '/admin/user-list',
                    component: UserList,
                },
                {
                    path: '/admin/user-form',
                    component: UserForm,
                },

				  {
                    path: '/admin/student-list',
                    component: StudentList,
                },
                {
                    path: '/admin/student-form',
                    component: StudentForm,
                },

				  {
                    path: '/admin/job-list',
                    component: JobList,
                },

                {
                    path: '/admin/job-form',
                    component: JobForm,
                },
                {
                    path: '/admin/study-list',
                    component: StudyList,
                },
                {
                    path: '/admin/study-form',
                    component: StudyForm,
                }

            ]
        },
        {
            path: '/',
            component: Login,
        },
    ]
});
