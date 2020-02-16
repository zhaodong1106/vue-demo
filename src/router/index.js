import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const navMenu = r => require.ensure([], () => r(require('@/components/NavMenu')), 'NavMenu');
const  addShop=r => require.ensure([], () => r(require('@/components/AddShop')), 'AddShop');
const  addStore=r => require.ensure([], () => r(require('@/components/AddStore')), 'AddStore');
const  userList=r => require.ensure([], () => r(require('@/components/user/UserList')), 'UserList');
const  addUser=r => require.ensure([], () => r(require('@/components/user/AddUser')), 'AddUser');
const  login=r => require.ensure([], () => r(require('@/components/Login')), 'Login');
const routes = [
    {
      path: '/login',
      component: login,
      name: 'login',
    },
    {
        path:'/home',
        component:navMenu,
        name:'',
        children:[
            {
                path:'/addShop',
                component:addShop,
                meta: ['添加数据', '添加商铺']
            },
            {
                path:'/addStore',
                component:addStore,
                meta: ['添加数据', '添加商铺']
            },
            {
                path:'/userList',
                component:userList,
                meta: ['添加数据', '添加商铺']
            },
            {
                path:'/addUser',
                component:addUser,
                meta: ['添加数据', '添加商铺']
            }
        ]
    }
]
export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})