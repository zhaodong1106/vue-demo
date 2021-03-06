import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
//引入nprogress
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' //这个样式必须引入


Vue.use(Router)

const navMenu = r => require.ensure([], () => r(require('@/pages/NavMenu')), 'NavMenu');
const  addShop=r => require.ensure([], () => r(require('@/pages/AddShop')), 'AddShop');
const  addStore=r => require.ensure([], () => r(require('@/pages/AddStore')), 'AddStore');
const  userList=r => require.ensure([], () => r(require('@/pages/user/UserList')), 'UserList');
const  addUser=r => require.ensure([], () => r(require('@/pages/user/AddUser')), 'AddUser');
const  login=r => require.ensure([], () => r(require('@/pages/Login')), 'Login');
const routes = [
    {
      path: '/login',
      component: login,
      name: 'login',
    },
    {
        path:'/',
        component:navMenu,
        name:'home',
        meta: {
            requireAuth: true
        },
        children:[
            {
                path:'/addShop',
                component:addShop,
                meta: {
                    requireAuth: true
                }
            },
            {
                path:'/addStore',
                component:addStore,
                meta: {
                    requireAuth: true
                }
            },
            {
                path:'/userList',
                component:userList,
                name:'用户列表',
                meta: {
                    requireAuth: true
                }
            },
            {
                path:'/addUser',
                component:addUser,
                name:'添加用户',
                meta: {
                    requireAuth: true
                }
            }
        ]
    }
]
let router = new Router({routes: routes});
router.beforeEach(((to, from, next) => {
    NProgress.start()
    if (to.matched.some(res => res.meta.requireAuth)){
        if(store.state.token!=null){
            next()
        }else {
            next({path: '/login'})
        }
    } else {
        next()
    }
}))
// eslint-disable-next-line no-unused-vars
router.afterEach((to, from, next) => {
    NProgress.done()
    store.commit('setPath',to.path.replace("/",''))
})
export  default  router;
