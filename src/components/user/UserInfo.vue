<template>
    <div>
        <el-row style="margin-top: 20px">
            <el-col :span="14" :offset="4">
                <el-form :model="userForm"  ref="userForm" label-width="110px" class="form">
                    <el-row class="add_category_row" >
                        <div class="add_category">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="userForm.username" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email" >
                                <el-input v-model="userForm.email" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="创建时间" prop="email" >
                                <el-input v-model="userForm.createTime" readonly></el-input>
                            </el-form-item>
                            <el-form-item label="修改时间" prop="email" >
                                <el-input v-model="userForm.updateTime" readonly></el-input>

                            </el-form-item>
                        </div>
                    </el-row>

                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {userInfo} from '@/api/getData';
    export default {
        name: "userInfo",
        props:['id'],
        data: function(){
            return {
                userForm: {
                    username: '',
                    email: '',
                    createTime:'',
                    updateTime:''
                }
            }
        },
        created() {
            // eslint-disable-next-line no-console
            console.log(222)
            // eslint-disable-next-line no-console
            // console.log(this.id)
            // this.getInfo()
        },
        methods:{
            async getInfo() {
                // eslint-disable-next-line no-console
                console.log(this.id)
                const result = await userInfo({id:this.id});
                if (result.code == 200) {
                    this.userForm.username=result.data.name;
                    this.userForm.email=result.data.email;
                    this.userForm.createTime=result.data.createTime;
                    this.userForm.updateTime=result.data.updateTime;
                } else {
                    this.$message({
                        type: 'error',
                        message: result.message
                    });
                }
            }
        }

    }
</script>

<style scoped lang="less">

</style>