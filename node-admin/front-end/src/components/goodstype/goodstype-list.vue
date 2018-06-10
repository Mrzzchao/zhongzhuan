<template>
    <div class="admin-list">


        <div style="margin-bottom:30px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>招聘管理</el-breadcrumb-item>
                <el-breadcrumb-item>职位列表</el-breadcrumb-item>

            </el-breadcrumb>

        </div>


        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="searchObj.value" :placeholder="searchObj.tip"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>

            <router-link to="/admin/goodstype-form">
                <el-button type="success">新增职位</el-button>
            </router-link>


        </el-form>

        <el-table
                :loading='load'
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                :data="tableData"
                height="450"
                border
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
                label="职位描述"
                width="150"
                >
                <template scope="scope">

                    <el-button
                            size="small"
                            type="info"
                            @click="openJob(scope.row)">查看
                    </el-button>
                </template>
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

        <el-dialog title="职位描述" :visible.sync="dialogVisible" v-if="dialogData">
            <!-- 职位详情简介  start -->
            <div class="offer-info-cont">
                <!-- <div class="offer-info-tit">
                    职位详情
                    <div class="offer-tit-before"></div>
                </div> -->
                <div class="offer-info-desc">
                    <div class="oid-detail" v-for="item, index in dialogData.job_intros">
                        {{index + 1}}、{{item}}
                    </div>
                    <div class="oid-tit" v-if="dialogData.job_require.length">
                        任职要求：
                    </div>
                    <div class="oid-detail" v-for="item, index in dialogData.job_require">
                        {{index + 1}}、{{item}}
                    </div>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>

            <!-- 职位详情简介  end -->
        </el-dialog>

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
                    company: '公司',
                    job_name: '职位',
                    salary: '薪资',
                    tags: '公司标签',
                    create_time: '发布时间',
                    statusMsg: '状态'
                },

                job_detail: '职位描述',
                tableData: [],

                searchObj: {
                    value: '',
                    tip: '根据职位查询',
                    key: 'job_name'
                },


                cur_page: 1,
                pageSize: 10,
                countAll: 50,

                multipleSelection: [],

                load: false, // loading

                dialogVisible: false,
                dialogData: null
            }
        },

        methods: {
            fetchList() {
                this.load = true;
                const params = {
                    pageNo: this.cur_page,
                    pageSize: this.pageSize
                }
                this.ajax.post(this.api.jobList, params).then((data) => {
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

                    this.ajax.post(this.api.jobByName, params).then((data) => {
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

                this.ajax.post(this.api.jobDelete, params).then((data) => {
                    let index = this.tableData.indexOf(row);
                    this.tableData.splice(index, 1);
                    this.$message.success('删除成功');
                })
            },


            // 修改
            editGoods(row) {
                this.$router.push({path: '/admin/goodstype-form', query: {id: row.id}});
            },

            // 查看
            openJob(row) {
                this.dialogVisible = true
                this.dialogData = row
            },


            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            formatData(data) {
                return data.map((item) => {
                    const status = item.status
                    item.statusMsg = status == '1' ? '已发布' : '未发布'
                    let job_detail = decodeURIComponent(item.job_detail)
                    console.log(job_detail);
                    let detailArr = job_detail.split('&&&&')
                    let intros = detailArr[0] && detailArr[0].split('\n') || ''
                    let requirements = detailArr[1] && detailArr[1].split('\n') || ''

                    item.job_intros = intros
                    item.job_require = requirements
                    return item
                })
            }
        },


        created() {
            this.fetchList();
        }


    }
</script>

<style>
    .offer-info-cont{padding:15px;background:#fff}.offer-info-tit{color:rgba(36,44,53,0.8);font-size:14px;position:relative;padding-bottom:10px;padding-left:13px;line-height:23px;border-bottom:1px solid #f0f0f0}.offer-info-tit .offer-tit-before{width:5px;height:20px;background:#7398f5;position:absolute;left:0;top:0}.offer-info-desc{padding-top:5px}.oid-detail{font-family:PingFang SC-Light;font-size:13px;color:#838999;line-height:20px}.oid-tit{font-size:13px;color:#838999;line-height:20px;margin:10px 0 5px 0}
</style>
