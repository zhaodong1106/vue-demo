<template>
    <div class="header_container">

<!--		<el-breadcrumb separator="/">-->
<!--			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>-->
<!--			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>-->
<!--		</el-breadcrumb>-->
		<div>{{pathName}}</div>

		<el-dropdown >
			<el-button type="primary">
				<svg-icon  icon-class="user"  class-name="icon-red"></svg-icon>
				{{username}}<i class="el-icon-arrow-down el-icon--right"></i>
			</el-button>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item >首页</el-dropdown-item>
				<el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>

import userApi from '@/api/user/index'
export default {
	computed:{
		username(){
			return this.$store.state.user.name;
		},
		pathName(){
			return this.$route.name;
		}
	},
	watch:{
		username(val, oldVal){//普通的watch监听
			// eslint-disable-next-line no-console
			console.log("username: "+val, oldVal);
		},
	},
	methods:{
		logout(){
			userApi.logout({}).then(res=>{
				if(res.code==200){
					this.$store.commit("logout")
				}
				this.$router.push({path: '/login'})
			}).catch(error=>{
				alert(error)
			})
		}
	}

}
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
	.icon-red{
		height: 15px;
		width: 15em;
		color:yellow;
	}

</style>
