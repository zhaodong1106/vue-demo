import {get,post} from '@/http/index'

export default {
    login(params){
        return get('/user/login', params);
    },
    regist(params){
        return get('/user/regist', params);
    },
    userList(params){
        return post('/user/search',params,'application/json')
    },
    getById(param){
        return get('/user/getById',param);
    },
    addUser(params){
        return get('/user/regist',params);
    },
    updateById(param){
        return get('/user/updateById',param);
    },
    userInfo(param){
        return get('/user/userInfo',param)
    }

}