<template>
    <div>
        <el-row style="margin-top: 20px">
            <el-col :span="14" :offset="4">
                <el-form :model="userForm" :rules="userRules" ref="userForm" label-width="110px" class="form">
                    <el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">
                        <div class="add_category">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="userForm.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="userForm.password"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email" >
                                <el-input v-model="userForm.email"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="addUser('userForm')">提交</el-button>
                            </el-form-item>
                        </div>
                    </el-row>

                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {addUser} from '@/api/getData';
    import {validateEMail} from '@/utils/validator';
    export default {
        name: "AddUser",
        data: function(){
            return {
                userForm: {
                    password: '',
                    username: '',
                    email: ''
                },
                showAddCategory: false,
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
        methods:{
            addUser:function (userForm) {
                this.$refs[userForm].validate(async (valid) => {
                    if (valid) {
                        // const params = {
                        //     ...this.userForm
                        // }
                        try{
                            const result = await addUser(this.userForm);
                            if (result.code==200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.userForm = {
                                    password: '',
                                    username: '',
                                    email: ''
                                }
                                this.$emit('refreshData')
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: result.message
                                });
                            }
                        }catch(err){
                            alert(err)
                        }
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请检查输入是否正确',
                            offset: 100
                        });
                        return false;
                    }
                });
            }
            }

    }
</script>

<style scoped lang="less">

</style>