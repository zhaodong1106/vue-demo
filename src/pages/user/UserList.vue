<template>
    <div class="table_container">
        <el-row>
            <el-col :span="14" :offset="4">
                <!-- Form -->
            <el-row type="flex" justify="space-between">
                    <div>
                        <el-form ref="searchDto" :inline="true" :model="searchDto" class="demo-form-inline">
                            <el-form-item label="用户名:" prop="username" class="search-item">
                                <el-input v-model="searchDto.username" placeholder="用户名"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱:" prop="email" class="search-item" >

                                <el-select v-model="searchDto.email" placeholder="邮箱">
                                    <el-option label="1987589041@qq.com" value="1987589041@qq.com"></el-option>
                                    <el-option label="398424967@qq.com" value="398424967@qq.com"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item  class="search-item">
                                <el-button type="primary" @click="search">查询</el-button>
                                <el-button  @click="resetForm('searchDto')" >清空</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div>
                    <el-button type="primary" @click="dialogFormVisible = true" style="">添加用户</el-button>
                    <el-button type="primary" @click="dialogFormVisible = true" style="">添加用户</el-button>
                    </div>
            </el-row>
            <el-table
                    v-loading="loading"
                    :data="tableData"
                    style="width: 100%;margin-top: 20px;"  border>
                <el-table-column
                        :index='(index)=>{return (index+1) + (currentPage-1)*limit  }'
                        type="index"
                        min-width="10%"
                        label="序号"
                        align="center"
                >

                </el-table-column>
                <el-table-column
                        prop="user_name"
                        label="姓名"
                        min-width="20%" align="center">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱"
                        min-width="20%" align="center">
                </el-table-column>
                <el-table-column
                        prop="create_time"
                        label="创建日期"
                        min-width="20%" align="center">
                </el-table-column>
                <el-table-column
                    prop="update_time"
                    label="修改日期"
                    min-width="20%" align="center">
                </el-table-column>
                <el-table-column
                        label="操作"
                        min-width="10%" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="editClick(scope.row)"  type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>


            </el-table>
            <div class="Pagination" style="text-align: right;margin-top: 10px;">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="5"
                        layout="total, prev, pager, next"
                        :total="count"
                        background
                >
                </el-pagination>
            </div>
            </el-col>
        </el-row>


        <el-dialog :title="titleMap['addUser']" :visible.sync="dialogFormVisible">
            <addUser v-on:refreshData='refreshData'></addUser>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="userTitle" :visible.sync="userInfoVisible">
            <userInfo v-bind:id=id v-bind:currentPage=currentPage ref="userInfo" v-on:refreshData='refreshData'></userInfo>
            <div slot="footer" class="dialog-footer">
                <el-button @click="userInfoVisible = false">取 消</el-button>
                <el-button type="primary" @click="userInfoVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import  userApi from '@/api/user/index'
    import addUser from '@/pages/user/AddUser'
    import userInfo from '@/pages/user/UserInfo'
    export default {
        name: "UserList",
        data: function () {
            return {
                id: null,
                tableData: [],
                currentRow: null,
                limit: 5,
                count: 0,
                dialogFormVisible:false,
                userInfoVisible:false,
                currentPage: 1,
                searchDto:{
                    username:'',
                    email:''
                },
                titleMap:{
                    addUser: '新增用户',
                    updateUser: '修改用户'
                },
                userTitleMap:{
                    userInfo: '用户详情',
                    updateUser: '修改用户'
                },
                userTitle:'',
                loading:true
            }
        },
        components:{addUser,userInfo},
        created: function(){
            this.getAdmin();
        },
        methods:{
            handleClick(row){
                // eslint-disable-next-line no-console
                // console.log(row.id);
                this.userInfoVisible = true;
                this.userTitle='用户详情';
                this.id=row.id;
                // eslint-disable-next-line no-console
                // console.log(this.$refs.userInfo)
                setTimeout(()=>{
                    this.$refs.userInfo.queryUserForQuery();
                },10)


            },
            editClick(row){
                // eslint-disable-next-line no-console
                // console.log(row.id);
                this.userInfoVisible = true;
                this.id=row.id;
                this.userTitle='修改用户';
                // eslint-disable-next-line no-console
                // console.log(this.$refs.userInfo)
                setTimeout(()=>{
                    this.$refs.userInfo.editUserForQuery();
                },10)


            },
            search(){
                // this.refreshData();
                this.getAdmin()
                // eslint-disable-next-line no-console
                // console.log(this.$refs.userInfo)
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
            },
            refreshData(currentPage){
                // eslint-disable-next-line no-console
                console.log('主组件的页码:'+currentPage)
                this.userInfoVisible=false;
                this.limit=5;
                this.handleCurrentChange(currentPage);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.loading=true;
                this.getAdmin()
            },
             getAdmin(){
                    userApi.userList({pageNo: this.currentPage, pageSize: this.limit,name: this.searchDto.username,
                    email:this.searchDto.email}).then(res=> {
                        // if (res.total != null) {
                            this.count = res.total;
                            this.tableData = [];
                            res.data.forEach(item => {
                                const tableItem = {
                                    id: item.id,
                                    create_time: item.createTime,
                                    user_name: item.name,
                                    update_time: item.updateTime,
                                    email: item.email,
                                }
                                this.tableData.push(tableItem);
                                this.loading=false;
                            })

                    })

            }
        }
    }
</script>

<style scoped lang="less">
    .table_container{
        padding: 20px;
    }
    .search-item{
        margin-bottom: 0px !important;
    }
</style>
