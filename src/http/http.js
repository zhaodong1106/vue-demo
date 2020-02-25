import axios from 'axios'
import whitelist from './whiteList'
import {
    MessageBox
} from 'element-ui'
import store from '@/store/'
import  router from '@/router/index'


const instance =axios.create({
    timeout: 60000
})

instance.defaults.baseURL='http://localhost:8080/api';
instance.interceptors.request.use(
    config=>{
        // eslint-disable-next-line no-console
        console.log(9999);
        if(config.url && whitelist.some(obj=>config.url.indexOf(obj)> -1)){
            return config;
        }
        let baseToken=store.state.token;
        if(baseToken){
            config.headers['Authorization']='bearer '+baseToken;
        }else{
            MessageBox.confirm('你尚未登录，请回首页登录', '温馨提示', {
                confirmButtonText: '登录',
                showCancelButton:false,
                closeOnClickModal:false,
                // cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                location.href = location.origin + location.pathname + '#/login'
                if (!!window.ActiveXObject || 'ActiveXObject' in window) {
                    location.reload()
                }

            })

        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
)
// 是否正在刷新的标记
// eslint-disable-next-line no-unused-vars
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
// eslint-disable-next-line no-unused-vars
let requests = [];
instance.interceptors.response.use(response=>{
     let data = response.data;
    // eslint-disable-next-line no-console
    console.log(data);
    if(data.code==1000){
        MessageBox.confirm('你尚未登录，请回首页登录', '温馨提示', {
            confirmButtonText: '登录',
            showCancelButton:false,
            closeOnClickModal:false,
            // cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            location.href = location.origin + location.pathname + '#/login'
            if (!!window.ActiveXObject || 'ActiveXObject' in window) {
                location.reload()
            }

        })
    }
    // eslint-disable-next-line no-console
    console.log(22222222);
    if (data.code == 1001) {
        // eslint-disable-next-line no-console
        console.log(3333333333);
        const config = response.config;
        if (!isRefreshing) {
            isRefreshing = true;
            return getRefreshToken()
                .then(() => {
                    let access_token = store.state.token;
                    config.headers.Authorization = `bearer ${access_token}`;
                    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
                    // 已经刷新了token，将所有队列中的请求进行重试
                    requests.forEach(cb => cb(access_token));
                    requests = [];
                    return instance(config);
                })
                .catch(() => {
                    // refreshtoken 获取失败就只能到登录页面
                    store.commit("logout");
                    router.push({
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath }
                    });
                    return Promise.reject();
                })
                .finally(() => {
                    isRefreshing = false;
                });
        } else {
            // 正在刷新token，将返回一个未执行resolve的promise
            return new Promise(resolve => {
                // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
                requests.push(token => {
                    config.headers.Authorization = `bearer ${token}`;
                    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
                    resolve(instance(config));
                });
            });
        }
    }
    return response.data;
},error => {
     return Promise.reject(error);
    }
)

// eslint-disable-next-line no-unused-vars
function getRefreshToken() {
    let url = getUrl('/user/refreshToken');
    // 登录时已经获取token储存在localStorage中
    // let token = JSON.parse(localStorage.getItem('token'));
    return axios({
        url,
        method: 'post',
        data: 'refreshTokenValue=' + store.state.refreshToken,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
    })
        .then(res => {
            if (res.data.code==200) {
                var token_temp = {
                    token: res.data.data.accessTokenValue,
                    refreshToken: res.data.data.refreshTokenValue
                };
                store.commit("login",token_temp);
                return Promise.resolve();
            }
        })
        .catch(() => {
            return Promise.reject();
        });
}
function getUrl(url) {
    if (url.indexOf(instance.defaults.baseURL) === 0) {
        return url;
    }
    url = url.replace(/^\//, '');
    url = instance.defaults.baseURL + '/' + url;
    return url;
}


export default instance;