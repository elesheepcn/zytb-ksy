import request from './axiosconfig'
 function getRequest(uri, params) {
    return request({
        url: uri,
        method: 'get',
        params: params
    })
}

 function postRequest(uri, params) {
    return request({
        url: uri,
        method: 'post',
        data: params
    })
}

//  function deleteRequest(uri, params) {
//     return request({
//         url: uri,
//         method: 'delete',
//         params: params
//     })
// }

//  function putRequest(uri, params) {
//     return request({
//         url: uri,
//         method: 'put',
//         data: params
//     })
// }
export {getRequest,postRequest} 