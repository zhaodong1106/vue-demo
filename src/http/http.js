import axios from 'axios'
// import whitelist from './whiteList'
import {
    MessageBox
} from 'element-ui'


const instance =axios.create({
    timeout: 60000
})

instance.defaults.baseURL='http://localhost:8080/api';
instance.interceptors.request.use(
    config=>{
        // if(config.url && whitelist.every(obj=>config.url.includes(obj))){
        //     return config;
        // }
        let baseToken=localStorage.getItem('token');
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
instance.interceptors.response.use(response=>{
     let data = response.data;
    if(data.code==1001){
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
    return response;
})
export default instance;