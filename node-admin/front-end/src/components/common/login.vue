<template>
    <div class="login">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="login-form">
            <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: 'login',

        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                }
            };
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.ajax.post(this.api.userLogin, this.loginForm, {withCredentials: true}).then((res) => {
                            console.log(res.data);
                            this.$store.commit('user', res.list);
                            this.$message.success('登陆成功');
                            this.$router.push('/admin');
                        })
                    }
                });
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },

        created () {
            if (this.$store.state.user.username) {
                this.$router.push('/admin');
            }
        }

    }
</script>
