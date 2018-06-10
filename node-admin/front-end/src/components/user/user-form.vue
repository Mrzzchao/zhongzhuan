<template>
 <div class="admin-list">
	 <div style="margin-top:30px">
	</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="form-contain">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="用户权限" prop="role">
            <el-radio-group v-model="form.role">
                <el-radio :label="1">普通用户</el-radio>
                <el-radio :label="10">管理员</el-radio>
                <el-radio :label="100">超级管理员</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">添加用户</el-button>
            <el-button @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
	</div>
</template>

<script>
export default {
    name: 'form',
    data() {
        return {
            form: {
                username: '',
                password: '',
                role: '',
                remark: '',
                create_time: '',
                login_time: '',
            },

            formMap: {
                username: '用户名',
                password: '密码'
            },

            roles: [{
                    val: '1',
                    txt: '普通用户'
                },
                {
                    val: '10',
                    txt: '管理员'
                },
                {
                    val: '100',
                    txt: '超级管理员'
                },
            ],

            rules: {
                username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                role: [{required: true, message: '请选择角色', trigger: 'blur'}],
            },

            isNew: 1
        }
    },
    methods: {
        onSubmit() {
            this.validate()
        },

        onCancel() {
            this.$router.push('/admin/user-list');
        },

        validate() {
            console.log(this.$refs.form)
            this.$refs.form.validate((valid) => {
                console.log(valid);
                if (valid) {
                    this.submitItem()
                }
            });
        },

        fetchItem() {
            this.load = true;
            let params = {
                id: this.$route.query.id
            }
            this.ajax.post(this.api.userDetail, params).then((data) => {
                console.log(data);
                data = this.formatData(data.list)
                this.form = data
                this.load = false
            })
        },

        formatData(data) {
            return data
        },

        submitItem() {
            const api = this.isNew ? this.api.userAdd : this.api.userUpdate
            this.ajax.post(api, this.form).then((data) => {
                this.$message.success('操作成功');
                this.$router.push('/admin/user-list');
            })
        }

    },


    created() {
        const id = this.$route.query.id
        if (id) {
            this.isNew = 0;
            this.fetchItem()
        }
    }


}
</script>
