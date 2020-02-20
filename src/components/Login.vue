<template>
    <div class="fillcontain">
        <div class="bg" style="display: flex;justify-content: center;align-items: center;height: 100%;background-color: #42b983;">
            <div style="background-color: white;width: 400px;padding: 10px;">
                        <h2 style="text-align: center;padding: 10px">
                            后台管理系统
                        </h2>
                        <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm"  class="form" style="margin-top: 10px">
                            <el-row class="add_category_row" >
                                <div class="add_category">
                                    <el-form-item  prop="username"   >
                                        <el-input size="large" v-model="loginForm.username" prefix-icon="el-icon-s-custom" placeholder="请输入用户名" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item  prop="password">
                                        <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-unlock" placeholder="请输入密码" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item align="center">
                                        <el-button  class="el-button--primary"  style="width: 100%"  type="primary" @click="login('loginForm')">登陆</el-button>
                                    </el-form-item>
                                </div>
                            </el-row>

                        </el-form>


            </div>
        </div>
    </div>
</template>

<script>
    // import {login} from "@/api/getData";
    // import * as types from '@/store/types' ;
    import  userApi from '@/api/user/index'
    export default {
        name: "Login",
        data:function() {
            return {
                loginForm:{
                    username: '' ,
                    password: ''
                },
                loginFormRules:{
                    username:[
                        {required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],
                    password:[
                        {required:true,message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 20,message: '长度在 3 到 20 个字符',trigger: 'blur'}
                    ]
                }
            }

        },
        methods:{
            login(loginForm){
                this.$refs[loginForm].validate(async (valid) => {
                    if (valid) {
                            userApi.login(this.loginForm).then(res=>{
                            if (res.data.accessTokenValue != null) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                userApi.userInfo({}).then(res=>{
                                    // eslint-disable-next-line no-console
                                    console.log(res.data);
                                    this.$store.commit('setUserInfo',res.data)
                                })
                                // eslint-disable-next-line no-console
                                console.log(this.$store.state.user);
                                this.$store.commit('login',res.data.accessTokenValue );
                                 this.$router.push({path: '/home'})

                            }else{
                                this.$message({
                                    type: 'error',
                                    message: res.data.message
                                });
                            }
                            }).catch(error=>{
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

        }


    }
</script>

<style scoped lang="less">
    .bg{
        background-image: url("../assets/image/bg.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>