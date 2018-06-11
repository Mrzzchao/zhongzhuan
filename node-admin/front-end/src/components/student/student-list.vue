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
                <el-input v-model="searchObj.value" :placeholder="searchObj.tip" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
            <el-form-item>
                <download-excel
                    class   = "btn btn-default"
                    :data   = "json_data"
                    :fields = "json_fields"
                    :meta   = "json_meta"
                    name    = "student.xls">


                    <el-button type="success" >导出表格</el-button>
                </download-excel>
            </el-form-item>
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
                style="width: 100%"
                id="stuTable"
                >
            <el-table-column
                    type="selection">
            </el-table-column>

            <el-table-column
                    v-for="name, type in columns"
                    :prop="type"
                    :label="name"
                    :key="name"
                    :width="columnConfig[type].width"

            >
            </el-table-column>


            <el-table-column
                label="操作"
                width="150"
                fixed="right"
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
    import downloadExcel from '../common/JsonExcel.vue';

    export default {
        name: 'list',
        components: {
            downloadExcel
        },
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
                    service_time: '在职时间'
                },

                columnConfig: {
                    real_name: {
                        width: '100'
                    },
                    sexuality: {
                        width: '100'
                    },
                    born_date: {
                        width: '150'
                    },
                    highest_education: {
                        width: '100'
                    },
                    mobile: {
                        width: '150'
                    },
                    email: {
                        width: '180'
                    },
                    grade: {
                        width: '100'
                    },
                    major: {
                        width: '100'
                    },
                    className: {
                        width: '100'
                    },
                    company_name: {
                        width: '100'
                    },
                    title: {
                        width: '100'
                    },
                    service_time: {
                        width: '160'
                    }
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

                // 导出表格配置
                json_fields : {
                    real_name: 'String',
                    sexuality: 'String',
                    born_date: 'String',
                    highest_education: 'String',
                    mobile: 'String',
                    email: 'String',
                    grade: 'String',
                    major: 'String',
                    className: 'String',
                    company_name: 'String',
                    title: 'String',
                    service_time: 'String'
                },

                // json_data: [],

                json_meta: [
                    [{
                        "key": "charset",
                        "value": "utf-8"
                    }]
                ]
            }
        },

        computed: {
            json_data() {
                const json_fields = this.json_fields
                let arr = []
                this.tableData.map((item) => {
                    let obj = {}
                    Object.keys(json_fields).forEach((key) => {
                        obj[key] = item[key]
                    })
                    arr.push(obj)
                })
                arr.unshift(this.columns)
                return arr
            },

            searchVal() {
                return this.searchObj.value || this.searchObj.value2 || this.searchObj.value3
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
                    console.log(data);
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
        },

        watch: {
            searchVal(newVal) {
                if(!newVal) {
                    this.fetchList()
                }
            }
        }


    }
</script>
