<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="form-contain" >
        <!-- <el-form-item :label="name" :prop="type" v-for="name, type in formMap" :key="type">
            <el-input v-model="form[type]"></el-input>
        </el-form-item> -->

        <el-form-item :label="formMap.title" prop="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>


        <el-upload
            class="upload-demo"
            name="file"
            :action="uploadUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            >
            <el-button size="small" type="primary">上传课件</el-button>
            <div slot="tip" class="el-upload__tip">请上传ppt,word文档</div>
        </el-upload>

        <el-form-item prop="download_url" >
            <el-input v-model="form.download_url" style="display:hidden" v-show="false"></el-input>
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
          <el-button size="small" type="primary">上传课件显示图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <el-form-item prop="img_url" >
            <el-input v-model="form.img_url" style="display:hidden" v-show="false"></el-input>
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
                    title: '',
                    download_url: '',
                    img_url: '',
                    remark: '',
                    operator: this.$store.state.user,
                    status: 0
				},

                formMap: {
                    title: '课件名称',
                    download_url: '上传课件',
                    img_url: '上传课件显示图片'
                },

                rules: {
                    title: [{required: true, message: '请输入课件名称', trigger: 'blur'}],
                    download_url: [{required: true, message: '请上传课件', trigger: 'blur'}],
                    // img_url: [{required: true, message: '请上传课件显示图片', trigger: 'blur'}]
                },

                fileList: [],
                uploadUrl: this.api.uploadStudy,
                imageAccept: "image/*",

                isNew: 1
			}
		},
        computed: {
            user() {
                return this.$store.state.user
            }
        },
		methods: {
			onSubmit() {
                this.validate()
			},

			onCancel() {
				this.$router.push('/admin/study-list');
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
                this.ajax.post(this.api.downloadDetail, params).then((data) => {
                    console.log(data);
                    this.form = data.list
                    this.load = false
                })
            },

            submitItem() {
                const api = this.isNew ? this.api.downloadAdd : this.api.downloadUpdate
                this.form.operator = this.user.username || ''

                this.ajax.post(api, this.form).then((data) => {
                    this.$message.success('操作成功');
                    this.$router.push('/admin/study-list');
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
                this.$set(this.form, 'img_url', files.url)
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
