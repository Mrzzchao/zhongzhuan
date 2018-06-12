<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="form-contain">
        <el-form-item :label="name" :prop="type"  v-for="name, type in formMap" :key="type">
            <el-input v-model="form[type]" :placeholder="tips[type]"></el-input>
        </el-form-item>
        <el-form-item label="职位简介" prop="job_intros">
            <el-input v-model="form.job_intros" type="textarea" placeholder="换行系统自动生成序号"></el-input>
        </el-form-item>
        <el-form-item label="任职要求">
            <el-input v-model="form.job_require" type="textarea" placeholder="换行系统自动生成序号"></el-input>
        </el-form-item>

        <el-upload
                class="upload-demo"
                name="file"
                :action="uploadUrl"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :on-success="handleImgSuccess"
                :limit="1"
                :on-exceed="handleExceed"
                :accept="imageAccept"
                list-type="picture">
            <el-button size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">可选择上传公司logo</div>
        </el-upload>

        <el-form-item prop="img_url" >
            <el-input v-model="form.company_logo" style="display:hidden" v-show="false"></el-input>
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
                    job_name: '',
                    salary: '',
                    company: '',
                    job_detail: '',
                    job_require: '',
                    job_intros: '',
                    company_logo: '',
                    hr_email: '',
                    tags: '',
				},

                formMap: {
                    company: '公司',
                    job_name: '职位',
                    salary: '薪资',
                    tags: '公司标签',
                    hr_email: 'HR邮箱'
                },

                tips: {
                    job_name: '请输入岗位名称',
                    salary: '格式为 XX K - XX K',
                    company: '请输入公司名称',
                    job_detail: '',
                    job_require: '请输入任职要求',
                    job_intros: '请输入工作简介',
                    tags: '格式为 五险一金,公租房',
                    hr_email: '请输入HR邮箱'
                },

                imageAccept: "image/*",
                fileList: [],
                uploadUrl: this.api.uploadImg,

                job_detail: '职位描述',

                rules: {
                    company: [{required: true, message: '请输入公司名称', trigger: 'blur'}],
                    job_name: [{required: true, message: '请输入职位名称', trigger: 'blur'}],
                    salary: [{required: true, message: '请输入薪水', trigger: 'blur'}],
                    // job_detail: [{required: true, message: '请输入职位描述', trigger: 'blur'}],
                    job_intros: [{required: true, message: '请输入职位描述', trigger: 'blur'}],
                    job_require: [{required: true, message: '请输入职位描述', trigger: 'blur'}],
                    tags: [{required: true, message: '请输入公司标签', trigger: 'blur'}],
                    hr_email:[{type: 'email', required: true, message: '请输入正确的邮箱', trigger: 'blur'}],
                },

                isNew: 1
			}
		},
		methods: {
			onSubmit() {
                this.validate()
			},

			onCancel() {
				this.$router.push('/admin/job-list');
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
                    data = this.formatData(data.list)
                    this.form = data
                    this.load = false
                })
            },

            formatData(data) {
                let job_detail = decodeURIComponent(data.job_detail)
                let detailArr = job_detail.split('&&&&')
                let intros = detailArr[0]
                let requirements = detailArr[1]

                data.job_intros = intros
                data.job_require = requirements
                console.log(data)
                return data
            },

            formatSubmit() {
                let required = this.form.job_require
                let intros = this.form.job_intros

                this.form.job_detail = encodeURIComponent(intros + '&&&&' + required)
            },

            submitItem() {
                this.formatSubmit()
                const api = this.isNew ? this.api.jobAdd : this.api.jobUpdate
                this.ajax.post(api, this.form).then((data) => {
                    this.$message.success('操作成功');
                    this.$router.push('/admin/job-list');
                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                console.log(fileList)
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleSuccess(files, fileList) {
                console.log(files);
                this.$set(this.form, 'download_url', files.url)
            },
            handleImgSuccess(files, fileList) {
                console.log(files);
                this.$set(this.form, 'company_logo', files.url)
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
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
