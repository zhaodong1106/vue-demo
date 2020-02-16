<template>
    <div class="fillcontain">
        <div style="display: flex;justify-content: center;align-items: center;height: 100%;background-color: #42b983">
            <div style="background-color: white;width: 400px;padding: 10px;">
                        <h2 style="text-align: center;padding: 10px">
                            后台管理系统
                        </h2>
                        <el-form :model="loginForm" :rules="loginForm" ref="loginForm"  class="form" style="margin-top: 10px">
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
    export default {
        name: "Login",
        data:function() {
            return {
                loginForm:{
                    username: '' ,
                    password: ''
                }
            }

        }

    }
</script>

<style scoped lang="less">

</style>