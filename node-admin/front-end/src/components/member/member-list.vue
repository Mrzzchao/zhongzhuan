<template>
    <div class="admin-list">


        <div style="margin-bottom:30px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>学生管理</el-breadcrumb-item>
                <el-breadcrumb-item>学生列表</el-breadcrumb-item>

            </el-breadcrumb>

        </div>


        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="searchObj.value" :placeholder="searchObj.tip"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>

            <!-- <router-link to="/admin/goodstype-form">
                <el-button type="success">新增类型</el-button>
            </router-link> -->


        </el-form>

        <el-form :inline="true" class="demo-form-inline">
            <el-select v-model="searchObj.value2" clearable placeholder="请选择">
              <el-option
                v-for="item, idx in schoolInfo.grades"
                :key="idx"
                :label="item"
                :value="item">
              </el-option>
            </el-select>

            <el-select v-model="searchObj.value3" clearable placeholder="请选择">
              <el-option
                v-for="item, idx in schoolInfo.className"
                :key="idx"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
        </el-form>

        <el-table
                :loading='load'
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                :data="tableData"
                border
                height="450"
                tooltip-effect="dark"
                style="width: 100%">
            <el-table-column
                    type="selection">
            </el-table-column>

            <el-table-column
                    v-for="name, type in columns"
                    :prop="type"
                    :label="name"
                    :key="name"

            >
            </el-table-column>


            <el-table-column
                label="操作"
                width="150"
                >
                <template scope="scope">

                    <el-button
                            size="small"
                            type="info"
                            @click="editGoods(scope.row)">修改
                    </el-button>

                    <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

        <div class="pagination">

            <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="countAll">
            </el-pagination>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'list',
        data() {
            return {
                columns: {
                    real_name: '姓名',
                    sexuality: '性别',
                    born_date: '出生日期',
                    highest_education: '毕业学校',
                    mobile: '手机号',
                    email: '邮箱',
                    grade: '年级',
                    major: '专业',
                    className: '班级',
                    company_name: '单位',
                    title: '职位',
                    service_time: '入职时间'
                },
                tableData: [],

                searchObj: {
                    value: '',
                    value2: '',
                    value3: '',
                    tip: '根据姓名查询',
                    key: 'real_name'
                },

                schoolInfo: this.schoolInfo,

                cur_page: 1,
                pageSize: 10,
                countAll: 50,

                multipleSelection: [],

                load: false, // loading
            }
        },

        methods: {
            fetchList() {
                this.load = true;
                const params = {
                    pageNo: this.cur_page,
                    pageSize: this.pageSize
                }
                this.ajax.post(this.api.studentListWithWork, params).then((data) => {
                    this.tableData = this.formatData(data.list)
                    this.countAll = data.countAll
                    this.load = false
                })


            },

            fetchItem() {
                if(this.searchObj.value || this.searchObj.value2 || this.searchObj.value3) {
                    this.load = true;
                    const searchObj = this.searchObj
                    const params = {}
                    params[searchObj.key] = searchObj.value

                    params.grade = searchObj.value2
                    params.className = searchObj.value3

                    params.pageNo = this.cur_page
                    params.pageSize = this.pageSize

                    this.ajax.post(this.api.studentByTypesWithWork, params).then((data) => {
                        this.tableData = this.formatData(data.list)
                        this.countAll = data.countAll
                        this.load = false
                    })
                } else {
                    this.fetchList()
                }


            },

            handleCurrentChange(pageNo) {
                const value = this.searchObj.value
                this.cur_page = pageNo;

                if (value) {
                    this.fetchItem()
                } else {
                    this.fetchList();
                }
            },

            // 搜索
            search() {
                this.fetchItem();
            },

            // 删除
            handleDelete(row) {
                const params = {
                    id: row.id
                }

                this.ajax.post(this.api.studentDelete, params).then((data) => {
                    console.log(data)
                    let index = this.tableData.indexOf(row);
                    this.tableData.splice(index, 1);
                    this.$message.success('删除成功');
                })
            },


            // 修改
            editGoods(row) {
                this.$router.push({path: '/admin/goodstype-form', query: {id: row.id}});
            },


            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            formatData(data) {
                return data
            }
        },


        created() {
            this.fetchList();
        }


    }
</script>
