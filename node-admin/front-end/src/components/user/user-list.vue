<template>
    <div class="admin-list">


        <div style="margin-bottom:30px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>课程管理</el-breadcrumb-item>
                <el-breadcrumb-item>课程列表</el-breadcrumb-item>

            </el-breadcrumb>

        </div>


        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="searchObj.value" :placeholder="searchObj.tip"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>

            <el-form-item >
                <el-button type="success" @click="controlJump('/admin/user-form', true)">新增</el-button>
            </el-form-item>

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
                width="200"
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
                    username: '用户名',
                    role: '权限',
                    remark: '备注',
                    create_time: '创建时间',
                    login_time: '登陆时间',
                },
                tableData: [],

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

                searchObj: {
                    value: '',
                    tip: '根据用户名查询',
                    key: 'username'
                },


                cur_page: 1,
                pageSize: 10,
                countAll: 50,

                multipleSelection: [],

                load: false, // loading
            }
        },

        computed: {
            user() {
                return this.$store.state.user;
            },
            searchVal() {
                return this.searchObj.value
            }
        },


        methods: {
            fetchList() {
                this.load = true;
                const params = {
                    pageNo: this.cur_page,
                    pageSize: this.pageSize
                }
                this.ajax.post(this.api.userList, params).then((data) => {
                    this.tableData = this.formatData(data.list)
                    this.countAll = data.countAll
                    this.load = false
                })


            },

            fetchItem() {
                if(this.searchObj.value) {
                    this.load = true;
                    const searchObj = this.searchObj
                    const params = {}
                    params[searchObj.key] = searchObj.value

                    params.pageNo = this.cur_page
                    params.pageSize = this.pageSize

                    this.ajax.post(this.api.userByName, params).then((data) => {
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
                if(this.user.role == 100) {
                    const params = {
                        id: row.id
                    }

                    this.ajax.post(this.api.downloadDelete, params).then((data) => {
                        console.log(data)
                        let index = this.tableData.indexOf(row);
                        this.tableData.splice(index, 1);
                        this.$message.success('删除成功');
                    })
                } else {
                    this.$message.warning('权限不够，加油打怪升级噢～');
                }
            },


            // 修改
            editGoods(row) {
                const target = {path: '/admin/user-form', query: {id: row.id}}
                this.controlJump(target, true)
            },


            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            formatData(data) {
                return data
            },

            // 跳转控制
            controlJump(target, flag) {
                if(flag) {
                    if(this.user.role < 100) {
                        this.$message.warning('权限不够，加油打怪升级噢～');
                    } else {
                        this.$router.push(target);
                    }
                } else {
                    if (this.user.role < 10) {
                        this.$message.warning('权限不够，加油打怪升级噢～');

                    } else {
                        this.$router.push(target);
                    }

                }

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
