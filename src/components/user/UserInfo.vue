<template>
    <div>
        <el-row style="margin-top: 20px">
            <el-col :span="14" :offset="4">
                <el-form :model="userForm"  ref="userForm"  :rules="userRules" label-width="110px" class="form">
                    <el-row class="add_category_row" >
                        <div class="add_category">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="userForm.username" :readonly="readOnlyStatus"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email" >
                                <el-input v-model="userForm.email" :readonly="readOnlyStatus"></el-input>
                            </el-form-item>
                            <el-form-item label="创建时间" prop="createTime" v-if="readOnlyStatus">
                                <el-date-picker
                                        v-model="userForm.createTime"
                                        type="datetime"
                                        placeholder="选择创建时间" :readonly="readOnlyStatus">
                                </el-date-picker>
<!--                                <el-input v-model="userForm.createTime" :readonly="readOnlyStatus"></el-input>-->
                            </el-form-item>
                            <el-form-item label="修改时间" prop="updateTime" v-if="readOnlyStatus">
                                <el-date-picker
                                        v-model="userForm.updateTime"
                                        type="datetime"
                                        placeholder="选择修改时间" :readonly="readOnlyStatus">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item v-if="!readOnlyStatus">
                                <el-button type="primary" @click="editUser('userForm')">编辑提交</el-button>
                            </el-form-item>
                        </div>
                    </el-row>

                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    // import {addUser, userInfo,editUser} from '@/api/getData';
    import userApi from '@/api/user/index';
    import {validateEMail} from "@/utils/validator";
    export default {
        name: "userInfo",
        props:['id','currentPage'],
        data: function(){
            return {
                userForm: {
                    username: '',
                    email: '',
                    createTime:'',
                    updateTime:''
                },
                readOnlyStatus: '',
                userRules:{
                    username:[
                        {required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],
                    email:[
                        {required:true,message: '邮箱', trigger: 'blur'},
                        {validator: validateEMail,trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            // eslint-disable-next-line no-console
            // console.log(this.id)
            // this.getInfo()
        },
        methods:{
             getInfo() {
                // eslint-disable-next-line no-console
                console.log(this.id)
                userApi.getById({id:this.id}).then(res=>{
                    if (res.code == 200) {
                        this.userForm.username=res.data.name;
                        this.userForm.email=res.data.email;
                        this.userForm.createTime=res.data.createTime;
                        this.userForm.updateTime=res.data.updateTime;
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }).catch(error=>{
                    alert(error);
                })
            },
            addUser:function (userForm) {
                this.$refs[userForm].validate(async (valid) => {
                    if (valid) {
                            userApi.addUser(this.userForm).then(res=>{
                            if (res.code==200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.userForm = {
                                    password: '',
                                    username: '',
                                    email: ''
                                }
                                // eslint-disable-next-line no-console
                                console.log(this.currentPage);
                                this.$emit('refreshData',this.currentPage);
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: res.data.message
                                });
                            }}).then(error=>{
                                alert(error)
                            })

                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请检查输入是否正确',
                            offset: 100
                        });
                        return false;
                    }
                });
            },
            editUser(userForm){
                this.$refs[userForm].validate(async (valid) => {
                    if (valid) {
                        // const params = {
                        //     ...this.userForm
                        // }
                        const  editdata={
                            name: this.userForm.username,
                            email: this.userForm.email,
                            id: this.id
                        }
                       userApi.updateById(editdata).then(res=>{
                            if (res.code==200) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功'
                                });
                                this.userForm = {
                                    password: '',
                                    username: '',
                                    email: ''
                                }
                                // eslint-disable-next-line no-console
                                console.log('接收到页码:'+this.currentPage);
                                this.$emit('refreshData',  this.currentPage)
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: res.data.message
                                });
                            }}).catch(error=>{
                           alert(error)
                       })
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请检查输入是否正确',
                            offset: 100
                        });
                        return false;
                    }
                });
            },
            queryUserForQuery(){
                this.getInfo();
                this.readOnlyStatus=true;
            },
            editUserForQuery(){
                this.getInfo();
                this.readOnlyStatus=false;
            }
        }

    }
</script>

<style scoped lang="less">

</style>