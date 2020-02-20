<template>
    <div class="fillcontain">
        <el-row style="height: 100%">
            <el-col :span="4" style="min-height: 100%;background-color: #324057;">
                <el-menu
                        :default-active="$route.path.replace('/','')"
                        class="el-menu-vertical-demo"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        theme="dark"
                        router>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="addShop">添加店铺</el-menu-item>
                            <el-menu-item index="userList">用户列表</el-menu-item>
                            <el-menu-item index="addUser">添加用户</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="addStore">添加店铺</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" >
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%;overflow: auto;">
                <headTop></headTop>
<!--                <keep-alive>-->
                    <router-view></router-view>
<!--                </keep-alive>-->
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import store from '@/store'
    export default {
        data(){
            return{
                defaultActive2: 'userList'
            }
        },
        computed: {
            // defaultActive: function(){
            //     mapState.
            //     let path = this.$store.getters.getPath;
            //     // eslint-disable-next-line no-console
            //     console.log(path);
            //     return path.replace("/",'');
            // },
            // ...mapGetters({
            //     defaultActive: 'getPath'
            //
            //  })
            defaultActive(){
                 let path = store.getters.getPath;
                // eslint-disable-next-line no-console
                console.log(path);
                return 'userList';
            }


        },
        components:{
            headTop
        },
        watch:{
            defaultActive(val, oldVal){//普通的watch监听
                // eslint-disable-next-line no-console
                console.log("defaultActive: "+val, oldVal);
            },
        }
        // watch: {
        //     // eslint-disable-next-line no-unused-vars
        //     '$route'(to, from) {
        //         // eslint-disable-next-line no-console
        //         console.log(to.path);
        //         this.defaultActive = to.path.replace("/",'');
        //         // eslint-disable-next-line no-console
        //         console.log(this.defaultActive);
        //     }
        // },
        // mounted(){
        //     let b = window.location.href.substring(24)
        //     this.defaultActive=bteam
        //     // eslint-disable-next-line no-console
        //      console.log(b);
        // }
    }
</script>

<style scoped lang="less">
    .el-menu-vertical-demo{
        border: 0;
    }
</style>