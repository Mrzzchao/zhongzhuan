<template>
    <div class='admin'>
        <my-header></my-header>

        <div class='admin-main'>
            <div class='admin-main-right'>
                <el-menu theme="dark" class="top-menu el-menu--dark">

					  <el-submenu index="1">
                        <template slot="title">用户管理</template>
<el-menu-item index="1-1" @click="controlJump('/admin/user-list')">用户列表
</el-menu-item>

<el-menu-item index="1-2" @click="controlJump('/admin/user-form', true)">新增用户
</el-menu-item>
</el-submenu>



<el-submenu index="2">
	<template slot="title">学生信息管理</template>
	<router-link to="/admin/student-list">
		<el-menu-item index="2-1">学生列表</el-menu-item>
	</router-link>

	<!-- <router-link to="/admin/student-form">
		<el-menu-item index="2-2">新增学生</el-menu-item>
	</router-link> -->
</el-submenu>


<el-submenu index="3">
	<template slot="title">招募信息管理</template>
	<router-link to="/admin/job-list">
		<el-menu-item index="3-1">职位列表</el-menu-item>
	</router-link>

	<router-link to="/admin/job-form">
		<el-menu-item index="3-2">新增职位</el-menu-item>
	</router-link>
</el-submenu>




<el-submenu index="4">
	<template slot="title">在线课程管理</template>
	<router-link to="/admin/study-list">
		<el-menu-item index="4-1">课程列表</el-menu-item>
	</router-link>

	<router-link to="/admin/study-form">
		<el-menu-item index="4-2">新增课程</el-menu-item>
	</router-link>
</el-submenu>


</el-menu>
</div>

<div class='admin-main-left'>
	<router-view></router-view>
</div>

</div>
</div>
</template>

<script>
	import Header from './common/header.vue';

	export default {
		name: 'admin',

		components: {
			'my-header': Header,
		},

		computed: {
			user() {
				return this.$store.state.user;
			}
		},

		methods: {
			// 跳转控制
			controlJump(target, flag) {
                if(flag) {
                    if(this.user.role < 100) {
    					this.$message.warning('权限不够，加油打怪升级噢～');
                    } else {
                        this.$router.push(target);
                    }
                } else {
                    if (this.user.role <= 10) {
                        this.$message.warning('权限不够，加油打怪升级噢～');

                    } else {
                        this.$router.push(target);
                    }

                }

			}
		},

        mounted() {
            if(this.user.username) {

            } else {
                this.$router.push({path: '/'})
            }
        }

	}

</script>
