<template>
    <el-form ref="form" :model="form" label-width="80px" class="form-contain">
        <el-form-item :label="name" v-for="name, type in formMap" :key="type">
            <el-input :model="form[type]"></el-input>
        </el-form-item>


        <el-form-item>
            <el-button type="primary" @click="onSubmit">{{isNew ? '添加' : '修改'}}</el-button>
            <el-button @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
	export default {
		name: 'form',
		data() {
			return {
				form: {
					real_name: '',
					sexuality: '',
					born_date: '',
					highest_education: '',
					mobile: '',
					email:'',
                    grade: '',
					major:'',
					className:'',
				},

                formMap: {
                    real_name: '姓名',
                    sexuality: '性别',
                    born_date: '出生日期',
                    highest_education: '毕业学校',
                    mobile: '手机号',
                    email:'邮箱',
                    grade: '年级',
                    major:'专业',
                    className:'班级',
                },

                isNew: 1
			}
		},
		methods: {
			onSubmit() {
				if (!this.form.student_name) {
					this.$message.warning('请填写完整信息');
					return;
				}

				console.log(this.form);

				this.func.ajaxPost(this.api.studentAdd, this.form, res => {

					if (res.data.code === 200) {
						this.$message.success('操作成功');
						this.$router.push('/admin/student-list');
					}
				});
			},

			onCancel() {
				this.$router.push('/admin/student-list');
			},

		},


		created() {
			if (student_id) {
				this.isNew = 0;

                this.ajax.post(this.api.studentList).then((data) => {
                    console.log(data)
                })
			}
		}


	}

</script>
