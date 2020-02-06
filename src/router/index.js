import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const navMenu = r => require.ensure([], () => r(require('@/components/NavMenu')), 'NavMenu');
const  addShop=r => require.ensure([], () => r(require('@/components/AddShop')), 'AddShop');
const routes = [
    {
        path:'/',
        component:navMenu,
        name:'',
        children:[
            {
                path:'/addShop',
                component:addShop,
                meta: ['添加数据', '添加商铺']
            }
        ]
    }
]
export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})