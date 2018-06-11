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

            <router-link to="/admin/goods-form">
                <el-button type="success">新增</el-button>
            </router-link>


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
                        type="info"
                        @click="hanlePublish(scope.row)">{{scope.row.btnWord}}
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
                    title: '课件名称',
                    resourceType: '课件类型',
                    update_time: '发布日期',
                    statusMsg: '状态',
                },
                tableData: [],

                searchObj: {
                    value: '',
                    tip: '根据课程名称查询',
                    key: 'title'
                },


                cur_page: 1,
                pageSize: 10,
                countAll: 50,

                multipleSelection: [],

                load: false, // loading
            }
        },

        computed: {
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
                this.ajax.post(this.api.downloadList, params).then((data) => {
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

                    this.ajax.post(this.api.downloadByName, params).then((data) => {
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

            // 发布
            hanlePublish(row) {
                row.status = +(!row.status)
                this.ajax.post(this.api.downloadUpdate, row).then((data) => {
                    this.fetchItem()
                    this.$message.success('更新成功');
                })
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

                this.ajax.post(this.api.downloadDelete, params).then((data) => {
                    console.log(data)
                    let index = this.tableData.indexOf(row);
                    this.tableData.splice(index, 1);
                    this.$message.success('删除成功');
                })
            },


            // 修改
            editGoods(row) {
                this.$router.push({path: '/admin/goods-form', query: {id: row.id}});
            },


            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            formatData(data) {
                return data.map((item) => {
                    const status = item.status
                    const ext = item.download_url.split('.')[item.download_url.split('.').length - 1]

                    item.resourceType = this.getResourceType(ext)
                    item.statusMsg = status == '1' ? '已发布' : '未发布'
                    item.btnWord = status == '1' ? '下架' : '发布'
                    return item
                })
            },

            getResourceType(ext) {
                switch (ext) {
                    case 'ppt': return 'PPT'
                    case 'doc':
                    case 'docx': return 'WORD'
                    default: return '未知类型'
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
