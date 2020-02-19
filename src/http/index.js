import http from './http'
import qs from 'qs'

export function post (url,data, contentType){
    let ct = contentType || 'application/json'
    return http({
        method: 'post',
        url: url,
        data: data,
        headers: { 'Content-Type': ct }
    })
}
export function get(url,data) {
    let ct = 'application/x-www-form-urlencoded;charset=UTF-8'
    let comValue = qs.stringify(data)
    data = data || {};
    // for(var key in data){
    //   data[key] = encodeURI(data[key]);
    // }
    return http({
        method: 'get',
        url: url+"?"+comValue,
        headers: {
            'Content-Type': ct
        }
    })
}

export function $getBlob(url, data, contentType) {
    let ct = contentType || 'application/x-www-form-urlencoded;charset=UTF-8';
    data = data || {};
    // for(var key in data){
    //   data[key] = encodeURI(data[key]);
    // }
    return http({
        method: 'get',
        url: url,
        params: data,
        responseType: 'blob',
        headers: {
            'Content-Type': ct
        }
    })
}

export function $arraybuffer(url, data, contentType) {
    let ct = contentType || 'application/json'
    return http({
        method: 'post',
        url: url,
        data: data,
        responseType: 'arraybuffer',
        headers: { 'Content-Type': ct }
    })
}


//下载文件
// export function $downloadFile(blob) {
//     if(!blob){
//         alert("链接为空，请检查！");
//         return;
//     }else{
//         blob = globalDownloadUrl + blob.substring(0,blob.lastIndexOf('.'));
//     }
//     window.open(blob);
// }
