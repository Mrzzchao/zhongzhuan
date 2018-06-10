<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="form-contain">
        <el-form-item :label="name" :prop="type" v-for="name, type in formMap" :key="type">
            <el-input v-model="form[type]"></el-input>
        </el-form-item>


        <el-form-item>
            <el-button type="primary" @click="onSubmit">添加</el-button>
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
                    job_name: '',
                    salary: '',
                    company: '',
                    job_detail: '',
                    tags: '',
				},

                formMap: {
                    company: '公司',
                    job_name: '职位',
                    salary: '薪资',
                    job_detail: '职位描述',
                    tags: '公司标签',
                },

                rules: {
                    company: [{required: true, message: '请输入公司名称', trigger: 'blur'}],
                    job_name: [{required: true, message: '请输入职位名称', trigger: 'blur'}],
                    salary: [{required: true, message: '请输入薪水', trigger: 'blur'}],
                    job_detail: [{required: true, message: '请输入职位描述', trigger: 'blur'}],
                    tags: [{required: true, message: '请输入公司标签', trigger: 'blur'}]
                }
			}
		},
		methods: {
			onSubmit() {
                this.validate()
			},

			onCancel() {
				this.$router.push('/admin/goodstype-list');
			},

            validate() {
                console.log(this.$refs.form)
                this.$refs.form.validate((valid) => {
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
                this.ajax.post(this.api.jobDetail, params).then((data) => {
                    console.log(data);
                    this.form = data.list
                    this.load = false
                })
            },

            submitItem() {
                const api = this.isNew ? this.api.jobAdd : this.api.jobUpdate
                this.ajax.post(api, this.form).then((data) => {
                    this.$message.success('操作成功');
                    this.$router.push('/admin/goodstype-list');
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
